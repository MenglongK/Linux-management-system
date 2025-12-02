"use client";

import { useEffect, useState } from "react";
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
// import { mockGroups } from "@/data/mockGroups";
import { Group } from "@/types/groupType";
import { UserModalMode } from "@/types/userType";

export default function Groups() {
  // const [groups, setGroups] = useState<Group[]>(mockGroups);
  // const [modalOpen, setModalOpen] = useState(false);
  // const [editingGroup, setEditingGroup] = useState<Group | null>(null);
    const [groups, setGroups] = useState<any[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<UserModalMode>("create");
    const [selectedGroup, setSelectedGroup] = useState<any | null>(null);
    const fetchGroups = async () => {
        try {
          const res = await fetch("/api/groups/get");
          if (!res.ok) {
            throw new Error(`Failed to fetch users: ${res.statusText}`);
          }
    
          const data = await res.json();
          // console.log(data);
          setGroups(data.groups || []);
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      };
    
      useEffect(() => {
        fetchGroups()
      }, []);

  const handleAddGroup = () => {
    setSelectedGroup(null)
    setModalMode("create")
    setModalOpen(true)
  };

  const handleUpdateGroup = () => {
    setSelectedGroup(null)
    setModalMode("edit")
    setModalOpen(true)
  };

  const handleDeleteGroup = () => {
    setSelectedGroup(null)
    setModalMode("delete")
    setModalOpen(true)
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
              setSelectedGroup(null);
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
                      setSelectedGroup(group);
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
                    onClick={() => group.name}
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
        group={selectedGroup}
        mode={modalMode}
        onSave={fetchGroups}
      />
    </>
  );
}
