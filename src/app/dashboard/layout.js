
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function DashboardLayout({ children }) {
   const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;
  
  return (
    <div className="min-h-screen flex gap-3 w-full bg-background">
      <div>
        <DashboardSidebar />
      </div>
      <main className="flex-1 w-full p-4">
        <div className="flex justify-between mb-10">
          <div>
            <h2 className="text-2xl font-bold">Dashboard</h2>
            <p>Welcome Back,{user?.name}</p>
          </div>
          <div>
            <p className="text-red-500 font-bold">{user?.role?.[0]?.toUpperCase() + user?.role?.slice(1)}</p>
          </div>
        </div>
        <div className=" p-4">{children}</div>
      </main>
    </div>
  );
}
