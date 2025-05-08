"use client"
import React from "react";
import { Bell } from "lucide-react";

const Header = () => {
  return (
    <header className="sticky p-4 bg-green-200 top-0 z-10 mb-4">
      <div className="flex flex-col ml-12 md:ml-0 md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
        {/* Logo + Bell */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-green-600">Stamurai</h1>
          <Bell className="text-green-600 md:hidden" />
        </div>

        {/* Bell Icon (Only on md and up) */}
        <div className="hidden md:flex cursor-pointer">
          <Bell className="text-green-600" size={26} />
         
        </div>
      </div>
    </header>
  );
};

export default Header;
