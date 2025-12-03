"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Edit2,
  Trash2,
  Globe,
  Signal,
  AlertTriangle,
  Link as LinkIcon,
  Zap,
} from "lucide-react";
import { RemoteServerModal } from "@/components/remote-server/RemoteServer";
import { mockServers } from "@/data/mockRemoteServer";
import { RemoteServer } from "@/types/remoteServerType";

type NewServerData = Omit<RemoteServer, 'id' | 'status' | 'lastConnected'>;

export default function RemoteServers() {
  const [servers, setServers] = useState<RemoteServer[]>(mockServers);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingServer, setEditingServer] = useState<RemoteServer | null>(null);

  const router = useRouter(); 


  const handleAddServer = (serverData: NewServerData) => {
    const newServer: RemoteServer = {
      ...serverData,
      id: Date.now().toString(),
      lastConnected: new Date().toISOString(),
      status: 'Disconnected',
    };
    setServers([...servers, newServer]);
    setModalOpen(false);
  };

  const handleUpdateServer = (server: RemoteServer) => {
    setServers(servers.map((s) => (s.id === server.id ? server : s)));
    setEditingServer(null);
    setModalOpen(false);
  };

  const handleDeleteServer = (id: string) => {
    setServers(servers.filter((s) => s.id !== id));
  };
  
  const handleConnectServer = (server: RemoteServer) => {
    console.log(`Navigating to terminal for server: ${server.name} (${server.id})`);
    router.push(`/terminal/${server.id}`);
  };

  
  const getStatusDisplay = (status: string) => {
    switch (status) {
      case 'Connected':
        return { icon: <Signal size={16} className="text-green-500" />, color: 'text-green-500' };
      case 'Error':
        return { icon: <AlertTriangle size={16} className="text-red-500" />, color: 'text-red-500' };
      case 'Disconnected':
      default:
        return { icon: <Globe size={16} className="text-gray-500" />, color: 'text-gray-500' };
    }
  };

  return (
    <>
      <div className="space-y-6 p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Remote Servers</h1>
            <p className="text-muted-foreground">
              Manage remote servers by IP address and establish SSH connections.
            </p>
          </div>
          <Button
            onClick={() => {
              setEditingServer(null);
              setModalOpen(true);
            }}
            className="gap-2 bg-green-600 hover:bg-green-700"
          >
            <Plus size={20} />
            Add Server
          </Button>
        </div>

        {/* --- Card Grid Rendering Logic --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {servers.map((server) => {
            const { icon, color } = getStatusDisplay(server.status || 'Disconnected');
            
            return (
              <Card 
                key={server.id} 
                className="hover:shadow-xl transition-shadow duration-300 border-2 hover:border-green-500"
              >
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl font-semibold">{server.name}</CardTitle>
                    <div className={`p-1 rounded-full ${color}`}>
                      {icon}
                    </div>
                  </div>
                  <CardDescription>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <LinkIcon size={14} className="text-muted-foreground" />
                        <span>{server.ipAddress}</span>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm">
                    <span className="font-medium">User:</span> {server.username}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Port:</span> {server.port || '22'}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Status:</span> 
                    <span className={`ml-1 font-semibold ${color}`}>{server.status || 'Disconnected'}</span>
                  </p>

                  <div className="flex justify-between space-x-2 pt-2 border-t mt-4">
                    <Button
                      variant="default"
                      size="sm"
                      className="bg-black hover:bg-gray-800 text-white grow mr-2" 
                      onClick={() => handleConnectServer(server)}
                    >
                      <Zap size={16} className="mr-1" /> Connect
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setEditingServer(server);
                        setModalOpen(true);
                      }}
                    >
                      <Edit2 size={16} />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteServer(server.id)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {servers.length === 0 && (
            <div className="text-center py-10 text-gray-500">
                <Globe size={32} className="mx-auto mb-2" />
                <p>No remote servers configured yet. Click &quot;Add Server&quot; to get started.</p>
            </div>
        )}
      
      </div>

      <RemoteServerModal
        key={editingServer ? editingServer.id : 'new'} 
        open={modalOpen}
        onOpenChange={setModalOpen}
        server={editingServer}
        onSave={(serverData) =>
          editingServer
            ? handleUpdateServer(serverData as RemoteServer)
            : handleAddServer(serverData as NewServerData)
        }
      />
    </>
  );
}