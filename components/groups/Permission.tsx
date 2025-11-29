import { PermissionType } from "@/types/permissionType";

export function Permission({ permission }: PermissionType) {
  const colors: Record<string, string> = {
    read: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    write: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    delete: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    manage_users:
      "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
    manage_groups:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  };

  return (
    <span
      className={`text-xs px-2 py-1 rounded-full font-medium ${
        colors[permission] || "bg-gray-100 text-gray-800"
      }`}
    >
      {permission}
    </span>
  );
}
