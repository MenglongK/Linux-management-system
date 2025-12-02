export interface RemoteServer {
  id: string;
  name: string;
  ipAddress: string;
  username: string;
  port?: number; // optional because some entries don’t include it
  status: "Connected" | "Disconnected" | "Error";
  lastConnected: string;
}

export interface RemoteServerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  server: RemoteServer | null;
  onSave: (server: RemoteServer) => void;
}
