type ConnectionProps = {
  name: string;
  ip: string;
  user: string;
};

const ConnectionCard = ({ name, ip, user }: ConnectionProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-72 h-48 border border-gray-200">
      <div className="flex items-center mb-4">
        <div className="mr-3 text-3xl">🐧</div> 
        <h3 className="text-lg font-semibold text-gray-800 bg-gray-100 px-3 py-1 rounded-full">{name}</h3>
      </div>

      <div className="space-y-1 text-sm text-gray-700">
        <p><strong>IP Address:</strong> <span className="text-base text-gray-900">{ip}</span></p>
        <p><strong>User Name:</strong> <span className="text-base text-gray-900">{user}</span></p>
      </div>

      <div className="mt-6 flex space-x-4">
        <button className="flex items-center px-4 py-2 text-sm text-white bg-red-600 hover:bg-red-700 rounded transition duration-150 shadow-md">
          Remove <span className="ml-2">🗑️</span>
        </button>
        <button className="flex items-center px-4 py-2 text-sm text-white bg-black hover:bg-gray-800 rounded transition duration-150 shadow-md">
          Terminal <span className="ml-2">📟</span>
        </button>
      </div>
    </div>
  );
};

export default ConnectionCard;