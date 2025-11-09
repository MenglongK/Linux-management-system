import { NavFootData } from "@/data/navData";

export default function Navbar() {
  return (
    <>
      <div className="bg-[#0C2B4E] md:w-64">
        <div className="inset-y-0 left-0 md:w-64 bg-[#1e40af] shadow-xl z-50">
          <div className="flex items-center justify-center h-16 bg-cordes-blue">
            <div className="flex items-center space-x-3">
              <span className="text-white text-xl font-bold">
                System Management
              </span>
            </div>
          </div>
        </div>
        <nav className="md:w-64 bg-[#0C2B4E]">
          <div className="space-y-2 py-4 px-4">
            {NavFootData.map((items, index) => (
              <a
                key={index}
                href="#"
                className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-colors group"
              >
                <i className="fas fa-home mr-3 text-cordes-accent group-hover:text-white"></i>
                {items.name}
              </a>
            ))}
          </div>
        </nav>
        <div className="bottom-4 left-4 right-4">
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              {/* <img src="https://cdn-icons-png.flaticon.com/512/17003/17003310.png" alt="Admin" className="w-10 h-10 rounded-full"> */}
              <div>
                <p className="text-white text-sm font-medium">John Admin</p>
                <p className="text-gray-400 text-xs">Administrator</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
