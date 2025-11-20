"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RemoteServer, RemoteServerModalProps } from "@/types/remoteServerType";

const regions = [
  "US-East-1",
  "US-West-1",
  "US-West-2",
  "US-Central-1",
  "EU-West-1",
  "EU-Central-1",
  "Asia-Pacific-1",
  "Asia-Pacific-2",
];

export function RemoteServerModal({
  open,
  onOpenChange,
  server,
  onSave,
}: RemoteServerModalProps) {
  const [formData, setFormData] = useState<RemoteServer>({
    name: "",
    ipAddress: "",
    port: 22,
    username: "",
    status: "offline",
    region: "US-East-1",
    description: "",
  });

  useEffect(() => {
    Promise.resolve().then(() => {
      if (server) {
        setFormData(server);
      } else {
        setFormData({
          name: "",
          ipAddress: "",
          port: 22,
          username: "",
          status: "offline",
          region: "US-East-1",
          description: "",
        });
      }
    });
  }, [server, open]);

  const handleSubmit = () => {
    onSave(formData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {server ? "Edit Remote Server" : "Add Remote Server"}
          </DialogTitle>
          <DialogDescription>
            {server
              ? "Update server connection details"
              : "Add a new remote server by public IP"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="name" className="pb-3">Server Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="e.g., Production Server 1"
            />
          </div>

          <div>
            <Label htmlFor="ipAddress" className="pb-3">Public IP Address</Label>
            <Input
              id="ipAddress"
              value={formData.ipAddress}
              onChange={(e) =>
                setFormData({ ...formData, ipAddress: e.target.value })
              }
              placeholder="e.g., 192.168.1.100"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="port" className="pb-3">SSH Port</Label>
              <Input
                id="port"
                type="number"
                value={formData.port}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    port: parseInt(e.target.value) || 22,
                  })
                }
                placeholder="22"
              />
            </div>
            <div>
              <Label htmlFor="username" className="pb-3">Username</Label>
              <Input
                id="username"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                placeholder="e.g., admin"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="region" className="pb-3">Region</Label>
            <Select
              value={formData.region}
              onValueChange={(value) =>
                setFormData({ ...formData, region: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {regions.map((region) => (
                  <SelectItem key={region} value={region}>
                    {region}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="status" className="pb-3">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value: string) =>
                setFormData({
                  ...formData,
                  status: value as RemoteServer["status"],
                })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="online">Online</SelectItem>
                <SelectItem value="offline">Offline</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="description" className="pb-3">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Describe this server's purpose"
              rows={3}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            {server ? "Update Server" : "Add Server"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
