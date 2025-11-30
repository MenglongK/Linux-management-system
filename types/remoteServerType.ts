export type RemoteServer = {
  id: string; 
  name: string;
  ipAddress: string;
  username: string;
  port?: number; 
  status: 'Connected' | 'Disconnected' | 'Error' | string; 
  lastConnected: string; 
};