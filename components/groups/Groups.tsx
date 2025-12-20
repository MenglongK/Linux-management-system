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
  mode,
  onSave,
}: GroupModalProps) {
  const [groups, setGroups] = useState("");
  const [newGroup, setNewGroup] = useState("");
  const [existingGroups, setExistingGroups] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetch("/api/groups/get", { method: "GET" })
      .then((res) => res.json())
      .then((data) => setExistingGroups(data.groups || []))
      .catch(() => setExistingGroups([]));
  }, []);

  // Prefill username when editing/deleting a known user
  useEffect(() => {
    if (groups && groups) {
      // setExistingGroups(groups.name);
    } else {
      setGroups("");
    }
    setNewGroup("");
  }, [groups, mode, open]);

  const close = () => {
    onOpenChange(false);
  };

  const handleCreate = async () => {
    const cleanGroup = groups.trim();

    if (!cleanGroup) {
      alert("Group Name are required.");
      return;
    }

    // if (existingGroups.includes(cleanGroup)) {
    //   alert("❌ Group already exists!");
    //   return;
    // }

    setLoading(true);
    try {
      const response = await fetch("/api/groups/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ groups: cleanGroup }),
      });

      const result = await response.json();
      alert(result.message);
      onSave?.(cleanGroup);
      close();
    } catch {
      alert("Failed to create group.");
    } finally {
      setLoading(false);
    }
  };
//     const handleDelete = async () => {
//   if (!group?.name) {
//     alert("No group selected.");
//     return;
//   }

//   if (!confirm(`Are you sure you want to delete group "${group.name}"?`)) {
//     return;
//   }

//   setLoading(true);

//   try {
//     const res = await fetch("/api/groups/delete", {
//       method: "DELETE",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ group: group.name }),
//     });

//     const result = await res.json();

//     if (!res.ok) {
//       alert(result.error || "Failed to delete group.");
//     } else {
//       alert(`Group "${group.name}" deleted successfully.`);
//       onSave?.(); // Refresh list
//       close();
//     }
//   } catch (e) {
//     alert("Error deleting group.");
//   } finally {
//     setLoading(false);
//   }
// };




  // const handlePermissionChange = async() => {

  //   };
  // };

  // const handleSubmit = async() => {

  // };

  return (
    <>
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
              <Label htmlFor="name" className="pb-3">
                Group Name
              </Label>
              <Input
                id="name"
                value={groups}
                onChange={(e) => setGroups(e.target.value)}
                placeholder="Enter group name"
              />
            </div>

            {/* <div>
              <Label htmlFor="memberCount" className="pb-3">
                Member Count
              </Label>
              <Input
                id="memberCount"
                type="number"
                value={groups}
                onChange={(e) => setGroups(e.target.value)}
                placeholder="0"
              />
            </div> */}

            <div>
              <Label className="pb-3">Permissions</Label>
              <div className="space-y-2 mt-2">
                {availablePermissions.map((permission) => (
                  <div key={permission} className="flex items-center gap-2">
                    <Checkbox
                      id={permission}
                      checked={permission.includes(permission)}
                      onCheckedChange={() => permission}
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
            <Button onClick={handleCreate}>
              {group ? "Update Group" : "Add Group"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
