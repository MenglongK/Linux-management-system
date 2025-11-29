"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit2, Trash2, Users } from "lucide-react";
import { GroupModal } from "@/components/groups/Groups";
import { mockGroups } from "@/data/mockGroups";
import { Group } from "@/types/groupType";
import { mockNotifications } from "@/data/mockNotification";
import { NOTIFICATION_EVENTS } from "@/lib/notification";

export default function Groups() {
  const [groups, setGroups] = useState<Group[]>(mockGroups);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingGroup, setEditingGroup] = useState<Group | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Get current notifications from localStorage or fallback to mock
  const getCurrentNotifications = () => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('notifications');
      return saved ? JSON.parse(saved) : mockNotifications;
    }
    return mockNotifications;
  };

  const handleAddGroup = async (group: Omit<Group, "id" | "createdAt">) => {
    try {
      const res = await fetch("/api/groups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: group.name, memberCount: group.memberCount }),
      });
      if (!res.ok) {
        throw new Error("Group creation failed. Please try again.");
      }
      const data = await res.json();
      alert(data.message || "Group added successfully");
      setError(null); // Clear any previous error

      // Add group to state after successful creation
      const newGroup: Group = {
        ...group,
        id: Date.now().toString(),
        createdAt: new Date().toISOString().split("T")[0],
      };
      setGroups([...groups, newGroup]);

      // Trigger notifications for group added event
      try {
        await fetch("/api/notifications/trigger", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            eventTrigger: NOTIFICATION_EVENTS.GROUP_ADDED,
            message: `New group "${group.name}" created with ${group.memberCount} members`,
            notifications: getCurrentNotifications(),
          }),
        });
      } catch (notificationError) {
        console.error("Failed to trigger notifications:", notificationError);
      }
    } catch (error) {
      setError((error as Error).message || "An error occurred during group creation.");
    } finally {
      setModalOpen(false);
    }
  };

  const handleUpdateGroup = async (group: Group) => {
    setGroups(groups.map((g) => (g.id === group.id ? group : g)));
    setEditingGroup(null);
    setModalOpen(false);

    // Trigger notifications for group updated event
    try {
      await fetch("/api/notifications/trigger", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventTrigger: NOTIFICATION_EVENTS.GROUP_UPDATED,
          message: `Group "${group.name}" has been updated`,
          notifications: getCurrentNotifications(),
        }),
      });
    } catch (notificationError) {
      console.error("Failed to trigger notifications:", notificationError);
    }
  };

  const handleDeleteGroup = async (id: string) => {
    const groupToDelete = groups.find((g) => g.id === id);
    setGroups(groups.filter((g) => g.id !== id));

    // Trigger notifications for group deleted event
    if (groupToDelete) {
      try {
        await fetch("/api/notifications/trigger", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            eventTrigger: NOTIFICATION_EVENTS.GROUP_DELETED,
            message: `Group "${groupToDelete.name}" has been deleted`,
            notifications: getCurrentNotifications(),
          }),
        });
      } catch (notificationError) {
        console.error("Failed to trigger notifications:", notificationError);
      }
    }
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Groups Management</h1>
            <p className="text-muted-foreground">
              Organize users and manage group permissions
            </p>
          </div>
          <Button
            onClick={() => {
              setEditingGroup(null);
              setModalOpen(true);
            }}
            className="gap-2"
          >
            <Plus size={20} />
            Add Group
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {groups.map((group) => (
            <Card key={group.id} className="hover:shadow-lg transition">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle>{group.name}</CardTitle>
                    <CardDescription>{group.description}</CardDescription>
                  </div>
                  <Users size={20} className="text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Members</p>
                    <p className="text-2xl font-bold">{group.memberCount}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Created</p>
                    <p className="text-sm font-semibold">{group.createdAt}</p>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground mb-2">
                    Permissions
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {group.permissions.map((perm) => (
                      <span
                        key={perm}
                        className="text-xs bg-primary/10 text-primary px-2 py-1 rounded"
                      >
                        {perm}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => {
                      setEditingGroup(group);
                      setModalOpen(true);
                    }}
                  >
                    <Edit2 size={16} className="mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 text-destructive hover:text-destructive"
                    onClick={() => group.id && handleDeleteGroup(group.id)}
                  >
                    <Trash2 size={16} className="mr-1" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <GroupModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        group={editingGroup}
        onSave={(groups: Group | Omit<Group, "id">) =>
          editingGroup
            ? handleUpdateGroup(groups as Group)
            : handleAddGroup(groups as Omit<Group, "id">)
        }
      />
    </>
  );
}
