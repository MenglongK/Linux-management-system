#!/bin/bash

# --- 1. CPU & RAM ---

CPU=$(top -bn1 | grep "Cpu(s)" | sed "s/.*, *\([0-9.]*\)%* id.*/\1/" | awk '{print 100 - $1}')
# Get RAM usage %
RAM=$(free | grep Mem | awk '{printf "%.2f", $3/$2 * 100.0}')

# --- 2. Disk Usage ---
DISK=$(df -h / | awk 'NR==2 {print $5}' | sed 's/%//')

# --- 3. GPU Detection ---

if command -v nvidia-smi &> /dev/null; then
    HAS_GPU="true"
    GPU_VAL=$(nvidia-smi --query-gpu=utilization.gpu --format=csv,noheader,nounits)
    GPU_NAME=$(nvidia-smi --query-gpu=name --format=csv,noheader)
else
    HAS_GPU="false"
    GPU_VAL="0"
    GPU_NAME=""
fi

# --- 4. Network Speed Test ---

IFACE=$(ip route | grep default | awk '{print $5}' | head -n1)

# Read Snapshot 1
R1=$(cat /sys/class/net/$IFACE/statistics/rx_bytes)
T1=$(cat /sys/class/net/$IFACE/statistics/tx_bytes)

sleep 1

# Read Snapshot 2
R2=$(cat /sys/class/net/$IFACE/statistics/rx_bytes)
T2=$(cat /sys/class/net/$IFACE/statistics/tx_bytes)

# Calculate KB/s
RX=$(( ($R2 - $R1) / 1024 ))
TX=$(( ($T2 - $T1) / 1024 ))

# --- 5. JSON ---
printf '{"cpu": "%.1f", "ram": "%s", "disk": "%s", "has_gpu": %s, "gpu_val": "%s", "gpu_name": "%s", "net_rx": "%s", "net_tx": "%s"}\n' \
  "$CPU" "$RAM" "$DISK" "$HAS_GPU" "$GPU_VAL" "$GPU_NAME" "$RX" "$TX"