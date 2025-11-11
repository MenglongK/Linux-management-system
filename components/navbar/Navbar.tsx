import { NavFootData } from "@/data/navData";
import Link from "next/link";

export default function Navbar() {
  return (
    <>
      <nav className="md:w-[300px] md:h-200 bg-[#0C2B4E]">
        <div>
        <div className="inset-y-0 left-0 md:w-[300px] bg-[#0C2B4E] shadow-2xl z-50 px-4">
          <div className="flex items-center justify-center h-20 bg-cordes-blue border-b-2 border-gray-300">
            <div className="flex items-center space-x-3">
              <span className="text-[#F7F7F7] text-xl font-bold">
                <i className="fa-solid fa-user-shield mr-3"></i>
                System Management
              </span>
            </div>
          </div>
        </div>
        <div className="md:w-[300px] bg-[#0C2B4E]">
          <div className="space-y-2 py-4 px-4">
            {NavFootData.map((items, index) => (
              <Link
                href={items.href}
                key={index}
                className="flex items-center px-4 py-3 text-[#F7F7F7] hover:bg-[#0b223c] focus-within:bg-[#0b223c] hover:text-white rounded-lg transition-colors group"
              >
                <i
                  className={`${items.class} mr-3 text-[#F7F7F7] group-hover:text-white`}
                ></i>
                {items.name}
              </Link>
            ))}
          </div>
        </div>
        <div className="bottom-4 left-4 right-4">
          <div className="bg-[#0C2B4E] p-4">
            <div className="flex items-center space-x-3 py-3 border-t-2 border-gray-300 justify-center">
              <div>
                <p className="text-white text-md font-medium text-center">John Admin</p>
                <p className="text-[#F7F7F7] text-sm text-center">Administrator</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      </nav>
    </>
  );
}
