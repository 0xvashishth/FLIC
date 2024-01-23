"use client";

import { usePathname } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [linkModalData, setLinkModalData] = useState({
    originalURL: "",
    title: "",
    shortenedSuffix: ""
  });

  const [customBackHalf, setCustomBackHalf] = useState("");
  const [customBackHalfText, setCustomBackHalfText] = useState("");

  const handleChange = (e: any) => {
    const { id, value } = e.target;
    setLinkModalData((prevLinkModalData) => ({
      ...prevLinkModalData,
      [id]: value,
    }));
  };

  const handleCustomBackHalf = async (e: any) => {
    setCustomBackHalfText("This is wrong");
    const { id, value } = e.target;
    setCustomBackHalf(value);

    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `${
          process.env.NEXT_PUBLIC_TOKEN_TYPE
        } ${localStorage.getItem("userToken")}`,
      };

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/url/checksuffixurl?suffixUrl=${value}`
        // { url: linkModalData },
        // { headers }
      );
      if (response.data.message == "ok") {
        setCustomBackHalfText("Valid!!");
        setLinkModalData((prevLinkModalData) => ({
          ...prevLinkModalData,
          ["shortenedSuffix"]: value,
        }));
      } else {
        setCustomBackHalfText("Already Existing or Invalid!!");
        setLinkModalData((prevLinkModalData) => ({
          ...prevLinkModalData,
          ["shortenedSuffix"]: "",
        }));
      }
    } catch (error: any) {
      console.error("Error in creating link:", error);
      setCustomBackHalfText("Something Went Wrong");
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const toastId = toast.loading("Sending data..");
    console.log(linkModalData)
    if (
      !linkModalData.originalURL ||
      !linkModalData.shortenedSuffix ||
      !linkModalData.title
    ) {
      toast.error("Some Fields Are Missing", {
        id: toastId,
      });
    } else {
      try {
        const headers = {
          "Content-Type": "application/json",
          Authorization: `${
            process.env.NEXT_PUBLIC_TOKEN_TYPE
          } ${localStorage.getItem("userToken")}`,
        };

        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/url`,
          { url: linkModalData },
          { headers }
        );
        console.log(response.data.message); // Assuming the server returns some data
        toast.success(response.data.message, {
          id: toastId,
        });
        localStorage.setItem("LinkNewCreatedPing", "Yes");
        location.reload();
      } catch (error: any) {
        console.error("Error in creating link:", error);
        toast.error(error.response.data.error, {
          id: toastId,
        });
      }
    }
  };

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
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label
                      htmlFor="originalURL"
                      className="block text-xl font-medium "
                    >
                      Destination (Original URL) *
                    </label>
                    <input
                      type="text"
                      id="originalURL"
                      name="originalURL"
                      value={linkModalData.originalURL}
                      onChange={handleChange}
                      className="h-7 text-lg p-2 mt-1 block w-full rounded-md"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="title"
                      className="block text-xl font-medium "
                    >
                      Link Title *
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={linkModalData.title}
                      onChange={handleChange}
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
                      value={customBackHalf}
                      onChange={handleCustomBackHalf}
                      className="h-7 text-lg p-2 mt-1 block w-full rounded-md"
                      required
                    />
                    <span className="text-accent">{customBackHalfText}</span>
                  </div>

                  {/* <div className="mb-6">
                    <select
                      className="select select-bordered w-full max-w-xs"
                      // id="isQrCodeSelected"
                      // value={linkModalData.isQrCodeSelected}
                      onChange={handleChange}
                    >
                     
                      <option value="no" selected>
                        No
                      </option>
                      <option value="yes">Yes</option>
                    </select>
                  </div> */}

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
        </div>
      </div>
      {children}
    </div>
  );
}
