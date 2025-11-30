import ConnectionCard from '@/components/connectioncard/ConnectionCard';

const connectionsData = [
  { name: 'WAZUH-SERVER', ip: '172.18.0.0', user: 'admin' },
  { name: 'HOME-ADDR', ip: '127.0.0.1', user: 'user' },
  { name: 'DEV-ENV-NIRO', ip: '172.24.68.211', user: 'me' },
];

const ConnectionsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-green-500 text-white p-4 h-16 flex items-center shadow-lg">
        <h2 className="text-2xl font-semibold uppercase tracking-wider">
          CONNECTIONS
        </h2>
      </header>

      <main className="p-8">
        <div className="flex flex-wrap gap-6 justify-start">
          {connectionsData.map((conn, index) => (
            <ConnectionCard
              key={index}
              name={conn.name}
              ip={conn.ip}
              user={conn.user}
            />
          ))}
        </div>
      </main>
      
      
    </div>
  );
};

export default ConnectionsPage;