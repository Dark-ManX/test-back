"use client";

import { Navbar, NavbarContent, NavbarItem } from "@heroui/navbar";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const MainLayout = () => {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <Navbar className="bg-gray-500">
      <NavbarContent className="w-full p-4 flex justify-center gap-4">
        <NavbarItem className={`${isActive("/list") && "text-blue"}`}>
          <Link href="/list">Go to list</Link>
        </NavbarItem>
        <NavbarItem className={`${isActive("/table") ? "text-blue" : ""}`}>
          <Link href="/table">Go to table</Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};
