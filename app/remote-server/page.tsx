"use client";

import { useState } from "react";
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
} from "lucide-react";
import { RemoteServerModal } from "@/components/remote-server/RemoteServer";
import { mockServers } from "@/data/mockRemoteServer";
import { RemoteServer } from "@/types/remoteServerType";

export default function RemoteServers() {
  const [servers, setServers] = useState<RemoteServer[]>(mockServers);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingServer, setEditingServer] = useState<RemoteServer | null>(null);

  const handleAddServer = (
    server: Omit<RemoteServer, "id" | "lastChecked">
  ) => {
    const newServer: RemoteServer = {
      ...server,
      id: Date.now().toString(),
      lastChecked: "now",
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "offline":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case "maintenance":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "online":
        return <Signal className="w-4 h-4 text-green-500" />;
      case "offline":
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case "maintenance":
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      default:
        return <Globe className="w-4 h-4" />;
    }
  };

  const onlineCount = servers.filter((s) => s.status === "online").length;
  const offlineCount = servers.filter((s) => s.status === "offline").length;

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Remote Servers</h1>
            <p className="text-muted-foreground">
              Manage remote servers by IP address
            </p>
          </div>
          <Button
            onClick={() => {
              setEditingServer(null);
              setModalOpen(true);
            }}
            className="gap-2"
          >
            <Plus size={20} />
            Add Server
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Total Servers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{servers.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Online</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {onlineCount}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Offline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {offlineCount}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Uptime</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {((onlineCount / servers.length) * 100).toFixed(1)}%
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Connected Servers</CardTitle>
            <CardDescription>
              Monitor and manage your remote infrastructure
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold">
                      Server Name
                    </th>
                    <th className="text-left py-3 px-4 font-semibold">
                      IP Address
                    </th>
                    <th className="text-left py-3 px-4 font-semibold">
                      Region
                    </th>
                    <th className="text-left py-3 px-4 font-semibold">
                      Status
                    </th>
                    <th className="text-left py-3 px-4 font-semibold">
                      Last Checked
                    </th>
                    <th className="text-left py-3 px-4 font-semibold">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {servers.map((server) => (
                    <tr
                      key={server.id}
                      className="border-b border-border hover:bg-muted/50 transition"
                    >
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-semibold">{server.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {server.description}
                          </p>
                        </div>
                      </td>
                      <td className="py-3 px-4 font-mono text-sm">
                        {server.ipAddress}:{server.port}
                      </td>
                      <td className="py-3 px-4 text-sm">{server.region}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(server.status)}
                          <span
                            className={`text-xs font-medium px-2 py-1 rounded capitalize ${getStatusColor(
                              server.status
                            )}`}
                          >
                            {server.status}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">
                        {server.lastChecked}
                      </td>
                      <td className="py-3 px-4 space-x-2 flex">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setEditingServer(server);
                            setModalOpen(true);
                          }}
                        >
                          <Edit2 size={16} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            server.id && handleDeleteServer(server.id)
                          }
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
          <CardHeader>
            <CardTitle className="text-blue-900 dark:text-blue-100">
              How to Connect Remote Servers
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-blue-800 dark:text-blue-200 space-y-2">
            <p>To add a remote server by public IP:</p>
            <ol className="list-decimal list-inside space-y-1">
              <li>
                Ensure the server is accessible via SSH (port 22 or custom port)
              </li>
              <li>Have valid credentials (username and password/key)</li>
              <li>
                Click &quot;Add Server&quot; and enter the public IP address
              </li>
              <li>System will verify connectivity automatically</li>
              <li>Once verified, you can monitor and manage the server</li>
            </ol>
          </CardContent>
        </Card>
      </div>

      <RemoteServerModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        server={editingServer}
        onSave={(server: RemoteServer | Omit<RemoteServer, "id">) =>
          editingServer
            ? handleUpdateServer(server as RemoteServer)
            : handleAddServer(server as Omit<RemoteServer, "id">)
        }
      />
    </>
  );
}
