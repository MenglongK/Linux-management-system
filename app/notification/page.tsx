"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit2, Trash2, Smartphone, Mail } from "lucide-react";
import { mockNotifications } from "@/data/mockNotification";
import { Notification } from "@/types/notification";
import { NotificationModal } from "@/components/notification/Notification";

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('notifications');
      return saved ? JSON.parse(saved) : mockNotifications;
    }
    return mockNotifications;
  });

  // Save to localStorage whenever notifications change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('notifications', JSON.stringify(notifications));
    }
  }, [notifications]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingNotification, setEditingNotification] =
    useState<Notification | null>(null);

  const handleAddNotification = (notification: Omit<Notification, "id">) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
    };
    setNotifications([...notifications, newNotification]);
    setModalOpen(false);
  };

  const handleUpdateNotification = (notification: Notification) => {
    setNotifications(
      notifications.map((n) => (n.id === notification.id ? notification : n))
    );
    setEditingNotification(null);
    setModalOpen(false);
  };

  const handleDeleteNotification = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const handleToggleStatus = (id: string) => {
    setNotifications(
      notifications.map((n) =>
        n.id === id ? { ...n, isActive: !n.isActive } : n
      )
    );
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Notifications</h1>
            <p className="text-muted-foreground">
              Configure alerts and notification channels
            </p>
          </div>
          <Button
            onClick={() => {
              setEditingNotification(null);
              setModalOpen(true);
            }}
            className="gap-2"
          >
            <Plus size={20} />
            Add Notification
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Total Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{notifications.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Active</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {notifications.filter((n) => n.isActive).length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Telegram Channels
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {notifications.filter((n) => n.type === "telegram").length}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Alert Configuration</CardTitle>
            <CardDescription>
              Manage your notification rules and channels
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="flex items-start justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition"
                >
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{notification.name}</h3>
                      {notification.isActive ? (
                        <span className="text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 px-2 py-1 rounded">
                          Active
                        </span>
                      ) : (
                        <span className="text-xs bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200 px-2 py-1 rounded">
                          Inactive
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {notification.description}
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-sm">
                      <div className="flex items-center gap-1">
                        {notification.type === "telegram" ? (
                          <Smartphone size={16} className="text-blue-500" />
                        ) : (
                          <Mail size={16} className="text-gray-500" />
                        )}
                        <span className="capitalize">
                          {notification.type}: {notification.recipient || 'Default Chat'}
                        </span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Trigger: {notification.eventTrigger}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 ml-4">
                    <Button
                      variant={notification.isActive ? "outline" : "default"}
                      size="sm"
                      onClick={() =>
                        notification.id && handleToggleStatus(notification.id)
                      }
                    >
                      {notification.isActive ? "Disable" : "Enable"}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setEditingNotification(notification);
                        setModalOpen(true);
                      }}
                    >
                      <Edit2 size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        notification.id &&
                        handleDeleteNotification(notification.id)
                      }
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
          <CardHeader>
            <CardTitle className="text-blue-900 dark:text-blue-100">
              Telegram Integration
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-blue-800 dark:text-blue-200 space-y-2">
            <p>To enable Telegram notifications:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Create a Telegram bot using @BotFather</li>
              <li>Get your channel ID or group ID</li>
              <li>Add bot to your channel with admin permissions</li>
              <li>
                Enter the channel/group ID in the notification configuration
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <NotificationModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        notification={editingNotification}
        onSave={
          editingNotification ? handleUpdateNotification : handleAddNotification
        }
      />
    </>
  );
}
