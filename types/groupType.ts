export interface Group {
  id?: string;
  name: string;
  description: string;
  memberCount: number;
  permissions: string[];
  createdAt?: string;
}

export interface GroupModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  group: Group | null;
  onSave: (group: Group | Omit<Group, "id">) => void
}