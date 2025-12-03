// data/mockRemoteServer.ts

import { RemoteServer } from "@/types/remoteServerType";

export const mockServers: RemoteServer[] = [
  {
    id: "1",
    name: "Web-01",
    ipAddress: "192.168.1.100",
    username: "devuser",
    port: 22,
    status: "Connected",
    lastConnected: new Date().toISOString(),
  },
  {
    id: "2",
    name: "DB-Primary",
    ipAddress: "10.0.0.5",
    username: "dbadmin",
    port: 5000,
    status: "Disconnected",
    lastConnected: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: "3",
    name: "LoadBalancer",
    ipAddress: "203.0.113.1",
    username: "root",
    status: "Error",
    lastConnected: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: "4",
    name: "Home-Lab",
    ipAddress: "203.2.113.4",
    username: "root",
    status: "Error",
    lastConnected: new Date(Date.now() - 3600000).toISOString(),
  },
];