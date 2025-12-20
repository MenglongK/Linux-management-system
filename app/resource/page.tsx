"use client";

import React, { useState, useEffect } from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts";

import {
  Server,
  Trash2,
  Ban,
  Zap,
  Activity,
  HardDrive,
  Cpu,
  MemoryStick,
  Thermometer,
  Download,
  Upload,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/Badge";
import { MetricCircle } from "@/components/resources/MetricCircle";

const N8N_URL = process.env.NEXT_PUBLIC_N8N_URL || "https://api.rotana-dev.online/webhook";

export default function Resources() {

  const [isMounted, setIsMounted] = useState(false);

  const [stats, setStats] = useState({
    cpu: 0, cpu_model: "Loading...", cpu_cores: "0", cpu_temp: "0",
    ram: 0, ram_total: "0GB", ram_used: "0GB",
    disk: 0, disk_total: "0GB", disk_used: "0GB",
    has_gpu: false, gpu_val: 0, gpu_name: "", gpu_mem: "N/A", gpu_temp: "0",
    net_rx: 0, net_tx: 0,
  });

  const [processes, setProcesses] = useState([]);
  type ChartPoint = { time: string; cpu: number; ram: number; gpu: number };
  const [chartData, setChartData] = useState<ChartPoint[]>([]);
  const [killPid, setKillPid] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchUsage = async () => {
    try {
      const res = await fetch(`${N8N_URL}/get-usage`);
      if (!res.ok) return;
      const data = await res.json();

      const cpu = parseFloat(data.cpu || 0);
      const ram = parseFloat(data.ram || 0);
      const gpu = parseFloat(data.gpu_val || 0);

      setStats({
        cpu, ram,
        cpu_model: data.cpu_model || "Unknown CPU",
        cpu_cores: data.cpu_cores || "0",
        cpu_temp: data.cpu_temp || "0",
        ram_total: data.ram_total || "0GB",
        ram_used: data.ram_used || "0GB",
        disk: parseFloat(data.disk || 0),
        disk_total: data.disk_total || "0GB",
        disk_used: data.disk_used || "0GB",
        has_gpu: data.has_gpu,
        gpu_val: gpu,
        gpu_name: data.gpu_name || "",
        gpu_mem: data.gpu_mem || "N/A",
        gpu_temp: data.gpu_temp || "0",
        net_rx: parseInt(data.net_rx || 0),
        net_tx: parseInt(data.net_tx || 0),
      });

      setChartData((prev) => {
        const newPoint = {
          time: new Date().toLocaleTimeString([], { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }),
          cpu, ram, gpu
        };
        const newHistory = [...prev, newPoint];
        if (newHistory.length > 20) newHistory.shift();
        return newHistory;
      });

      setLoading(false);
    } catch (e) { console.error("Stats Error", e); }
  };

  const fetchProcesses = async () => {
    try {
      const res = await fetch(`${N8N_URL}/get-processes`);
      if (!res.ok) return;
      setProcesses(await res.json());
    } catch { console.error("Process Error"); }
  };

  const handleKill = async () => {
    if (!killPid) return;
    if (!confirm(`Are you sure you want to kill PID ${killPid}?`)) return;
    try {
      await fetch(`${N8N_URL}/kill-process`, {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ pid: killPid }),
      });
      alert(`Signal sent to PID ${killPid}`); setKillPid(""); fetchProcesses();
    } catch { alert("Failed to connect"); }
  };

  const handleClearRam = async () => {
    try { await fetch(`${N8N_URL}/clear-ram`, { method: "POST" }); alert("RAM Cleared"); fetchUsage(); } catch { alert("Failed"); }
  };

  useEffect(() => {
    setIsMounted(true);

    fetchUsage(); fetchProcesses();
    const interval = setInterval(() => { fetchUsage(); fetchProcesses(); }, 3000);
    return () => clearInterval(interval);
  }, []);

  const glassCard = "bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/20 dark:border-slate-700/50 shadow-lg rounded-2xl transition-all hover:shadow-xl hover:bg-white/70 dark:hover:bg-slate-900/70";
  const glassInput = "bg-white/50 dark:bg-slate-800/50 border-white/30 dark:border-slate-600/30 backdrop-blur-md focus:bg-white/80 dark:focus:bg-slate-800/80";

  return (
    <div className="min-h-screen font-sans text-slate-800 dark:text-slate-100 p-4 md:p-8 transition-colors duration-500 bg-linear-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950">
      
      <div className="max-w-7xl mx-auto space-y-8">

        <header className="flex flex-col md:flex-row justify-between md:items-end gap-4 pb-2 border-b border-slate-200/50 dark:border-slate-700/50">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight bg-linear-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              System Monitor
            </h1>
            <div className="text-slate-500 dark:text-slate-400 mt-2 flex items-center gap-2 font-medium">
              <Server className="h-4 w-4 text-indigo-500" /> 
              {stats.cpu_model} 
              <Badge variant="outline" className="ml-2 bg-indigo-100/50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 border-0">
                {stats.cpu_cores} Cores
              </Badge>
            </div>
          </div>
          <div className={`px-4 py-1.5 rounded-full text-xs font-bold shadow-sm backdrop-blur-md border ${loading ? 'bg-yellow-100/80 text-yellow-700 border-yellow-200' : 'bg-emerald-100/80 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800'}`}>
            {loading ? "Connecting..." : "● System Online"}
          </div>
        </header>

        <div className={`p-8 ${glassCard}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-12 items-center justify-items-center">
            
            <MetricCircle
              label="CPU Load" percentage={stats.cpu} 
              total={`${stats.cpu_temp}°C`} 
              colorStart="#3b82f6" colorEnd="#8b5cf6" 
              icon={<Cpu size={18} />}
            />

            <MetricCircle 
              label="Memory" percentage={stats.ram} 
              total={stats.ram_total} 
              colorStart="#10b981" colorEnd="#06b6d4" 
              icon={<MemoryStick size={18} />}
            />

            {stats.has_gpu ? (
              <MetricCircle 
                label="GPU Load" percentage={stats.gpu_val} 
                total={stats.gpu_mem || "N/A"} 
                colorStart="#f59e0b" colorEnd="#ef4444" 
                icon={<Zap size={18} />}
              />
            ) : (
              <div className="flex flex-col items-center justify-center opacity-40 grayscale">
                <div className="text-xs font-bold text-slate-400 mb-4 uppercase tracking-widest">NO GPU</div>
                <div className="w-40 h-40 rounded-full border-4 border-dashed border-slate-300 dark:border-slate-600 flex items-center justify-center bg-slate-100/50 dark:bg-slate-800/50">
                  <Ban className="text-slate-400 h-12 w-12" />
                </div>
              </div>
            )}

            <div className="w-full max-w-xs space-y-8 pl-0 xl:pl-8 xl:border-l border-slate-200 dark:border-slate-700">
              
              <div className="group">
                <div className="flex justify-between mb-2 items-end">
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-2">
                    <HardDrive size={14}/> DISK ({stats.disk_total})
                  </span>
                  <span className="text-xl font-light text-slate-800 dark:text-slate-200">{stats.disk}%</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden shadow-inner">
                  <div className="h-full bg-linear-to-r from-orange-400 to-red-500 transition-all duration-700 ease-out group-hover:brightness-110" style={{ width: `${stats.disk}%` }}></div>
                </div>
                <div className="text-[10px] text-slate-400 mt-1 text-right">{stats.disk_used} used</div>
              </div>

              <div>
                <div className="flex justify-between mb-3">
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-2">
                    <Activity size={14}/> NETWORK
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-2.5 rounded-lg border border-emerald-100 dark:border-emerald-800 backdrop-blur-sm">
                    <div className="text-[10px] text-emerald-600 dark:text-emerald-400 uppercase font-bold flex items-center gap-1 mb-1"><Download size={10}/> Down</div>
                    <div className="font-mono font-bold text-emerald-700 dark:text-emerald-300 text-lg">{stats.net_rx} <span className="text-[10px] opacity-70">KB/s</span></div>
                  </div>
                  <div className="bg-blue-50/50 dark:bg-blue-900/20 p-2.5 rounded-lg border border-blue-100 dark:border-blue-800 backdrop-blur-sm">
                    <div className="text-[10px] text-blue-600 dark:text-blue-400 uppercase font-bold flex items-center gap-1 mb-1"><Upload size={10}/> Up</div>
                    <div className="font-mono font-bold text-blue-700 dark:text-blue-300 text-lg">{stats.net_tx} <span className="text-[10px] opacity-70">KB/s</span></div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className={`lg:col-span-2 p-6 ${glassCard}`}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold flex items-center gap-2 text-slate-700 dark:text-slate-200">
                <Activity className="text-indigo-500" size={20}/> Performance History
              </h3>
              <div className="flex gap-4 text-xs font-medium">
                <span className="flex items-center gap-1 text-blue-500"><div className="w-2 h-2 rounded-full bg-blue-500"></div> CPU</span>
                <span className="flex items-center gap-1 text-emerald-500"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> RAM</span>
                {stats.has_gpu && <span className="flex items-center gap-1 text-orange-500"><div className="w-2 h-2 rounded-full bg-orange-500"></div> GPU</span>}
              </div>
            </div>
            <div className="h-80 w-full">
              {isMounted ? (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorRam" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-slate-200 dark:text-slate-700 opacity-50" />
                    <XAxis dataKey="time" fontSize={10} stroke="currentColor" className="text-slate-400" tick={{dy: 10}} />
                    <YAxis domain={[0, 100]} fontSize={10} stroke="currentColor" className="text-slate-400" />
                    <Tooltip 
                      contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', backgroundColor: 'rgba(255, 255, 255, 0.9)'}}
                      itemStyle={{fontSize: '12px', fontWeight: 'bold'}}
                    />
                    <Area type="monotone" dataKey="cpu" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorCpu)" />
                    <Area type="monotone" dataKey="ram" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorRam)" />
                    {stats.has_gpu && <Area type="monotone" dataKey="gpu" stroke="#f59e0b" strokeWidth={2} fillOpacity={0} />}
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                 <div className="flex items-center justify-center h-full text-slate-400">Loading Chart...</div>
              )}
            </div>
          </div>

          <div className={`p-6 ${glassCard} flex flex-col justify-between`}>
            <div>
              <h3 className="text-lg font-bold mb-1 text-slate-700 dark:text-slate-200">Management</h3>
              <p className="text-sm text-slate-400 mb-6">Server Maintenance Tools</p>
              
              <div className="space-y-6">
                <div>
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-2 block">Memory</label>
                  <Button 
                    onClick={handleClearRam} 
                    variant="outline" 
                    className={`w-full justify-start h-12 text-slate-600 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-600 dark:hover:text-indigo-400 border-slate-200 dark:border-slate-700 ${glassInput}`}
                  >
                    <div className="p-1.5 bg-indigo-100 dark:bg-indigo-900 rounded mr-3 text-indigo-600 dark:text-indigo-400">
                      <Trash2 size={16} />
                    </div>
                    Clear RAM Cache
                  </Button>
                </div>

                <div className="h-px bg-linear-to-r from-transparent via-slate-200 dark:via-slate-700 to-transparent" />

                <div>
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-2 block">Force Stop</label>
                  <div className="flex gap-2">
                    <Input 
                      placeholder="Enter PID" 
                      value={killPid} 
                      onChange={(e) => setKillPid(e.target.value)} 
                      className={`font-mono h-12 ${glassInput}`} 
                    />
                    <Button 
                      onClick={handleKill} 
                      className="h-12 w-14 bg-red-500 hover:bg-red-600 text-white shadow-md shadow-red-200 dark:shadow-none"
                    >
                      <Ban size={20} />
                    </Button>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-2 text-center">
                    ⚠️ Forces immediate termination
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-center">
               <span className="text-[10px] uppercase font-bold text-slate-300 dark:text-slate-600 tracking-widest">
                 System Secure • Encrypted
               </span>
            </div>
          </div>
        </div>


        <div className={`overflow-hidden ${glassCard}`}>
          <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
            <h3 className="text-lg font-bold text-slate-700 dark:text-slate-200">Top Processes</h3>
            {stats.has_gpu && (
              <Badge variant="secondary" className="bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 hover:bg-orange-100 border-0">
                <Zap size={10} className="mr-1 fill-current"/> GPU Active
              </Badge>
            )}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50/50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 uppercase text-xs font-bold tracking-wider">
                <tr>
                  <th className="p-4 pl-6">PID</th>
                  <th className="p-4">Process Name</th>
                  <th className="p-4">CPU Usage</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {processes.length > 0 ? (
                  processes.map((p: any, i) => (
                    <tr key={`${p.pid}-${i}`} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="p-4 pl-6 font-mono text-indigo-600 dark:text-indigo-400 font-bold">{p.pid}</td>
                      <td className="p-4 font-medium text-slate-700 dark:text-slate-300">{p.name}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <span className={`font-bold ${parseFloat(p.usage) > 50 ? 'text-red-500' : 'text-slate-700 dark:text-slate-300'}`}>
                            {p.usage}%
                          </span>
                          <div className="w-16 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full ${parseFloat(p.usage) > 50 ? 'bg-red-500' : 'bg-emerald-500'}`} style={{width: `${Math.min(parseFloat(p.usage), 100)}%`}}></div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400">
                          RUNNING
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="text-center py-12 text-slate-400 italic">
                      Waiting for server data...
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}