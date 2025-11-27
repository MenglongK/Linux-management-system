"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [users, setUsers] = useState<any[]>([]); // Initialize as an empty array

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/users/get");
        if (!res.ok) {
          throw new Error(`Failed to fetch users: ${res.statusText}`);
        }

        const data = await res.json();
        console.log(data);
        setUsers(data.users); // Set users to state
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
    const i = setInterval(fetchUsers, 5000);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
        </div>
      </div>

      {/* Users Table */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>All Users</CardTitle>
            <CardDescription>Total: {users.length} users</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold">Name</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Map over users and display in table */}
                  {users.map((user, index) => (
                    <tr
                      key={index}
                      className="border-b border-border hover:bg-muted/50 transition"
                    >
                      <td className="py-3 px-4">{user.name}</td>
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
            <CardDescription>Total: {users.length} groups</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold">Name</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Map over users and display in table */}
                  {users.map((user, index) => (
                    <tr
                      key={index}
                      className="border-b border-border hover:bg-muted/50 transition"
                    >
                      <td className="py-3 px-4">{user.name}</td>
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
