"use client"

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { getChatData } from "../chatUtils";
import { useState, useEffect } from "react";

export default function ChatDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const searchParams = useSearchParams();
  const searchChatId = searchParams.get("id");
  const pathname = usePathname();
  const [chatTitle, setChatTitle] = useState();

  useEffect(()=>{
    setChatTitle(JSON.parse(localStorage.getItem("chatDataFromLocalStorage")!).find((item: any) => item._id === searchChatId)?.chatTitle)
  }, [])

  return (
    <div>
        <div className="pt-3">
        <h1 className="text-sm rounded-xl p-2 will-change-auto text-center">{chatTitle}</h1>
      </div>
      <div className="pt-3 mx-auto text-center">
        <ul className="menu menu-vertical sm:menu-horizontal bg-base-200 rounded-box">
          <li>
            <Link
              className={` ${
                pathname == "/dashboard/chat/details" ? "active" : ""
              }`}
              href={"/dashboard/chat/details?id="+ searchChatId}
            >
              Integration
            </Link>
          </li>
          <li>
            <Link
              className={` ${
                pathname.startsWith("/dashboard/chat/details/responses")
                  ? "active"
                  : ""
              }`}
              href={"/dashboard/chat/details/responses?id=" + searchChatId}
            >
              Responses
            </Link>
          </li>
          <li>
            <Link
              className={` ${
                pathname.startsWith("/dashboard/chat/details/settings")
                  ? "active"
                  : ""
              }`}
              href={"/dashboard/chat/details/settings?id=" + searchChatId}
            >
              Settings
            </Link>
          </li>
          {/* <li>
            <Link
              className={` ${
                pathname.startsWith("/dashboard/chat/details/plugins")
                  ? "active"
                  : ""
              }`}
              href={"/dashboard/chat/details/plugins?id=" + searchChatId}
            >
              Plugins
            </Link>
          </li> */}
        </ul>
      </div>
      {children}
    </div>
  );
}
