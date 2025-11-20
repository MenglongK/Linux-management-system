export interface Notification {
  id?: string;
  name: string;
  description: string;
  type: "telegram" | "email";
  recipient: string;
  eventTrigger: string;
  isActive: boolean;
}

export interface NotificationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  notification: Notification | null;
  onSave: (notification: Notification) => void;
}