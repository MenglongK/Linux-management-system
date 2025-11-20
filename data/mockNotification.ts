import { Notification } from "@/types/notification";

export const mockNotifications: Notification[] = [
  {
    id: '1',
    name: 'High CPU Alert',
    description: 'Alert when CPU usage exceeds 80%',
    type: 'telegram',
    recipient: '@admin_channel',
    eventTrigger: 'cpu_usage > 80%',
    isActive: true,
  },
  {
    id: '2',
    name: 'Disk Space Warning',
    description: 'Alert when disk space is low',
    type: 'telegram',
    recipient: '@system_alerts',
    eventTrigger: 'disk_usage > 90%',
    isActive: true,
  },
  {
    id: '3',
    name: 'Server Down Alert',
    description: 'Alert when server goes offline',
    type: 'email',
    recipient: 'admin@system.com',
    eventTrigger: 'server_offline',
    isActive: false,
  },
];