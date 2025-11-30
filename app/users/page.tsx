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
import { Trash2, Edit, PlusSquare } from "lucide-react";
import { UserModal, UserModalMode } from "@/components/users/User-modal";
import { User } from "@/types/userType";

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<UserModalMode>("create");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Fetch users from API
  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/users/get");
      if (!res.ok) throw new Error(`Failed to fetch users: ${res.statusText}`);

      const data: { users: User[] } = await res.json();
      setUsers(data.users || []);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Modal handlers
  const openCreateModal = () => {
    setSelectedUser(null);
    setModalMode("create");
    setModalOpen(true);
  };

  const openEditModal = (user?: User) => {
    setSelectedUser(user ?? null);
    setModalMode("edit");
    setModalOpen(true);
  };

  const openDeleteModal = (user?: User) => {
    setSelectedUser(user ?? null);
    setModalMode("delete");
    setModalOpen(true);
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Users Management</h1>
            <p className="text-muted-foreground">Manage user accounts</p>
          </div>
        </div>

        <Card>
          <CardHeader className="flex justify-between">
            <div>
              <CardTitle>All Users</CardTitle>
              <CardDescription>Total: {users.length} users</CardDescription>
            </div>
            <div className="flex gap-3">
              <Button onClick={openCreateModal}>
                <PlusSquare size={15} />
              </Button>

              <Button variant="ghost" size="sm" onClick={() => openEditModal()}>
                <Edit size={20} />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => openDeleteModal()}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 size={20} className="text-red-600" />
              </Button>
            </div>
          </CardHeader>

          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold">Name</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr
                      key={user.id}
                      className="border-b border-border hover:bg-muted/50 transition"
                    >
                      <td className="py-3 px-4">{user.name ?? "Unknown"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      <UserModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        user={selectedUser}
        mode={modalMode}
        onSave={fetchUsers}
      />
    </>
  );
}
