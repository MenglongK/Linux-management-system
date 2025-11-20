"use client";
import { MetricCircle } from "@/components/resources/MetricCircle";
import { useState, useEffect } from "react";
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
  const [chartData, setChartData] = useState<any[]>([]);
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
          time: new Date().toLocaleTimeString([], { hour12: false, hour: "2-digit", minute: "2-digit", second:"2-digit" }),
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
    } catch (e) {
      console.error("Process Error", e);
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
    } catch (e) {
      alert("Failed to connect to server");
    }
  };

  const handleClearRam = async () => {
    try {
      await fetch(`${N8N_URL}/clear-ram`, { method: "POST" });
      alert("RAM Cache Cleared!");
      fetchUsage();
    } catch (e) {
      alert("Failed to clear RAM");
    }
  };

  // --- 4. AUTO-REFRESH
  useEffect(() => {
    fetchUsage();
    fetchProcesses();
    const interval = setInterval(() => {
      fetchUsage();
      fetchProcesses();
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // --- 5. UI RENDER ---
  return (
    <div className="space-y-6 p-4 md:p-8 max-w-7xl mx-auto bg-gray-50 min-h-screen">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Hardware Monitoring</h1>
          <p className="text-muted-foreground text-sm mt-1 flex items-center gap-2">
            <Server className="h-4 w-4" /> {stats.cpu_model} ({stats.cpu_cores} Cores)
          </p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm ${loading ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
          {loading ? "Connecting..." : "● System Online"}
        </span>
      </div>

      {/* HARDWARE MONITORING */}
      <Card className="border-none shadow-md bg-white">
        <CardContent className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-center">
              
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
                  <div className="flex flex-col items-center justify-center opacity-40">
                      <div className="text-xs font-medium text-gray-400 mb-2 uppercase">NO GPU</div>
                      <div className="w-36 h-36 rounded-full border-4 border-dashed border-gray-200 flex items-center justify-center">
                          <Ban className="text-gray-300 h-10 w-10" />
                      </div>
                  </div>
              )}

              {/* 4. LINEAR STATS (Disk & Network) */}
              <div className="space-y-8 border-l pl-8 border-gray-100">
                  
                  {/* Disk Linear Bar */}
                  <div>
                      <div className="flex justify-between mb-2">
                          <span className="text-sm font-bold text-gray-700">Disk ({stats.disk_total})</span>
                          <span className="text-xl font-light text-gray-800">{stats.disk}%</span>
                      </div>
                      <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-500" style={{ width: `${stats.disk}%` }}></div>
                      </div>
                      <div className="text-xs text-gray-400 mt-1 text-right">{stats.disk_used} used</div>
                  </div>

                  {/* Network Info */}
                  <div>
                      <div className="flex justify-between mb-2">
                          <span className="text-sm font-bold text-gray-700">Network</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                          <div className="bg-green-50 p-2 rounded border border-green-100">
                              <div className="text-xs text-green-600 uppercase">Download</div>
                              <div className="font-mono font-bold text-green-800">{stats.net_rx} <span className="text-[10px]">KB/s</span></div>
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

      {/* CHARTS & CONTROLS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* CHART */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Performance History</CardTitle>
            <CardDescription>3-Second Interval Trend</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                <XAxis dataKey="time" fontSize={12} stroke="#888" />
                <YAxis domain={[0, 100]} fontSize={12} stroke="#888" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="cpu" stroke="#3b82f6" strokeWidth={2} dot={false} name="CPU %" />
                <Line type="monotone" dataKey="ram" stroke="#10b981" strokeWidth={2} dot={false} name="RAM %" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* CONTROLS */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Management Tools</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
                <label className="text-sm font-medium mb-2 block text-gray-700">Memory Optimization</label>
                <Button onClick={handleClearRam} variant="outline" className="w-full border-purple-200 text-purple-700 hover:bg-purple-50">
                    <Trash2 className="mr-2 h-4 w-4" /> Clear RAM Cache
                </Button>
            </div>
            <div className="h-px bg-gray-100" />
            <div>
                <label className="text-sm font-medium mb-2 block text-gray-700">Force Kill Process</label>
                <div className="flex gap-2">
                    <Input placeholder="Enter PID" value={killPid} onChange={(e) => setKillPid(e.target.value)} />
                    <Button onClick={handleKill} variant="destructive"><Ban className="h-4 w-4" /></Button>
                </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* PROCESS TABLE */}
      <Card>
        <CardHeader>
            <div className="flex items-center justify-between">
                <CardTitle>Top Active Processes</CardTitle>
                {stats.has_gpu && <div className="text-xs font-bold bg-red-100 text-red-600 px-2 py-1 rounded flex items-center gap-1"><Zap size={12}/> GPU Enabled</div>}
            </div>
        </CardHeader>
        <CardContent>
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
                <tr><th className="p-3">PID</th><th className="p-3">Name</th><th className="p-3">Usage</th><th className="p-3">Status</th></tr>
              </thead>
              <tbody>
                {processes.map((p: any, i) => (
                  <tr key={i} className="border-b hover:bg-slate-50">
                    <td className="p-3 font-mono text-blue-600">{p.pid}</td>
                    <td className="p-3 font-medium text-gray-700">{p.name}</td>
                    <td className="p-3 font-bold">{p.usage}%</td>
                    <td className="p-3 text-green-600 text-xs font-bold">RUNNING</td>
                  </tr>
                ))}
                {processes.length === 0 && (
                    <tr><td colSpan={4} className="text-center py-8 text-gray-400">Waiting for data...</td></tr>
                )}
              </tbody>
            </table>
        </CardContent>
      </Card>
    </div>
  );
}
