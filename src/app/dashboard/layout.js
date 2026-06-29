
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Loading from "../loading";

export default async function DashboardLayout({ children }) {
   const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    return <Loading/>;
  }
  const user = session?.user;
  
  return (
    <div className="h-screen flex gap-1 md:gap-3 w-full bg-background overflow-hidden">
      <div>
        <DashboardSidebar />
      </div>
      <main className="flex-1 h-screen w-full p-4 overflow-y-auto">
        <div className="flex justify-between mb-10">
          <div className="pl-15 lg:pl-0">
            <h2 className="text-2xl font-bold">Dashboard</h2>
            <p>Welcome Back, {user?.name}</p>
          </div>
          <div>
            <p className="text-red-500 font-bold capitalize">{user?.role}</p>
          </div>
        </div>
        <div className="">{children}</div>
      </main>
    </div>
  );
}
