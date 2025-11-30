'use client';

import { useState, useEffect } from 'react';

interface Group {
  id: number;
  name: string;
  memberCount: number;
}

interface User {
  id: number;
  name: string;
  email: string;
  status: string;
}

interface Resource {
  id: number;
  name: string;
  value: string;
}

interface Server {
  id: number;
  name: string;
  status: string;
  ip: string;
}

export default function DashboardPage() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const [servers, setServers] = useState<Server[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        // ទាញយកទិន្នន័យពី APIs ផ្សេងៗក្នុងពេលតែមួយ
        const [groupsRes, usersRes, resourcesRes, serversRes] = await Promise.all([
          fetch('/api/groups'),
          fetch('/api/users'),
          fetch('/api/resources'),
          fetch('/api/remote-servers')
        ]);

        const groupsData = await groupsRes.json();
        const usersData = await usersRes.json();
        const resourcesData = await resourcesRes.json();
        const serversData = await serversRes.json();

        setGroups(groupsData);
        setUsers(usersData);
        setResources(resourcesData);
        setServers(serversData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading dashboard data...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8">System Dashboard</h1>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">Total Groups</h3>
          <p className="text-3xl font-bold text-blue-600">{groups.length}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">Total Users</h3>
          <p className="text-3xl font-bold text-green-600">{users.length}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">Active Servers</h3>
          <p className="text-3xl font-bold text-purple-600">
            {servers.filter(server => server.status === 'Online').length}
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">Resources</h3>
          <p className="text-3xl font-bold text-orange-600">{resources.length}</p>
        </div>
      </div>

      {/* Groups Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Groups</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
        <h2 className="text-xl font-semibold mb-4">Recent Users</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {users.slice(0, 5).map(user => (
                <tr key={user.id} className="border-t">
                  <td className="px-4 py-2">{user.name}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">
                    <span className={`px-2 py-1 rounded-full text-xs ${user.status === 'Active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                      }`}>
                      {user.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Resources & Servers in two columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Resources */}
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

        {/* Servers */}
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
      </div>
    </div>
  );
}