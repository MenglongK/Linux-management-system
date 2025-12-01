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

export default function Users() {
  const [users, setUsers] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<UserModalMode>("create");
  const [selectedUser, setSelectedUser] = useState<any | null>(null);

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/users/get");
      if (!res.ok) {
        throw new Error(`Failed to fetch users: ${res.statusText}`);
      }

      const data = await res.json();
      console.log(data);
      setUsers(data.users || []);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const openCreateModal = () => {
    setSelectedUser(null);
    setModalMode("create");
    setModalOpen(true);
  };

  const openEditModal = () => {
    // No row selection yet, so just open empty and let user type
    setSelectedUser(null);
    setModalMode("edit");
    setModalOpen(true);
  };

  const openDeleteModal = () => {
    // Delete is by username input, no need to pre-select
    setSelectedUser(null);
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
              {/* Add */}
              <Button onClick={openCreateModal}>
                <PlusSquare size={15} />
              </Button>

              {/* Edit (general, by typing username) */}
              <Button
                variant="ghost"
                size="sm"
                onClick={openEditModal}
              >
                <Edit size={20} />
              </Button>

              {/* Delete with confirmation inside modal */}
              <Button
                variant="ghost"
                size="sm"
                onClick={openDeleteModal}
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
                  {users.map((user, index) => (
                    <tr
                      key={user.id ?? index}
                      className="border-b border-border hover:bg-muted/50 transition"
                    >
                      <td className="py-3 px-4">
                        {user.name ?? user.username ?? String(user)}
                      </td>
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
        onSave={fetchUsers} // refresh list after create/update/delete
      />
    </>
  );
}