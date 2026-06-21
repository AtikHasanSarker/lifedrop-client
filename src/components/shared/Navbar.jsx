"use client";

// import { authClient } from "@/lib/auth-client";
import { Avatar, Button, Dropdown, Label } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { BiLogOut, BiSolidDonateBlood } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { FaHome, FaUserCircle } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { LiaDonateSolid } from "react-icons/lia";
import { MdDashboard } from "react-icons/md";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const { data: session } = authClient.useSession();
//   const user = session?.user;
const user = null;

  const pathName = usePathname();
  if (pathName.includes("dashboard")) {
    return null;
  }

  const navItems = [
    { title: "Home", href: "/", icon: FaHome },
    {
      title: "Donation Requests",
      href: "/donation-requests",
      icon: BiSolidDonateBlood,
    },
    { title: "Search Donor", href: "/search-donor", icon: IoSearch },
  ];

  const authItems = [
    { title: "Funding", href: `/funding`, icon: LiaDonateSolid },
  ];

  const handleSignOut = async () => {
    await authClient.signOut();
  };
  return (
    <div>
      <nav className="sticky top-0 z-40 w-full border-b border-separator bg-background/70 backdrop-blur-lg">
        <header className="mx-auto flex h-16 max-w-7xl items-center justify-between px-2">
          <div className="flex items-center gap-4">
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Menu</span>
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
            <Link href={"/"}>
              <div>
                <Image
                  height={100}
                  width={200}
                  loading="eager"
                  src="/nav-logo.png"
                  alt="logo"
                  className="hover:bg-zinc-200 p-2"
                />
              </div>
            </Link>
          </div>

          <div className={`hidden items-center gap-6 md:flex`}>
            {navItems.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className={`flex gap-2 items-center font-semibold transition-colors hover:text-[#B91C1C] ${
                  pathName === item.href ? "text-[#DC2626]" : ""
                }`}
              >
                {" "}
                {<item.icon />}
                {item.title}
              </Link>
            ))}

            {user &&
              authItems.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className={`hidden lg:flex gap-2 items-center font-semibold transition-colors hover:text-[#B91C1C] ${
                    pathName === item.href ? "text-[#DC2626]" : ""
                  }`}
                >
                  {<item.icon />}
                  {item.title}
                </Link>
              ))}
          </div>

          {!user && (
            <Link href="/login" className="hidden items-center gap-2 md:flex">
              <Button className="bg-[#DC2626] text-white hover:bg-[#B91C1C]">
                {" "}
                <FaUserCircle />
                Login
              </Button>
            </Link>
          )}

          {user && (
            <div className="hidden items-center gap-4 md:flex">
              <Dropdown>
                <Dropdown.Trigger className="rounded-full">
                  <Avatar size="sm" aria-label="Menu">
                    <Avatar.Image
                      referrerPolicy="no-referrer"
                      alt="John Doe"
                      src={user?.image}
                    />
                    <Avatar.Fallback>{user.name.charAt(0)}</Avatar.Fallback>
                  </Avatar>
                </Dropdown.Trigger>
                <Dropdown.Popover>
                  <div className="px-3 pt-3 pb-1">
                    <div className="flex items-center gap-2">
                      <Avatar size="sm">
                        <Avatar.Image alt={user?.name} src={user?.image} />
                        <Avatar.Fallback delayMs={600}>JD</Avatar.Fallback>
                      </Avatar>
                      <div className="flex flex-col gap-0">
                        <p className="text-sm leading-5 font-medium">
                          {user?.name}
                        </p>
                        <p className="text-xs leading-none text-muted">
                          {user?.email}
                        </p>
                      </div>
                    </div>
                  </div>
                  <Dropdown.Menu
                    onAction={(key) => console.log(`Selected: ${key}`)}
                  >
                    <Dropdown.Item id="new-file" textValue="New file">
                      <Link
                        className="flex items-center gap-2"
                        href={`/dashboard/${user?.role}`}
                      >
                        <MdDashboard />
                        <Label>Dashboard</Label>
                      </Link>
                    </Dropdown.Item>

                    <Dropdown.Item id="copy-link" textValue="Copy link">
                      <CgProfile />
                      <Label>Profile</Label>
                    </Dropdown.Item>

                    <Dropdown.Item
                      id="delete-file"
                      textValue="Delete file"
                      variant="danger"
                      onClick={handleSignOut}
                    >
                      <BiLogOut />
                      <Label>Logout</Label>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown.Popover>
              </Dropdown>
            </div>
          )}
        </header>
        {isMenuOpen && (
          <div className="border-t border-separator md:hidden">
            <ul className="flex flex-col gap-2 p-4">
              {navItems.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.href}
                    className={`flex gap-2 items-center font-semibold transition-colors hover:text-[#B91C1C] ${
                      pathName === item.href ? "text-[#DC2626]" : ""
                    }`}
                  >
                    {" "}
                    {<item.icon />}
                    {item.title}
                  </Link>
                </li>
              ))}
              {authItems.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.href}
                    className={`flex gap-2 items-center font-semibold transition-colors hover:text-[#B91C1C] ${
                      pathName === item.href ? "text-[#DC2626]" : ""
                    }`}
                  >
                    {" "}
                    {<item.icon />}
                    {item.title}
                  </Link>
                </li>
              ))}
              <li className="mt-4 flex flex-col gap-2 border-t border-separator pt-4">
                <Link href="#" className="block py-2">
                  Login
                </Link>
                <Button className="w-full">Sign Up</Button>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
