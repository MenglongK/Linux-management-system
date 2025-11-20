#!/bin/bash

# --- Initialize Variables ---
CPU="0.0"; CPU_MODEL="Unknown"; CPU_CORES="1"
RAM="0.00"; RAM_TOTAL="0G"; RAM_USED="0G"
DISK="0"; DISK_TOTAL="0G"; DISK_USED="0G"
HAS_GPU="false"; GPU_VAL="0"; GPU_NAME=""; GPU_MEM="N/A"
RX="0"; TX="0"

# --- 1. CPU Stats ---
RAW_CPU=$(top -bn1 | grep "Cpu(s)" | sed "s/.*, *\([0-9.]*\)%* id.*/\1/")
if [ -n "$RAW_CPU" ]; then
  CPU=$(awk -v val="$RAW_CPU" 'BEGIN {print 100 - val}')
fi
CPU_MODEL=$(lscpu | grep "Model name" | cut -d: -f2 | sed 's/^[ \t]*//')
CPU_CORES=$(nproc)

# --- 2. RAM Stats ---
RAM=$(free | grep Mem | awk '{printf "%.2f", $3/$2 * 100.0}')
RAM_TOTAL=$(free -h | grep Mem | awk '{print $2}')
RAM_USED=$(free -h | grep Mem | awk '{print $3}')

# --- 3. Disk Stats (Root /) ---
read -r DISK_TOTAL DISK_USED DISK_PCT <<< $(df -h / | awk 'NR==2 {print $2, $3, $5}')
DISK="${DISK_PCT%\%}" # Remove % sign

# --- 4. GPU Detection ---

# Check NVIDIA
if which nvidia-smi > /dev/null 2>&1; then
    HAS_GPU="true"
    GPU_VAL=$(nvidia-smi --query-gpu=utilization.gpu --format=csv,noheader,nounits || echo "0")
    GPU_NAME=$(nvidia-smi --query-gpu=name --format=csv,noheader || echo "NVIDIA GPU")
    GPU_MEM=$(nvidia-smi --query-gpu=memory.total --format=csv,noheader || echo "N/A")

# Check AMD (Radeontop + Kernel Logs)
elif [ -x /usr/bin/radeontop ]; then
    DUMP_OUTPUT=$(sudo /usr/bin/radeontop -d - -l 2 2>/dev/null | tail -n 1)
    
    if [[ "$DUMP_OUTPUT" == *"gpu"* ]]; then
        HAS_GPU="true"
        
        # Parse Load
        GPU_VAL=$(echo "$DUMP_OUTPUT" | grep -o "gpu [0-9.]*%" | tr -d -c 0-9.)
        [ -z "$GPU_VAL" ] && GPU_VAL="0"

        # Parse Total VRAM (from dmesg logs)
        VRAM_LOG=$(sudo dmesg | grep "Detected VRAM RAM=" | head -n 1)
        if [ -n "$VRAM_LOG" ]; then
             MB=$(echo "$VRAM_LOG" | grep -o "RAM=[0-9]*M" | tr -d "RAM=M")
             [ -n "$MB" ] && GPU_MEM="$(awk -v m="$MB" 'BEGIN { printf "%.1f", m / 1024 }') GB"
        else
            # Fallback to sysfs
            if [ -f /sys/class/drm/card0/device/mem_info_vram_total ]; then
                BYTES=$(cat /sys/class/drm/card0/device/mem_info_vram_total)
                GPU_MEM="$(awk -v b="$BYTES" 'BEGIN { printf "%.1f", b / 1024 / 1024 / 1024 }') GB"
            else
                GPU_MEM="Unknown"
            fi
        fi

        # Parse Name
        if which lspci > /dev/null 2>&1; then
            GPU_NAME=$(lspci | grep -i vga | head -n 1 | cut -d ':' -f 3 | xargs)
        else
            GPU_NAME="AMD Radeon"
        fi
    fi
fi

# Fallback: Generic AMD System File
if [ "$HAS_GPU" = "false" ] && [ -f /sys/class/drm/card0/device/gpu_busy_percent ]; then
    HAS_GPU="true"
    GPU_VAL=$(cat /sys/class/drm/card0/device/gpu_busy_percent)
    GPU_NAME="AMD Radeon (Sysfs)"
fi

# --- 5. Network Speed ---
IFACE=$(ip route | grep default | awk '{print $5}' | head -n1)
if [ -n "$IFACE" ]; then
    # Snapshot 1
    R1=$(cat /sys/class/net/$IFACE/statistics/rx_bytes 2>/dev/null || echo 0)
    T1=$(cat /sys/class/net/$IFACE/statistics/tx_bytes 2>/dev/null || echo 0)
    
    sleep 1
    
    # Snapshot 2
    R2=$(cat /sys/class/net/$IFACE/statistics/rx_bytes 2>/dev/null || echo 0)
    T2=$(cat /sys/class/net/$IFACE/statistics/tx_bytes 2>/dev/null || echo 0)
    
    # Calc KB/s
    RX=$(( ($R2 - $R1) / 1024 ))
    TX=$(( ($T2 - $T1) / 1024 ))
fi

# --- 6. Output JSON ---
printf '{"cpu": "%.1f", "cpu_model": "%s", "cpu_cores": "%s", "ram": "%s", "ram_total": "%s", "ram_used": "%s", "disk": "%s", "disk_total": "%s", "disk_used": "%s", "has_gpu": %s, "gpu_val": "%s", "gpu_name": "%s", "gpu_mem": "%s", "net_rx": "%s", "net_tx": "%s"}\n' \
  "$CPU" "$CPU_MODEL" "$CPU_CORES" \
  "$RAM" "$RAM_TOTAL" "$RAM_USED" \
  "$DISK" "$DISK_TOTAL" "$DISK_USED" \
  "$HAS_GPU" "$GPU_VAL" "$GPU_NAME" "$GPU_MEM" \
  "$RX" "$TX"
