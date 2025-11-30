"use client";

import { useParams } from 'next/navigation';
import { mockServers } from '@/data/mockRemoteServer';
import { Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RemoteServer } from '@/types/remoteServerType'; 


export default function TerminalPage() {
  const params = useParams();
  const serverId = params.id as string;
  
  const server = mockServers.find(s => s.id === serverId) as RemoteServer | undefined;

  if (!server) {
    return (
      <div className="p-8 text-center text-red-500">
        <h1 className="text-3xl font-bold">Error 404</h1>
        <p>Server with ID &quot;{serverId}&quot; not found.</p>
      </div>
    );
  }


  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      <header className="bg-green-600 p-3 flex items-center justify-between shadow-lg h-12">
        <h1 className="text-lg font-mono">
          <Terminal size={18} className="inline mr-2" />
          {server.username}@{server.ipAddress} - {server.name}
        </h1>
        <Button size="sm" variant="secondary" onClick={() => window.history.back()}>
          Disconnect
        </Button>
      </header>
      
      <main className="flex-1 p-2 overflow-hidden">
        <div className="h-full w-full bg-black text-green-400 font-mono text-sm p-4 rounded-lg overflow-y-auto">
          <p>Connecting to {server.name}...</p>
          <p>
            <span className="text-gray-500">
              [Simulated Output: Please implement Xterm.js and WebSocket connection]
            </span>
          </p>
          <p>
            {server.username}@{server.name}:~$ 
          </p>
        </div>
      </main>
    </div>
  );
}