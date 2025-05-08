"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import LogoutButton from "./LogoutButton";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter()

  const handleLogout=()=>{
    Cookies.remove("token")
    router.push("/auth/login")


  }

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="sm:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setOpen(!open)}
          className=" bg-white rounded-md shadow-md"
        >
          <Menu className="text-gray-700" />
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`${
          open ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0 transition-transform fixed sm:static top-0 left-0 z-40 w-64 h-screen bg-gray-50 dark:bg-gray-800 p-4 overflow-y-auto`}
      >
        <ul className="space-y-4 font-medium mt-8 sm:mt-0 flex flex-col gap-4">
          <li>
            <Link href="/">
              <div
                className={`flex items-center space-x-2 text-gray-700  p-2 rounded-md ${
                  pathname == "/" ? "bg-slate-300" : "bg-blue-800 text-white"
                }`}
              >
                <svg
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 22 21"
                >
                  <path d="M16.975 11H10V4.025..." />
                </svg>
                <span>Dashboard</span>
              </div>
            </Link>
          </li>
          <li>
            <Link href="/newTodo">
              <div
                className={`flex items-center space-x-2 text-gray-700  p-2 rounded-md ${
                  pathname == "/newTodo"
                    ? "bg-slate-300"
                    : "bg-blue-800 text-white"
                }`}
              >
                <svg
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 22 21"
                >
                  <path d="M16.975 11H10V4.025..." />
                </svg>
                <span>Create Todo</span>
              </div>
            </Link>
          </li>
          <li className="w-full">
            {/* <button className="w-full bg-red-500 p-2 rounded-md text-white hover:bg-red-400 cursor-pointer" onClick={() =>handleLogout()}>
              <span>Logout</span>
            </button> */}
            <LogoutButton></LogoutButton>
          </li>
          <li className="w-full">
            <Link href={"/auth/register"}>
            <button className="w-full bg-orange-500 p-2 rounded-md text-white hover:bg-orange-400 cursor-pointer" onClick={() =>router.push('/auth/register')}>
              <span>Register</span>
            </button>
            </Link>
          </li>
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;
