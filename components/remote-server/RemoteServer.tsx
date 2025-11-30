import { useState } from 'react'; 
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { RemoteServer } from "@/types/remoteServerType"; 


type NewServerData = Omit<RemoteServer, 'id' | 'status' | 'lastConnected'>;

interface RemoteServerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  server: RemoteServer | null;
  onSave: (server: RemoteServer | NewServerData) => void;
}


export const RemoteServerModal = ({
  open,
  onOpenChange,
  server,
  onSave,
}: RemoteServerModalProps) => { 
  
 
  const [name, setName] = useState(server?.name || '');
  const [ipAddress, setIpAddress] = useState(server?.ipAddress || '');
  const [username, setUsername] = useState(server?.username || '');
  const [port, setPort] = useState<number | undefined>(server?.port || 22);
  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newOrUpdatedServer: NewServerData = {
      name,
      ipAddress,
      username,
      port,
    };
    
    if (server) {
      onSave({ 
        ...newOrUpdatedServer, 
        id: server.id, 
        status: server.status, 
        lastConnected: server.lastConnected 
      } as RemoteServer);
    } else {
      onSave(newOrUpdatedServer);
    }
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{server ? 'Edit Server' : 'Add New Server'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="ipAddress" className="text-right">IP Address</Label>
              <Input
                id="ipAddress"
                value={ipAddress}
                onChange={(e) => setIpAddress(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">Username</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="port" className="text-right">Port</Label>
              <Input
                id="port"
                type="number"
                value={port === undefined ? '' : port}
                onChange={(e) => setPort(e.target.value ? parseInt(e.target.value) : undefined)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};