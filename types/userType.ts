export type User = {
  id: string;
  name: string;
  password: string;
};
export interface Users {
  id?: string;
  name: string;
  password: string;
}

export type UserModalMode = "create" | "edit" | "delete";

export interface UserModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user?: { username: string }; // adjust to your real user type
  onSave?: (result: any) => void;
  mode: UserModalMode;
}
