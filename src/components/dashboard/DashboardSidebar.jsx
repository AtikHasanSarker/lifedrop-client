'use client';
import { LayoutSideContentLeft } from "@gravity-ui/icons";
import { Avatar, Button, Drawer } from "@heroui/react";
import { HiOutlineBookOpen, HiOutlineHome } from "react-icons/hi";
import Link from "next/link";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { BiDonateBlood } from "react-icons/bi";
import { FaRegCircleUser } from "react-icons/fa6";
import { LuLogOut, LuPencilLine } from "react-icons/lu";
import { redirect, usePathname } from "next/navigation";
import { Droplets, Users } from "lucide-react";
import Loading from "@/app/loading";

export function DashboardSidebar() {
  const pathName = usePathname();
  const handleSignOut = async () => {
    await authClient.signOut();
    redirect("/");
  };

  const { data: session } = authClient.useSession();
  const user = session?.user;
  if (!user) {
    return <Loading/>;
  }

  const role = user?.role || "donor";

  const dashboardItems = {
    donor: [
      { icon: HiOutlineBookOpen, href: "/dashboard/donor", label: "Overview" },
      {
        icon: HiOutlineHome,
        href: "/",
        label: "Home",
      },
      {
        icon: FaRegCircleUser,
        href: "/dashboard/donor/profile",
        label: "Profile",
      },
      {
        icon: BiDonateBlood,
        href: "/dashboard/donor/my-requests",
        label: "My Requests",
      },
      {
        icon: LuPencilLine,
        href: "/dashboard/donor/create-donation-request",
        label: "Create Request",
      },
    ],

    volunteer: [
      {
        icon: HiOutlineBookOpen,
        href: "/dashboard/volunteer",
        label: "Overview",
      },
      {
        icon: HiOutlineHome,
        href: "/",
        label: "Home",
      },
      {
        icon: FaRegCircleUser,
        href: "/dashboard/volunteer/profile",
        label: "Profile",
      },
      {
        icon: BiDonateBlood,
        href: "/dashboard/volunteer/my-requests",
        label: "My Requests",
      },
      {
        icon: LuPencilLine,
        href: "/dashboard/volunteer/create-donation-request",
        label: "Create Request",
      },
      {
        icon: Droplets,
        href: "/dashboard/admin/public-requests",
        label: "All Requests",
      },
    ],
    admin: [
      { icon: HiOutlineBookOpen, href: "/dashboard/admin", label: "Overview" },
      {
        icon: HiOutlineHome,
        href: "/",
        label: "Home",
      },
      {
        icon: FaRegCircleUser,
        href: "/dashboard/admin/profile",
        label: "Profile",
      },
      {
        icon: BiDonateBlood,
        href: "/dashboard/admin/my-requests",
        label: "My Requests",
      },
      {
        icon: LuPencilLine,
        href: "/dashboard/admin/create-donation-request",
        label: "Create Request",
      },
      {
        icon: Droplets,
        href: "/dashboard/admin/public-requests",
        label: "Public Requests",
      },
      {
        icon: Users,
        href: "/dashboard/admin/all-users",
        label: "All Users",
      },
    ],
  };

  const navItems = dashboardItems[role];

  const navContent = (
    <div className="flex flex-col justify-between h-full">
      <nav className="flex flex-col gap-1 lg:p-3">
        {navItems.map((item) => (
          <Link
            key={item.label}
            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold transition-colors ${
              pathName === item.href
                ? "bg-red-600 text-white"
                : "hover:bg-red-100 hover:text-red-600"
            }`}
            href={item.href}
          >
            <item.icon className="size-5" />
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="flex flex-col px-3 gap-4 pb-6">
        <div className="flex items-center gap-2">
          <Avatar size="sm">
            <Avatar.Image alt={user?.name} src={user?.image} />
            <Avatar.Fallback>{user.name.charAt(0)}</Avatar.Fallback>
          </Avatar>
          <div className="flex flex-col gap-0">
            <p className="text-sm leading-5 font-medium">{user?.name}</p>
            <p className="text-xs leading-none text-muted">{user?.email}</p>
          </div>
        </div>

        <Button
          className="w-full bg-red-100 font-bold text-red-500 hover:bg-red-600 hover:text-white rounded-xl"
          onClick={handleSignOut}
        >
          <LuLogOut />
          Logout
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <aside className="hidden lg:flex w-60 shrink-0 border-r flex-col h-full">
        <div className="border-b p-4 border-gray-500">
          <Image src="/nav-logo.png" alt="logo" width={150} height={150} />
        </div>
        {navContent}
      </aside>
      <Drawer>
        <Button variant="secondary" className="lg:hidden fixed top-4 left-3 z-20 px-3">
          <LayoutSideContentLeft />
        </Button>
        <Drawer.Backdrop>
          <Drawer.Content placement="left">
            <Drawer.Dialog className="w-60 p-0">
              <Drawer.CloseTrigger />
              <Drawer.Header>
                <Drawer.Heading>
                  <div className="border-b p-4 border-gray-500">
                    <Image
                      src="/nav-logo.png"
                      alt="logo"
                      width={150}
                      height={150}
                    />
                  </div>
                </Drawer.Heading>
              </Drawer.Header>
              <Drawer.Body className="p-3">{navContent}</Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    </>
  );
}
