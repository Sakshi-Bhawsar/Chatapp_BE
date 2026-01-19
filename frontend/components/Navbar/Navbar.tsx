import userStore from "@/store/auth";
import Image from "next/image";
import { useState } from "react";

const Navbar = () => {
    const { user } = userStore()
    const [show, setShow] = useState(false);

    const handleShow = () => {
        setShow(!show);
    }

    return (
         <div className="relative w-full h-16  bg-linear-to-r from-indigo-50 to-indigo-600 flex items-center px-6">
      
      {/* Search Bar */}
      <div className="flex-1">
        <input
          type="text"
          placeholder="Search contact, messages or options here..."
          className="w-105 max-w-full px-4 py-2 rounded-full text-sm outline-none shadow-sm"
        />
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3 text-white">
        <div className="text-right">
          <p className="text-sm font-semibold">{user?.name}</p>
          <p className="text-xs text-green-300">Online</p>
        </div>

        <Image
          src={user?.pic || "/avatar.png"}
          alt="user"
          width={36}
          height={36}
          className="rounded-full cursor-pointer border-2 border-white"
          onClick={handleShow}
        />
      </div>

      {/* Dropdown */}
      {show && (
        <div className="absolute top-16 right-6 w-40 bg-white rounded-xl shadow-lg py-2 text-sm">
          <p className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
            Profile
          </p>
          <p className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-500">
            Logout
          </p>
        </div>
      )}
    </div>
    )
}

export default Navbar;