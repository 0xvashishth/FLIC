"use client";

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
          <p className="max-sm:text-sm">Links Details & Analytics 🔍</p>
          <div className="drawer z-[50] drawer-end">
            <input
              id="create-link-drawer"
              type="checkbox"
              className="drawer-toggle"
            />
            <div className="drawer-side">
              <label
                htmlFor="create-link-drawer"
                aria-label="close sidebar"
                className="drawer-overlay"
              ></label>
              <ul className="menu p-7 md:w-1/2 w-4/5 min-h-full bg-base-200 text-base-content">
                <li className="btn mx-auto">Create a new Link</li>
                <form>
                  <div className="mb-4">
                    <label
                      htmlFor="destination"
                      className="block text-xl font-medium "
                    >
                      Destination *
                    </label>
                    <input
                      type="text"
                      id="destination"
                      name="destination"
                      className="h-7 text-lg p-2 mt-1 block w-full rounded-md"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="linkTitle"
                      className="block text-xl font-medium "
                    >
                      Link Title *
                    </label>
                    <input
                      type="text"
                      id="linkTitle"
                      name="linkTitle"
                      className="h-7 text-lg p-2 mt-1 block w-full rounded-md"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="customBackHalf"
                      className="block text-xl font-medium "
                    >
                      Custom back-half *
                    </label>
                    <input
                      type="text"
                      id="customBackHalf"
                      name="customBackHalf"
                      className="h-7 text-lg p-2 mt-1 block w-full rounded-md"
                      required
                    />
                  </div>

                  <div className="mb-6">
                    <select className="select select-bordered w-full max-w-xs">
                      <option disabled selected>
                        Want to create QR Code?
                      </option>
                      <option value="no">No</option>
                      <option value="yes">Yes</option>
                    </select>
                  </div>

                  <div className="flex">
                    <button type="submit" className="btn btn-outline">
                      Submit
                    </button>
                    &nbsp;&nbsp;
                    <label
                      htmlFor="create-link-drawer"
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
          <label
            htmlFor="create-link-drawer"
            className="btn btn-sm max-md:text-xs"
          >
            Create New Link
          </label>
          {/* Drawer For Creating A Link */}
        </div>
      </div>
      {children}
    </div>
  );
}
