"use client"

import SwitchLogo from "@/app/components/clientUtils/SwitchLogo";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const searchParams = useSearchParams();
  const searchFormId = searchParams.get("id");
  const pathname = usePathname();
  return (
    <div>
        <div className="pt-3">
        <h1 className="text-3xl">my form</h1>
      </div>
      <div className="pt-3 mx-auto text-center">
        <ul className="menu menu-vertical sm:menu-horizontal bg-base-200 rounded-box">
          <li>
            <Link
              className={` ${
                pathname == "/dashboard/form/details" ? "active" : ""
              }`}
              href={"/dashboard/form/details?id="+ searchFormId}
            >
              Integration
            </Link>
          </li>
          <li>
            <Link
              className={` ${
                pathname.startsWith("/dashboard/form/details/responses")
                  ? "active"
                  : ""
              }`}
              href={"/dashboard/form/details/responses?id=" + searchFormId}
            >
              Responses
            </Link>
          </li>
          <li>
            <Link
              className={` ${
                pathname.startsWith("/dashboard/form/details/settings")
                  ? "active"
                  : ""
              }`}
              href={"/dashboard/form/details/settings?id=" + searchFormId}
            >
              Settings
            </Link>
          </li>
          <li>
            <Link
              className={` ${
                pathname.startsWith("/dashboard/form/details/plugins")
                  ? "active"
                  : ""
              }`}
              href={"/dashboard/form/details/plugins?id=" + searchFormId}
            >
              Plugins
            </Link>
          </li>
        </ul>
      </div>
      {children}
    </div>
  );
}
