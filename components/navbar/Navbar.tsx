import { NavFootData } from "@/data/navData";
import Image from "next/image";

export default function Navbar() {
  return (
    <>
      <div className="bg-[#0b223c] md:w-80 position-static">
        <div className="inset-y-0 left-0 md:w-80 bg-[#0b223c] shadow-2xl z-50">
          <div className="flex items-center justify-center h-20 bg-cordes-blue">
            <div className="flex items-center space-x-3">
              <span className="text-[#F7F7F7] text-xl font-bold">
                <i className="fa-solid fa-people-roof mr-3"></i>
                System Management
              </span>
            </div>
          </div>
        </div>
        <nav className="md:w-80 bg-[#0C2B4E]">
          <div className="space-y-2 py-4 px-4">
            {NavFootData.map((items, index) => (
              <a
                key={index}
                href="#"
                className="flex items-center px-4 py-3 text-[#F7F7F7] hover:bg-[#0b223c] focus-within:bg-[#0b223c] hover:text-white rounded-lg transition-colors group"
              >
                <i className={`${items.class} mr-3 text-[#F7F7F7] group-hover:text-white`}></i>
                {items.name}
              </a>
            ))}
          </div>
        </nav>
        <div className="bottom-4 left-4 right-4">
          <div className="bg-[#0b223c] p-4">
            <div className="flex items-center space-x-3">
              <Image src="/images/image.png" width={50} height={50} alt="Avartar Profile" />
              <div>
                <p className="text-white text-sm font-medium">John Admin</p>
                <p className="text-[#F7F7F7] text-xs">Administrator</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
