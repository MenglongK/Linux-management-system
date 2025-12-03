export interface Group {
  id?: string;
  name: string;
  description: string;
  memberCount: number;
  permissions: string[];
  createdAt?: string;
}
export type GroupModalMode = "create" | "edit" | "delete";
export interface GroupModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  group?: { username: string };
  mode: GroupModalMode
  onSave?: (result: any) => void;
}