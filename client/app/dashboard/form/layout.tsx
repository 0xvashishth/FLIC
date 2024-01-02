"use client"

import SwitchLogo from "@/app/components/clientUtils/SwitchLogo";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="m-3">
      <div className="text-xl flex justify-between">
        <div className="text-left">
          <p className="max-sm:text-sm">Form Details & Analytics 🔍</p>
          <div className="drawer z-[50] drawer-end">
            <input
              id="create-form-drawer"
              type="checkbox"
              className="drawer-toggle"
            />
            <div className="drawer-side">
              <label
                htmlFor="create-form-drawer"
                aria-label="close sidebar"
                className="drawer-overlay"
              ></label>
              <ul className="menu p-7 md:w-1/2 w-4/5 min-h-full bg-base-200 text-base-content">
                <li className="btn mx-auto">
                  Create a new Form
                  </li>
                <form>
                  <div className="mb-4">
                    <label
                      htmlFor="formname"
                      className="block text-xl font-medium "
                    >
                      Form Name *
                    </label>
                    <input
                      type="text"
                      id="formname"
                      name="formname"
                      className="h-7 text-lg p-2 mt-1 block w-full rounded-md"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="emailto"
                      className="block text-xl font-medium "
                    >
                      Email To *
                    </label>
                    <input
                      type="text"
                      id="emailto"
                      name="emailto"
                      className="h-7 text-lg p-2 mt-1 block w-full rounded-md"
                      required
                    />
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium "
                    >
                      Custom Message
                    </label>
                    <textarea
                      id="email"
                      name="email"
                      placeholder="This message will be displayed to user when user submits the form"
                      className="p-2 mt-1 block w-full rounded-md"
                    />
                  </div>

                  <div className="flex">
                  <button
                    type="submit"
                    className="btn btn-outline"
                  >
                    Submit
                  </button>
                  &nbsp;&nbsp;
                  <label
                  htmlFor="create-form-drawer"
                  className="btn"
                  aria-label="close sidebar"
                >
                  close
                </label>
                  </div>
                </form>
              </ul>
            </div>
          </div>
        </div>
        <div className="text-right">
          <label htmlFor="create-form-drawer" className="btn btn-sm max-md:text-xs">
            Create New Form
          </label>
          {/* Drawer For Creating A Form */}
          
        </div>
      </div>
      {children}
      </div>
  );
}
