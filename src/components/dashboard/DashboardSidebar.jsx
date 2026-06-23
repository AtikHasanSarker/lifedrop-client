'use client';
import { LayoutSideContentLeft } from "@gravity-ui/icons";
import { Avatar, Button, Drawer } from "@heroui/react";
import { HiOutlineBookOpen, HiOutlineBriefcase, HiOutlineHome } from "react-icons/hi";
import Link from "next/link";
import Image from "next/image";
import { TbAsset } from "react-icons/tb";
import { FaUsersCog } from "react-icons/fa";
import { GrTransaction } from "react-icons/gr";
import { authClient } from "@/lib/auth-client";

export function DashboardSidebar() {
  const handleSignOut = async () => {
    await authClient.signOut();
  };

  const { data: session } = authClient.useSession();

  const user = session?.user;
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
        icon: GrTransaction,
        href: "/dashboard/donor/requests",
        label: "My Requests",
      },
      {
        icon: HiOutlineBriefcase,
        href: "/dashboard/seller/company",
        label: "Create Request",
      },
    ],

    volunteer: [
      {
        icon: HiOutlineBookOpen,
        href: "/dashboard/buyer",
        label: "Overview",
      },
      {
        icon: TbAsset,
        href: "/dashboard/buyer/products",
        label: "Products",
      },
      {
        icon: GrTransaction,
        href: "/dashboard/buyer/transaction",
        label: "Transactions",
      },
      {
        icon: HiOutlineBriefcase,
        href: "/dashboard/buyer/company",
        label: "Company Profile",
      },
    ],
    admin: [
      { icon: HiOutlineBookOpen, href: "/dashboard/admin", label: "Overview" },
      {
        icon: FaUsersCog,
        href: "/dashboard/admin/products",
        label: "User Manage",
      },
      {
        icon: GrTransaction,
        href: "/dashboard/admin/transaction",
        label: "Transactions",
      },
      {
        icon: HiOutlineBriefcase,
        href: "/dashboard/admin/company",
        label: "Company Profile",
      },
    ],
  };

  const navItems = dashboardItems[role];

  const navContent = (
    <div className="flex flex-col justify-between h-full">
      <nav className="flex flex-col gap-1">
        {navItems.map((item) => (
          <Link
            key={item.label}
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
            href={item.href}
          >
            <item.icon className="size-5 text-muted" />
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="flex flex-col px-3 gap-4 pb-6">
        <div className="flex items-center gap-2">
          <Avatar size="sm">
            <Avatar.Image alt={user?.name} src={user?.image} />
            <Avatar.Fallback delayMs={600}>JD</Avatar.Fallback>
          </Avatar>
          <div className="flex flex-col gap-0">
            <p className="text-sm leading-5 font-medium">{user?.name}</p>
            <p className="text-xs leading-none text-muted">{user?.email}</p>
          </div>
        </div>

        <Button
          className="w-full bg-red-400 text-white hover:bg-red-500 rounded-xl"
          onClick={handleSignOut}
        >
          Logout
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <aside className="hidden lg:flex w-50 shrink-0 border-r flex-col h-full">
        <div className="border-b p-4 border-gray-500">
          <Image src="/nav-logo.png" alt="logo" width={150} height={150} />
        </div>
        {navContent}
      </aside>
      <Drawer>
        <Button variant="secondary" className="lg:hidden">
          <LayoutSideContentLeft />
          Sidebar
        </Button>
        <Drawer.Backdrop>
          <Drawer.Content placement="left">
            <Drawer.Dialog>
              <Drawer.CloseTrigger />
              <Drawer.Header>
                <Drawer.Heading>Navigation</Drawer.Heading>
              </Drawer.Header>
              <Drawer.Body>{navContent}</Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    </>
  );
}
