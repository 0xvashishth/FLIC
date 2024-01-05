"use client"

import SwitchLogo from "@/app/components/clientUtils/SwitchLogo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function SettingsLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  
  return (
    <div>
        {children}
    </div>
  );
}
