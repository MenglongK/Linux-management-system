"use client";
import { MetricCircle } from "@/components/resources/MetricCircle";
import { useState, useEffect } from "react";
import { Activity, Cpu, HardDrive } from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Server,
  Trash2,
  Ban,
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// --- CONFIGURATION ---
const N8N_URL = "https://api.rotana-dev.online/webhook";

export default function Resources() {

  const [stats, setStats] = useState({
    cpu: 0,
    cpu_model: "Loading...",
    cpu_cores: "0",
    ram: 0,
    ram_total: "0GB",
    ram_used: "0GB",
    disk: 0,
    disk_total: "0GB",
    disk_used: "0GB",
    has_gpu: false,
    gpu_val: 0,
    gpu_name: "",
    gpu_mem: "N/A",
    net_rx: 0,
    net_tx: 0,
  });

  const [processes, setProcesses] = useState([]);
  type ChartPoint = { time: string; cpu: number; ram: number };
  const [chartData, setChartData] = useState<ChartPoint[]>([]);
  const [killPid, setKillPid] = useState("");
  const [loading, setLoading] = useState(true);

  //n8n

  const fetchUsage = async () => {
    try {
      const res = await fetch(`${N8N_URL}/get-usage`);
      if (!res.ok) return;
      const data = await res.json();

      const cpu = parseFloat(data.cpu || 0);
      const ram = parseFloat(data.ram || 0);


      setStats({
        cpu: cpu,
        cpu_model: data.cpu_model || "Unknown CPU",
        cpu_cores: data.cpu_cores || "0",
        ram: ram,
        ram_total: data.ram_total || "0GB",
        ram_used: data.ram_used || "0GB",
        disk: parseFloat(data.disk || 0),
        disk_total: data.disk_total || "0GB",
        disk_used: data.disk_used || "0GB",
        has_gpu: data.has_gpu,
        gpu_val: parseFloat(data.gpu_val || 0),
        gpu_name: data.gpu_name || "",
        gpu_mem: data.gpu_mem || "N/A",
        net_rx: parseInt(data.net_rx || 0),
        net_tx: parseInt(data.net_tx || 0),
      });

      //chart
      setChartData((prev) => {
        const newPoint = {
          time: new Date().toLocaleTimeString([], { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }),
          cpu: cpu,
          ram: ram,
        };
        const newHistory = [...prev, newPoint];
        if (newHistory.length > 20) newHistory.shift();
        return newHistory;
      });

      setLoading(false);
    } catch (e) {
      console.error("Stats Error", e);
    }
  };

  const fetchProcesses = async () => {
    try {
      const res = await fetch(`${N8N_URL}/get-processes`);
      if (!res.ok) return;
      setProcesses(await res.json());
    } catch {
      console.error("Process Error");
    }
  };

  // --- 3. ACTIONS ---

  const handleKill = async () => {
    if (!killPid) return;
    if (!window.confirm(`Are you sure you want to kill PID ${killPid}?`)) return;

    try {
      await fetch(`${N8N_URL}/kill-process`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pid: killPid }),
      });
      alert(`Signal sent to kill PID ${killPid}`);
      setKillPid("");
      fetchProcesses();
    } catch {
      alert("Failed to connect to server");
    }
  };

  const handleClearRam = async () => {
    try {
      await fetch(`${N8N_URL}/clear-ram`, { method: "POST" });
      alert("RAM Cache Cleared!");
      fetchUsage();
    } catch {
      alert("Failed to clear RAM");
    }
  };

  type TempPoint = { time: string; RAM: number; GPU: number; CPU: number };
  type Process = { pid: number; name: string; usage: number; process: number };
  const [data, setData] = useState<TempPoint[]>([]);
  const [currentTemp, setCurrentTemp] = useState({ ram: 0, gpu: 0, cpu: 0 });
  const [maxPoints, setMaxPoints] = useState(20);

  // Simulate temperature readings
  const getTemperature = (prevTemp: number, min: number, max: number): number => {
    const change = (Math.random() - 0.5) * 4;
    let newTemp = prevTemp + change;
    newTemp = Math.max(min, Math.min(max, newTemp));
    return Math.round(newTemp * 10) / 10;
  };

  // --- 4. AUTO-REFRESH
  useEffect(() => {
    const initialize = async () => {
      await fetchUsage();
      await fetchProcesses();

      setCurrentTemp({
        ram: 45 + Math.random() * 10,
        gpu: 55 + Math.random() * 15,
        cpu: 50 + Math.random() * 15
      });
    };

    initialize();

    const interval = setInterval(() => {
      fetchUsage();
      fetchProcesses();

      const timestamp = new Date().toLocaleTimeString();

      setCurrentTemp(prev => {
        const newRam = getTemperature(prev.ram, 35, 70);
        const newGpu = getTemperature(prev.gpu, 40, 85);
        const newCpu = getTemperature(prev.cpu, 40, 90);

        setData(prevData => {
          const newData = [...prevData, {
            time: timestamp,
            RAM: newRam,
            GPU: newGpu,
            CPU: newCpu
          }];
          return newData.slice(-maxPoints);
        });

        return { ram: newRam, gpu: newGpu, cpu: newCpu };
      });

    }, 3000);

    return () => clearInterval(interval);
  }, [maxPoints]);


  const getTempColor = (temp: number, type: 'ram' | 'gpu' | 'cpu' = 'ram') => {
    const thresholds = { ram: 60, gpu: 75, cpu: 80 };
    const threshold = thresholds[type];
    if (temp > threshold) return 'text-red-500';
    if (temp > threshold - 10) return 'text-yellow-500';
    return 'text-green-500';
  };

  const getTempBg = (temp: number, type: 'ram' | 'gpu' | 'cpu' = 'ram') => {
    const thresholds = { ram: 60, gpu: 75, cpu: 80 };
    const threshold = thresholds[type];
    if (temp > threshold) return 'bg-red-500';
    if (temp > threshold - 10) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  // --- 5. UI RENDER ---
  return (
    <div className="space-y-6 p-4 md:p-8 max-w-7xl mx-auto bg-gray-50 min-h-screen">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Hardware Monitoring</h1>
          <p className="text-purple-600 text-sm mt-1 flex items-center gap-2">
            <Server className="h-4 w-4" /> {stats.cpu_model} ({stats.cpu_cores} Cores)
          </p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm ${loading ? 'bg-yellow-100 text-yellow-600' : 'bg-green-100 text-green-600'}`}>
          {loading ? "Connecting..." : "● System Online"}
        </span>
      </div>

      {/* HARDWARE MONITORING */}
      <Card className="bg-white rounded-xl p-6 shadow-md border border-gray-200 mb-10">
        <CardContent className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 items-center">

            {/* 1. CPU CIRCLE */}
            <MetricCircle
              label="CPU Usage"
              percentage={stats.cpu}
              total={`${stats.cpu_cores} Cores`}
              colorStart="#3b82f6"
              colorEnd="#8b5cf6"
            />

            {/* 2. RAM CIRCLE */}
            <MetricCircle
              label="Memory"
              percentage={stats.ram}
              total={stats.ram_total}
              colorStart="#10b981"
              colorEnd="#06b6d4"
            />

            {/* 3. GPU CIRCLE */}
            {stats.has_gpu ? (
              <MetricCircle
                label="GPU Load"
                percentage={stats.gpu_val}
                total={stats.gpu_mem || "Unknown"}
                colorStart="#f59e0b"
                colorEnd="#ef4444"
              />
            ) : (
              <div className="flex flex-col items-center justify-center">
                <div className="text-xs font-medium text-green-600 mb-8 uppercase">NO GPU</div>
                <div className="w-53 h-53 opacity-40 rounded-full border-4 mb-6 border-dashed border-gray-200 flex items-center justify-center">
                  <Ban className="text-gray-300 h-30 w-30" />
                </div>
              </div>
            )}

            {/* 4. LINEAR STATS (Disk & Network) */}
            <div className="space-y-8 border-l pl-8 border-gray-100">

              {/* Disk Linear Bar */}
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-bold text-gray-700">Disk : (<span className="text-red-600"> <span className="text-green-600"> {stats.disk_total} </span>  </span>)</span>
                  <span className="text-xl font-light text-green-600">{stats.disk}%</span>
                </div>
                <div className="text-xs text-blue-600 mt-1 text-right">{stats.disk_used} used</div>
              </div>

              {/* Network Info */}
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-bold text-gray-700">Network</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-green-50 p-2 rounded border border-green-100">
                    <div className="text-xs text-green-600 uppercase">Download</div>
                    <div className="font-mono font-bold text-green-600">{stats.net_rx} <span className="text-[10px]">KB/s</span></div>
                  </div>
                  <div className="bg-blue-50 p-2 rounded border border-blue-100">
                    <div className="text-xs text-blue-600 uppercase">Upload</div>
                    <div className="font-mono font-bold text-blue-800">{stats.net_tx} <span className="text-[10px]">KB/s</span></div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </CardContent>
      </Card>

      { /* temperature ui */}
      <div>
        {/* Temperature Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">

          {/* RAM Temperature */}
          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <HardDrive className="w-6 h-6 text-purple-400" />
                <h2 className="text-xl font-semibold text-gray-700">RAM Temperature</h2>
              </div>
              <Activity className={`w-5 h-5 ${getTempColor(currentTemp.ram)}`} />
            </div>

            <div className="flex items-end gap-2 mb-4">
              <span className={`text-5xl font-bold ${getTempColor(currentTemp.ram)}`}>
                {currentTemp.ram}
              </span>
              <span className="text-3xl text-gray-400 mb-1">°C</span>
            </div>

            <div className="w-full bg-gray-100 border border-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className={`h-full ${getTempBg(currentTemp.ram)} transition-all duration-300`}
                style={{ width: `${Math.min((currentTemp.ram / 70) * 100, 100)}%` }}
              />
            </div>

            <div className="mt-3 text-sm text-green-400">
              Safe range: 35-60°C
            </div>
          </div>

          {/* GPU Temperature */}
          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Cpu className="w-6 h-6 text-blue-400" />
                <h2 className="text-xl font-semibold text-gray-700">GPU Temperature</h2>
              </div>
              <Activity className={`w-5 h-5 ${getTempColor(currentTemp.gpu, 'gpu')}`} />
            </div>

            <div className="flex items-end gap-2 mb-4">
              <span className={`text-5xl font-bold ${getTempColor(currentTemp.gpu, 'gpu')}`}>
                {currentTemp.gpu}
              </span>
              <span className="text-3xl text-gray-400 mb-1">°C</span>
            </div>

            <div className="w-full bg-gray-100 border border-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className={`h-full ${getTempBg(currentTemp.gpu, 'gpu')} transition-all duration-300`}
                style={{ width: `${Math.min((currentTemp.gpu / 85) * 100, 100)}%` }}
              />
            </div>

            <div className="mt-3 text-sm text-green-400">
              Safe range: 40-75°C
            </div>
          </div>
        </div>

        {/* CPU Temperature */}
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200 mb-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Cpu className="w-6 h-6 text-orange-400" />
              <h2 className="text-xl font-semibold text-gray-700">CPU</h2>
            </div>
            <Activity className={`w-5 h-5 ${getTempColor(currentTemp.cpu, 'cpu')}`} />
          </div>

          <div className="flex items-end gap-2 mb-4">
            <span className={`text-5xl font-bold ${getTempColor(currentTemp.cpu, 'cpu')}`}>
              {currentTemp.cpu}
            </span>
            <span className="text-3xl text-gray-400 mb-1">°C</span>
          </div>

          <div className="w-full bg-gray-100 border border-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className={`h-full ${getTempBg(currentTemp.cpu, 'cpu')} transition-all duration-300`}
              style={{ width: `${Math.min((currentTemp.cpu / 90) * 100, 100)}%` }}
            />
          </div>

          <div className="mt-3 text-sm text-green-400">
            Safe: 40-80°C
          </div>
        </div>

        {/* Chart */}
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200 mb-10">

          <CardHeader>
            <CardTitle>Temperature History</CardTitle>
            <CardDescription className="text-purple-700 mb-6">Second and Minuet Interval Trend</CardDescription>
          </CardHeader>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
              <XAxis
                dataKey="time"
                stroke="#9CA3AF"
                tick={{ fill: '#9CA3AF' }}
                fontSize={12}
              />
              <YAxis
                stroke="#9CA3AF"
                tick={{ fill: '#9CA3AF' }}
                domain={[30, 90]}
                fontSize={12}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  borderRadius: '8px'
                }}
                labelStyle={{ color: '#2b2b2b' }}
              />
              <Legend
                wrapperStyle={{ color: '#2b2b2b' }}
              />
              <Line
                type="monotone"
                dataKey="GPU"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={false}
                name="GPU %"
              />
              <Line
                type="monotone"
                dataKey="RAM"
                stroke="#10b981"
                strokeWidth={2}
                dot={false}
                name="RAM %"
              />
              <Line
                type="monotone"
                dataKey="CPU"
                stroke="#AD3FD9"
                strokeWidth={2}
                dot={false}
                name="CPU %"
              />
            </LineChart>
          </ResponsiveContainer>

          <div className="mt-4 flex justify-center gap-4">
            <button
              onClick={() => setMaxPoints(30)}
              className={`px-4 py-2 rounded-lg ${maxPoints === 30 ? 'bg-green-400' : 'bg-gray-300'} text-white`}
            >
              30s
            </button>
            <button
              onClick={() => setMaxPoints(60)}
              className={`px-4 py-2 rounded-lg ${maxPoints === 60 ? 'bg-green-400' : 'bg-gray-300'} text-white`}
            >
              1m
            </button>
            <button
              onClick={() => setMaxPoints(180)}
              className={`px-4 py-2 rounded-lg ${maxPoints === 180 ? 'bg-green-400' : 'bg-gray-300'} text-white`}
            >
              3m
            </button>
          </div>
        </div>

        {/* CHARTS & CONTROLS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* CHART */}
          <Card className="lg:col-span-2 bg-white rounded-xl p-6 shadow-md border border-gray-200 mb-10">
            <CardHeader>
              <CardTitle>Performance History</CardTitle>
              <CardDescription className="text-purple-700">3-Second Interval Trend</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
                  <XAxis dataKey="time" fontSize={12} stroke="#888" />
                  <YAxis domain={[0, 100]} fontSize={12} stroke="#888" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      borderRadius: '8px'
                    }}
                    labelStyle={{ color: '#2b2b2b' }}
                  />
                  <Legend
                    wrapperStyle={{ color: '#2b2b2b' }}
                  />
                  <Line type="monotone" dataKey="cpu" stroke="#3b82f6" strokeWidth={2} dot={false} name="CPU %" />
                  <Line type="monotone" dataKey="ram" stroke="#10b981" strokeWidth={2} dot={false} name="RAM %" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* CONTROLS */}
          <Card className="bg-white rounded-xl p-6 shadow-md border border-gray-200 mb-10">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription className="text-purple-700">Management Tools</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="text-sm font-medium mb-2 block text-blue-700">Memory Optimization</label>
                <Button onClick={handleClearRam} variant="outline" className="w-full border-blue-200 text-gray-600 hover:bg-blue-50 hover:text-blue-600">
                  <Trash2 className="mr-2 h-4 w-4" /> Clear RAM Cache
                </Button>
              </div>
              <div className="h-px bg-gray-100" />
              <div>
                <label className="text-sm font-medium mb-2 block text-red-700">Force Kill Process</label>
                <div className="flex gap-2">
                  <Input placeholder="Enter PID" value={killPid} onChange={(e) => setKillPid(e.target.value)} />
                  <Button onClick={handleKill} variant="destructive"><Ban className="h-4 w-4" /></Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* PROCESS TABLE */}
        <Card className="bg-white rounded-xl p-6 shadow-md border border-gray-200 mb-10">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Top Active Processes</CardTitle>
              {stats.has_gpu && <div className="text-xs font-bold bg-red-100 text-red-600 px-2 py-1 rounded flex items-center gap-1"><Zap size={12} /> GPU Enabled</div>}
            </div>
          </CardHeader>
          <CardContent>
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 uppercase text-xs">
                <tr><th className="p-3 text-blue-400">PID</th><th className="p-3 text-purple-400">Name</th><th className="p-3 text-red-400">Usage</th><th className="p-3 text-green-400">Status</th></tr>
              </thead>
              <tbody>
                {processes.length > 0 ? (
                  processes.map((p: Process, i) => (
                    <tr key={i} className="border-b hover:bg-slate-50">
                      <td className="p-3 font-mono text-blue-600">{p.pid}</td>
                      <td className="p-3 font-medium text-purple-600">{p.name}</td>
                      <td className="p-3 font-bold text-red-600">{p.usage}%</td>
                      <td className="p-3 text-green-600 text-xs font-bold">RUNNING</td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan={4} className="text-center py-8 text-gray-400">Waiting for data...</td></tr>
                )}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
