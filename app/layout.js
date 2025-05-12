import Header from "@/components/Header";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

export const metadata = {
  title: "Stamurai Todo Management",
  description: "Task Management System",
};
import { UserProvider } from "@/Context/UserContext";
import { AllUserProvider } from "@/Context/AllUserContext";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="h-screen overflow-hidden">
        <AllUserProvider>
          <UserProvider>
        
                <div className="flex h-full">
                  <Sidebar />
                  <div className="flex-1 flex flex-col overflow-y-auto">
                    <Header/>
                    {children}
                  </div>
                </div>
                </UserProvider>
                </AllUserProvider>
                
            
      </body>
    </html>
  );
}
