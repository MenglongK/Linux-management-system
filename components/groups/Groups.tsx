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
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Group, GroupModalProps } from "@/types/groupType";
import { availablePermissions } from "@/data/availablePermission";

export function GroupModal({
  open,
  onOpenChange,
  group,
  onSave,
}: GroupModalProps) {
  const [formData, setFormData] = useState<Group>({
    name: "",
    description: "",
    memberCount: 0,
    permissions: [],
  });
  useEffect(() => {
    Promise.resolve().then(() => {
      if (group) {
        setFormData(group);
      } else {
        setFormData({
          name: "",
          description: "",
          memberCount: 0,
          permissions: [],
        });
      }
    });
  }, [group, open]);

  const handlePermissionChange = (permission: string) => {
    setFormData({
      ...formData,
      permissions: formData.permissions.includes(permission)
        ? formData.permissions.filter((p) => p !== permission)
        : [...formData.permissions, permission],
    });
  };

  const handleSubmit = () => {
    onSave(formData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{group ? "Edit Group" : "Add New Group"}</DialogTitle>
          <DialogDescription>
            {group
              ? "Update group information and permissions"
              : "Create a new user group"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="name" className="pb-3">Group Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Enter group name"
            />
          </div>

          <div>
            <Label htmlFor="description" className="pb-3">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Describe the purpose of this group"
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="memberCount" className="pb-3">Member Count</Label>
            <Input
              id="memberCount"
              type="number"
              value={formData.memberCount}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  memberCount: parseInt(e.target.value) || 0,
                })
              }
              placeholder="0"
            />
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
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            {group ? "Update Group" : "Add Group"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
