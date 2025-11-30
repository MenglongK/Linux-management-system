export type User = {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'viewer';
  permissions: string[];
  status: 'active' | 'inactive';
};
export interface Users {
  id?: string;
  name: string;
  email: string;
  role: "admin" | "user" | "viewer";
  permissions: string[];
  status: "active" | "inactive";
}

export interface UserModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: User | null;
  onSave: (user: User | Omit<User, "id">) => void
}