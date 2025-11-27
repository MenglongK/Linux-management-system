import { PermissionBadgeProps } from "@/types/permissionType";

export function PermissionBadge({ permission }: PermissionBadgeProps) {
  const colors: Record<string, string> = {
    read: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    write: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    execute: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  };

  return (
    <span className={`text-xs px-2 py-1 rounded-full font-medium ${colors[permission] || 'bg-gray-100 text-gray-800'}`}>
      {permission}
    </span>
  );
}
