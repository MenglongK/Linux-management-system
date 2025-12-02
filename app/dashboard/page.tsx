'use client';

import { useState, useEffect } from 'react';
import Loading from '../loading';


export default function DashboardPage() {
  const [groups, setGroups] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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
      }finally{
        setLoading(false)
      }
    };
    const fetchGroups = async()=>{
      try {
        const res = await fetch("/api/groups/get");
        if (!res.ok) {
          throw new Error(`Failed to fetch users: ${res.statusText}`);
        }
        
        const data = await res.json();
        console.log(data);
        setGroups(data.groups); // Set users to state
      } catch (error) {
        console.error("Error fetching groups:", error);
      }finally{
        setLoading(false)
      }
    }
    fetchUsers();
    fetchGroups()
  }, []);

  if (loading) {
    return <Loading/>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8">System Management Dashboard</h1>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">Total Groups</h3>
          <p className="text-3xl font-bold text-blue-600">{groups.length}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">Total Users</h3>
          <p className="text-3xl font-bold text-green-600">{users.length}</p>
        </div>

      {/* Groups Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Groups</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {groups.map(group => (
            <div key={group.id} className="border rounded-lg p-4">
              <h3 className="font-medium">{group.name}</h3>
              <p className="text-sm text-gray-600">{group.memberCount} members</p>
            </div>
          ))}
        </div>
      </div>

      {/* Users Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Users</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-2 text-left">Name</th>
              </tr>
            </thead>
            <tbody>
              {users.slice(0, 5).map(user => (
                <tr key={user.id} className="border-t">
                  <td className="px-4 py-2">{user.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">System Resources</h2>
          <div className="space-y-3">
            {resources.map(resource => (
              <div key={resource.id} className="flex justify-between items-center">
                <span>{resource.name}</span>
                <span className="font-medium">{resource.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Remote Servers</h2>
          <div className="space-y-3">
            {servers.map(server => (
              <div key={server.id} className="flex justify-between items-center">
                <div>
                  <span className="font-medium">{server.name}</span>
                  <span className="text-sm text-gray-600 ml-2">({server.ip})</span>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs ${server.status === 'Online'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                  }`}>
                  {server.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div> */}
    </div>
    </div>
  );
}