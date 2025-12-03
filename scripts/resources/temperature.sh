#!/bin/bash

# Real-Time Temperature Monitor
# Shows CPU Core, CPU Package, and GPU temperatures

echo "Real-Time Temperature Monitor"
echo "Press Ctrl+C to exit"
echo "================================"

while true; do
    clear
    echo -e "\n🌡️  SYSTEM TEMPERATURES\n"
    echo "================================"
    
    # CPU Core 0 Temperature
    if command -v sensors &> /dev/null; then
        CORE_TEMP=$(sensors | grep "Core 0" | awk '{print $3}' | head -1)
        echo "CPU Core 0:    $CORE_TEMP"
    else
        echo "CPU Core 0:    sensors not installed"
    fi
    
    # CPU Package Temperature
    if command -v sensors &> /dev/null; then
        CPU_TEMP=$(sensors | grep "Package id 0" | awk '{print $4}' | head -1)
        if [ -z "$CPU_TEMP" ]; then
            CPU_TEMP=$(sensors | grep "Tctl" | awk '{print $2}' | head -1)
        fi
        echo "CPU Package:   $CPU_TEMP"
    else
        echo "CPU Package:   sensors not installed"
    fi
    
    # GPU Temperature (NVIDIA)
    if command -v nvidia-smi &> /dev/null; then
        GPU_TEMP=$(nvidia-smi --query-gpu=temperature.gpu --format=csv,noheader,nounits)
        echo "GPU (NVIDIA):  ${GPU_TEMP}°C"
    # GPU Temperature (AMD)
    elif sensors | grep -q "radeon\|amdgpu"; then
        GPU_TEMP=$(sensors | grep -A 5 "radeon\|amdgpu" | grep "temp1" | awk '{print $2}' | head -1)
        echo "GPU (AMD):     $GPU_TEMP"
    else
        echo "GPU:           No GPU detected"
    fi
    
    echo "================================"
    echo -e "\nUpdating every 2 seconds..."
    
    sleep 2
done