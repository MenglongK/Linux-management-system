export interface RemoteServer {
  id?: string;
  name: string;
  ipAddress: string;
  port: number;
  username: string;
  status: "online" | "offline" | "maintenance";
  lastChecked?: string;
  region: string;
  description: string;
}

export  interface RemoteServerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  server: RemoteServer | null;
  onSave: (server: RemoteServer) => void;
}