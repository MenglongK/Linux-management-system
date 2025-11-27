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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { UserModalProps, Users } from "@/types/userType";

const availablePermissions = ["read", "write", "execute"];

export function UserModal({
  open,
  onOpenChange,
  user,
  onSave,
}: UserModalProps) {
  const [formData, setFormData] = useState<Users>({
    name: "",
    email: "",
    role: "user",
    permissions: [],
    status: "active",
  });
  useEffect(() => {
    // Defer the state update to avoid calling setState synchronously within the effect
    Promise.resolve().then(() => {
      if (user) {
        setFormData(user);
      } else {
        setFormData({
          name: "",
          email: "",
          role: "user",
          permissions: [],
          status: "active",
        });
      }
    });
  }, [user, open]);
  const handlePermissionChange = (permission: string) => {
    setFormData({
      ...formData,
      permissions: formData.permissions.includes(permission)
        ? formData.permissions.filter((p) => p !== permission)
        : [...formData.permissions, permission],
    });
  };

  // handle user submit & validation
  const handleSubmit = async () => {
    const newUser = {
      username: formData.name.toLowerCase().trim(),
      password: formData.email.trim(),
      permission: formData.permissions,
    };
    // Step 1: Validate if the username exists in the existing users
    try {
      const response = await fetch("/api/users"); // Fetch current users
      const usersData = await response.json();

      // Check if the username already exists in the existing data
      const userExists = usersData.some(
        (user: { username: string }) => user.username === newUser.username
      );

      if (userExists) {
        alert("Username already exists!");
        return; // Stop the form submission if username exists
      }

      onSave(formData);
      // Step 2: Proceed with submitting the new user data
      const saveResponse = await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify(newUser),
      });

      const saveResult = await saveResponse.json();
      if (saveResponse.ok) {
        alert("User created successfully!");
      } else {
        alert(saveResult.error || "Error occurred while saving user.");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      alert("An error occurred while checking username.");
    }
  };
  // onSave(formData);
  // await fetch("/api/save-data/users", {
  //   method: "POST",
  //   body: JSON.stringify(newUser),
  // });
  // alert("Create successfully")

  // const handleSave = async () => {
  // const newUser = {
  //   username: formData.name,
  //   password: formData.email,
  //   role: formData.role,
  // };
  // console.log(newUser)
  // await fetch("/api/save-data/users", {
  //   method: "POST",
  //   body: JSON.stringify(newUser),
  // });

  // alert("Saved to JSON!");}

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{user ? "Edit User" : "Add New User"}</DialogTitle>
          <DialogDescription>
            {user
              ? "Update user information and permissions"
              : "Create a new user account"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="name" className="pb-3">
              Name
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Enter user name"
            />
          </div>
          <div>
            <Label htmlFor="email" className="pb-3">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="user@example.com"
            />
          </div>

          <div>
            <Label htmlFor="role" className="pb-3">
              Role
            </Label>
            <Select
              value={formData.role}
              onValueChange={(value: "admin" | "user" | "viewer") =>
                setFormData({ ...formData, role: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="viewer">Viewer</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="pb-3">Permissions</Label>
            <div className="space-y-2 mt-2">
              {availablePermissions.map((permission) => (
                <div key={permission} className="flex items-center gap-2">
                  <Checkbox
                    id={permission}
                    checked={formData.permissions.includes(permission)}
                    onCheckedChange={() => handlePermissionChange(permission)}
                  />
                  <Label
                    htmlFor={permission}
                    className="capitalize cursor-pointer"
                  >
                    {permission}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="status" className="pb-3">
              Status
            </Label>
            <Select
              value={formData.status}
              onValueChange={(value: "active" | "inactive") =>
                setFormData({ ...formData, status: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            {user ? "Update User" : "Add User"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
