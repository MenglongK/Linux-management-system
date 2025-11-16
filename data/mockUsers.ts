import { User } from "@/types/userType";

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Admin',
    email: 'john@system.com',
    role: 'admin',
    permissions: ['read', 'write', 'delete', 'manage_users'],
    status: 'active',
  },
  {
    id: '2',
    name: 'Jane User',
    email: 'jane@system.com',
    role: 'user',
    permissions: ['read', 'write'],
    status: 'active',
  },
  {
    id: '3',
    name: 'Bob Viewer',
    email: 'bob@system.com',
    role: 'viewer',
    permissions: ['read'],
    status: 'inactive',
  },
];