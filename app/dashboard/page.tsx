import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PermissionBadge } from "@/components/users/Permission-badge";
import { mockGroups } from "@/data/mockGroups";
import { mockUsers } from "@/data/mockUsers";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 ">
        <Card>
          <CardHeader>
            <CardTitle>All Users</CardTitle>
            <CardDescription>Total: 3 users</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold">Name</th>
                    <th className="text-left py-3 px-4 font-semibold">
                      Permissions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {mockUsers.map((user) => (
                    <tr
                      key={user.id}
                      className="border-b border-border hover:bg-muted/50 transition"
                    >
                      <td className="py-3 px-4">{user.name}</td>
                      <td className="py-3 px-4">
                        <div className="flex flex-wrap gap-1">
                          {user.permissions.slice(0, 3).map((perm) => (
                            <PermissionBadge key={perm} permission={perm} />
                          ))}
                          {user.permissions.length > 3 && (
                            <span className="text-xs text-muted-foreground">
                              +{user.permissions.length - 3}
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>All Groups</CardTitle>
            <CardDescription>Total: 3 Groups</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold">Name</th>
                    <th className="text-left py-3 px-4 font-semibold">
                      Permissions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {mockGroups.map((group) => (
                    <tr
                      key={group.id}
                      className="border-b border-border hover:bg-muted/50 transition"
                    >
                      <td className="py-3 px-4">{group.name}</td>
                      <td className="py-3 px-4">
                        <div className="flex flex-wrap gap-1">
                          {group.permissions.slice(0, 3).map((perm) => (
                            <PermissionBadge key={perm} permission={perm} />
                          ))}
                          {group.permissions.length > 3 && (
                            <span className="text-xs text-muted-foreground">
                              +{group.permissions.length - 3}
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
