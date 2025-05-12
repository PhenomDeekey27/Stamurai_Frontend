"use client";
import React, { useContext, useEffect, useState } from "react";
import { Bell } from "lucide-react";
import { UserContext } from "@/Context/UserContext";
import { getNofications } from "@/utitlity/get-user-notifications";
import NotificationModal from "./NotificationModal";

const Header = () => {
  const { userdetails } = useContext(UserContext);
  console.log(userdetails,"usd")
  const [notifcationsCount, setnotifcationsCount] = useState(0);
  const [displayNotificationModal, setdisplayNotificationModal] = useState(false)
  const [notificationsData, setnotificationsData] = useState([])
 

 async function getUsernotifications(userId) {
  const notifications = await getNofications(userId);
  console.log(notifications,"arrived Notifications");
  if (Array.isArray(notifications.data)) {
    setnotifcationsCount(notifications.data.length);
    setnotificationsData(notifications.data)
  
  } else {
    setnotifcationsCount(0);
  }
}


  useEffect(() => {
    if(userdetails?._id){
    getUsernotifications(userdetails?._id);
    }else{
      setnotifcationsCount(0)
    }
  }, [userdetails]);

  return (
    <header className="sticky p-4 bg-green-200 top-0 z-10 mb-4">
      <div className="flex flex-col ml-12 md:ml-0 md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
        {/* Logo + Bell */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-green-600">Stamurai</h1>
          <Bell className="text-green-600 md:hidden" />
        </div>

        {/* Bell Icon (Only on md and up) */}
        <div className="relative hidden md:flex cursor-pointer">
          <button onClick={()=>setdisplayNotificationModal(!displayNotificationModal)} className="cursor-pointer">
              <Bell className="text-green-600" size={26}/>
          </button>
        
          {notifcationsCount && notifcationsCount > 0 && (
            <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-full">
              {notifcationsCount}
            </span>
          )}
          {
            displayNotificationModal && <NotificationModal data={notificationsData}></NotificationModal>
          }

        </div>
      </div>
    </header>
  );
};

export default Header;
