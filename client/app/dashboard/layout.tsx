"use client";

import SwitchLogo from "@/app/components/clientUtils/SwitchLogo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const dashboardNotification = () => {
    toast("Coming Soon", {
      icon: "🚀",
    });
  };

  const { push } = useRouter();
  const pathname = usePathname();

  const [user, setUser] = useState({
    email: "",
    firstName: "",
  });

  // checking the user loggedIn

  useEffect(() => {
    if (!localStorage.getItem("user") || !localStorage.getItem("userToken")) {
      push("/");
    } else {
      var userItem = JSON.parse(localStorage.getItem("user")!);
      setUser(userItem!);
    }
  }, []);

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <div className="navbar bg-base-200">
          <div className="navbar-start">
            <div className="lg:invisible">
              <label
                tabIndex={0}
                role="button"
                htmlFor="my-drawer"
                className="btn btn-ghost btn-circle drawer-button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h7"
                  />
                </svg>
              </label>
            </div>
          </div>
          <div className="navbar-center">
            <Link className="btn btn-ghost text-xl" href="/dashboard">
              Hello {user.firstName} 🎉
            </Link>
          </div>
          <div className="navbar-end">
            {/* Search Button Is Not Needed RN <button className="btn btn-ghost btn-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button> */}
            {user ? (
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar m-1"
                >
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS Navbar component"
                      src={process.env.NEXT_PUBLIC_IDENTICONS_URL + user.email}
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li>
                    <Link className="justify-between" href="/dashboard/profile">
                      Profile
                      <span className="badge badge-primary">New</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/dashboard/profile/preferences">
                      Preferences
                    </Link>
                  </li>
                  <li>
                    <a href="/logout">Logout</a>
                  </li>
                </ul>
              </div>
            ) : (
              <div></div>
            )}
            <button
              onClick={dashboardNotification}
              className="btn btn-ghost btn-circle"
            >
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                <span className="badge badge-xs badge-primary indicator-item"></span>
              </div>
            </button>
          </div>
        </div>
        {children}
      </div>
      <div className="drawer-side z-[50]">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-60 min-h-full bg-base-200 text-base-content">
          {/* Sidebar content here */}
          <Link className="w-20 m-3 text-center mx-auto" href="/dashboard">
            <SwitchLogo />
          </Link>
          <div className="mx-auto my-5">
            <li>
              <Link
                className={` ${
                  pathname.startsWith("/dashboard/form") ? "active" : ""
                }`}
                href="/dashboard/form"
              >
                Form
              </Link>
            </li>
            <li>
              <Link
                className={` ${
                  pathname.startsWith("/dashboard/link") ? "active" : ""
                }`}
                href="/dashboard/link"
              >
                Link
              </Link>
            </li>
            <li>
              <Link
                className={` ${
                  pathname.startsWith("/dashboard/chat") ? "active" : ""
                }`}
                href="/dashboard/chat"
              >
                Chat
              </Link>
            </li>
            <li>
              <details open>
                <summary>
                  <Link href="/dashboard/profile">Profile</Link>
                </summary>
                <ul>
                  <li>
                    <Link
                      className={` ${
                        pathname == "/dashboard/profile" ? "active" : ""
                      }`}
                      href="/dashboard/profile"
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={` ${
                        pathname.startsWith("/dashboard/profile/preferences")
                          ? "active"
                          : ""
                      }`}
                      href="/dashboard/profile/preferences"
                    >
                      Preferences
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={` ${
                        pathname.startsWith("/dashboard/profile/billing")
                          ? "active"
                          : ""
                      }`}
                      href="/dashboard/profile/billing"
                    >
                      Billing
                    </Link>
                  </li>
                </ul>
              </details>
            </li>
            {/* <li>
              <details open>
                <summary>Documentation</summary>
                <ul>
                  <li>
                    <a>Usage</a>
                  </li>
                  <li>
                    <a>Starter Plan</a>
                  </li>
                  <li>
                    <a>Pro Plan</a>
                  </li>
                </ul>
              </details>
            </li> */}
            <li>
              <a href="/logout">Logout</a>
            </li>
          </div>
        </ul>
      </div>
    </div>
  );
}
