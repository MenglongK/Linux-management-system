import { Group } from "@/types/groupType";

export const mockGroups: Group[] = [
  {
    id: "1",
    name: "Administrators",
    description: "System administrators with full access",
    memberCount: 3,
    permissions: ["read", "write", "execute"],
    createdAt: "2025-01-01",
  },
  {
    id: "2",
    name: "Developers",
    description: "Development team members",
    memberCount: 8,
    permissions: ["read", "write"],
    createdAt: "2025-01-05",
  },
  {
    id: "3",
    name: "Viewers",
    description: "Read-only access users",
    memberCount: 15,
    permissions: ["read"],
    createdAt: "2025-01-10",
  },
];
