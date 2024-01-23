"use client"

import SwitchLogo from "@/app/components/clientUtils/SwitchLogo";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export default function LinkDashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const searchParams = useSearchParams();
  const searchLinkId = searchParams.get("id");
  const pathname = usePathname();
  return (
    <div>
        <div className="pt-3">
        <h1 className="text-sm rounded-xl p-2 will-change-auto text-center">my link</h1>
      </div>
      <div className="pt-3 mx-auto text-center">
        <ul className="menu menu-vertical sm:menu-horizontal bg-base-200 rounded-box">
          <li>
            <a
              className={` ${
                pathname == "/dashboard/link/details" ? "active" : ""
              }`}
              href={"/dashboard/link/details?id="+ searchLinkId}
            >
              General
            </a>
          </li>
          {/* <li>
            <Link
              className={` ${
                pathname.startsWith("/dashboard/link/details/responses")
                  ? "active"
                  : ""
              }`}
              href={"/dashboard/link/details/responses?id=" + searchLinkId}
            >
              Analytics
            </Link>
          </li> */}
          <li>
            <Link
              className={` ${
                pathname.startsWith("/dashboard/link/details/settings")
                  ? "active"
                  : ""
              }`}
              href={"/dashboard/link/details/settings?id=" + searchLinkId}
            >
              Settings
            </Link>
          </li>
          <li>
            <Link
              className={` ${
                pathname.startsWith("/dashboard/link/details/analytics")
                  ? "active"
                  : ""
              }`}
              href={"/dashboard/link/details/analytics?id=" + searchLinkId}
            >
              Analytics
            </Link>
          </li>
        </ul>
      </div>
      {children}
    </div>
  );
}
