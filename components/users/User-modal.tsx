"use client";

import { useEffect, useState } from "react";
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

// You can also move this type into "@/types/userType"
export type UserModalMode = "create" | "edit" | "delete";

export interface UserModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: any | null;          // you can replace `any` with your User type
  mode: UserModalMode;
  onSave?: () => void;       // parent will refresh list after any action
}

export function UserModal({
  open,
  onOpenChange,
  user,
  mode,
  onSave,
}: UserModalProps) {
  const [username, setUsername] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [existingUsers, setExistingUsers] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Load existing Linux usernames for validation
  useEffect(() => {
    fetch("/api/users/create", { method: "GET" })
      .then((res) => res.json())
      .then((data) => setExistingUsers(data.users || []))
      .catch(() => setExistingUsers([]));
  }, []);

  // Prefill username when editing/deleting a known user
  useEffect(() => {
    if (user && user.name) {
      setUsername(user.name);
    } else {
      setUsername("");
    }
    setNewUsername("");
  }, [user, mode, open]);

  const close = () => {
    onOpenChange(false);
  };

  const handleCreate = async () => {
    const cleanUsername = username.trim();

    if (!cleanUsername) {
      alert("Username and password are required.");
      return;
    }

    if (existingUsers.includes(cleanUsername)) {
      alert("❌ User already exists!");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/users/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: cleanUsername }),
      });

      const result = await response.json();
      alert(result.message);
      onSave?.();
      close();
    } catch {
      alert("Failed to create user.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    const cleanUsername = username.trim();
    const cleanNewUsername = newUsername.trim();

    if (!cleanUsername || !cleanNewUsername) {
      alert("Old and new username are required.");
      return;
    }

    if (!existingUsers.includes(cleanUsername)) {
      alert("❌ Username not found!");
      return;
    }

    const confirmEdit = confirm(
      `Edit user "${cleanUsername}" to "${cleanNewUsername}"?`
    );
    if (!confirmEdit) return;

    setLoading(true);
    try {
      const res = await fetch("/api/users/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: cleanUsername, newUsername: cleanNewUsername }),
      });

      const result = await res.json();
      alert(result.message);
      onSave?.();
      close();
    } catch {
      alert("Failed to update user.");
    } finally {
      setLoading(false);
    }
  };

const handleDelete = async () => {
  setSuccessMsg(null);
  setErrorMsg(null);

  const cleanUsername = username.trim();
  if (!cleanUsername) {
    setErrorMsg("Username is required.");
    return;
  }

  if (!existingUsers.includes(cleanUsername)) {
    setErrorMsg("❌ Username not found!");
    return;
  }

  const confirmed = window.confirm(
    `Are you sure you want to delete user "${cleanUsername}"? This cannot be undone.`
  );
  if (!confirmed) {
    return;
  }

  setLoading(true);
  try {
    const res = await fetch("/api/users/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: cleanUsername }),
    });

    const data = await res.json();

    console.log("DELETE RESPONSE:", res.status, data); // 👈 add this

    if (!res.ok) {
      setErrorMsg(data.message || "Failed to delete user.");
    } else {
      setSuccessMsg(data.message || "User deleted successfully.");
      setUsername("");
      onSave?.();
      close();
    }
  } catch (err) {
    console.error("DELETE FETCH ERROR:", err); // 👈 add this
    setErrorMsg("Something went wrong, please try again.");
  } finally {
    setLoading(false);
  }
};



  const title =
    mode === "create"
      ? "Add New User"
      : mode === "edit"
      ? "Edit User"
      : "Delete User";

  const description =
    mode === "create"
      ? "Create a new user account"
      : mode === "edit"
      ? "Update user information"
      : "Delete a user account from the Linux system. This cannot be undone.";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* CREATE */}
          {mode === "create" && (
            <>
              <div>
                <Label htmlFor="create-username" className="pb-3">
                  Username
                </Label>
                <Input
                  id="create-username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                />
              </div>
            </>
          )}

          {/* EDIT */}
          {mode === "edit" && (
            <>
              <div>
                <Label htmlFor="old-username" className="pb-3">
                  Old Name
                </Label>
                <Input
                  id="old-username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter current username"
                />
              </div>
              <div>
                <Label htmlFor="new-username" className="pb-3">
                  New Name
                </Label>
                <Input
                  id="new-username"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  placeholder="Enter new username"
                />
              </div>
            </>
          )}

          {/* DELETE */}
          {mode === "delete" && (
            <>
              <div>
                <Label htmlFor="delete-username" className="pb-3">
                  Username to delete
                </Label>
                <Input
                  id="delete-username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username to delete"
                />
              </div>
              <p className="text-sm text-red-500">
                ⚠ This will remove the user from the Linux system. Double-check
                the username before deleting.
              </p>
            </>
          )}
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={close}
            disabled={loading}
          >
            Cancel
          </Button>

          {mode === "create" && (
            <Button onClick={handleCreate} disabled={loading}>
              {loading ? "Creating..." : "Add User"}
            </Button>
          )}

          {mode === "edit" && (
            <Button onClick={handleUpdate} disabled={loading}>
              {loading ? "Updating..." : "Update User"}
            </Button>
          )}

          {mode === "delete" && (
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={loading}
            >
              {loading ? "Deleting..." : "Delete User"}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
