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
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAddUser = async (user: Omit<User, "id">) => {
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email }),
      });
      if (!res.ok) {
        throw new Error("Registration failed. Please try again.");
      }
      const data = await res.json();
      alert(data.message || "Registration Success");
      // Add user to state after successful registration
      const newUser: User = { ...user, id: Date.now().toString() };
      setUsers([...users, newUser]);
    } catch (error) {
      setError((error as Error).message || "An error occurred during registration.");
    } finally {
      setModalOpen(false);
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
                        <span
                          className={`text-sm font-medium ${user.status === "active"
                            ? "text-green-600 dark:text-green-400"
                            : "text-red-600 dark:text-red-400"
                            }`}
                        >
                          {user.status === "active" ? "✓ Active" : "✗ Inactive"}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex flex-wrap gap-1">
                          {user.permissions.slice(0, 3).map((perm) => (
                            <PermissionBadge key={perm} permission={perm} />
                          ))}
                          {user.permissions.length > 3 && (
                            <span className="text-xs text-muted-foreground">
                              +{user.permissions.length - 3}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4 space-x-2 flex items-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setEditingUser(user);
                            setModalOpen(true);
                          }}
                        >
                          <Edit2 size={16} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleToggleStatus(user.id)}
                        >
                          {user.status === "active" ? (
                            <Lock size={16} />
                          ) : (
                            <UnlockOpen size={16} />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteUser(user.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 size={16} />
                        </Button>
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
