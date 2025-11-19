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
import { Switch } from "@/components/ui/switch";
import { NotificationModalProps, Notification } from "@/types/notification";

const eventTriggers = [
  "cpu_usage > 80%",
  "cpu_usage > 90%",
  "disk_usage > 80%",
  "disk_usage > 90%",
  "ram_usage > 85%",
  "server_offline",
  "user_login",
  "user_logout",
];

export function NotificationModal({
  open,
  onOpenChange,
  notification,
  onSave,
}: NotificationModalProps) {
  const [formData, setFormData] = useState<Notification>({
    name: "",
    description: "",
    type: "telegram",
    recipient: "",
    eventTrigger: "",
    isActive: true,
  });

  useEffect(() => {
    Promise.resolve().then(() => {
      if (notification) {
        setFormData(notification);
      } else {
        setFormData({
          name: "",
          description: "",
          type: "telegram",
          recipient: "",
          eventTrigger: "",
          isActive: true,
        });
      }
    });
  }, [notification, open]);

  const handleSubmit = () => {
    onSave(formData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {notification ? "Edit Notification" : "Add New Notification"}
          </DialogTitle>
          <DialogDescription>
            {notification
              ? "Update your alert configuration"
              : "Create a new alert notification"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="name" className="pb-3">Alert Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="e.g., High CPU Alert"
            />
          </div>

          <div>
            <Label htmlFor="description" className="pb-3">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Describe what this alert is for"
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="type" className="pb-3">Notification Type</Label>
            <Select
              value={formData.type}
              onValueChange={(value: string) =>
                setFormData({
                  ...formData,
                  type: value as Notification["type"],
                })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="telegram">Telegram</SelectItem>
                <SelectItem value="email">Email</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="recipient" className="pb-3">
              {formData.type === "telegram"
                ? "Telegram Channel/Group ID"
                : "Email Address"}
            </Label>
            <Input
              id="recipient"
              value={formData.recipient}
              onChange={(e) =>
                setFormData({ ...formData, recipient: e.target.value })
              }
              placeholder={
                formData.type === "telegram"
                  ? "@channel_name or -123456789"
                  : "email@example.com"
              }
            />
          </div>

          <div>
            <Label htmlFor="trigger" className="pb-3">Event Trigger</Label>
            <Select
              value={formData.eventTrigger}
              onValueChange={(value) =>
                setFormData({ ...formData, eventTrigger: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {eventTriggers.map((trigger) => (
                  <SelectItem key={trigger} value={trigger}>
                    {trigger}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <Switch
              checked={formData.isActive}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, isActive: checked })
              }
            />
            <Label >Enable this notification</Label>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            {notification ? "Update Notification" : "Add Notification"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
