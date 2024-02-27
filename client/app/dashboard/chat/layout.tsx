"use client";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [chatModalData, setChatModalData] = useState({
    chatTitle: "",
    department: "",
    priority: "",
  });

  const handleChange = (e: any) => {
    const { id, value } = e.target;
    console.log(e);
    setChatModalData((prevChatModalData) => ({
      ...prevChatModalData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const toastId = toast.loading("Sending data..");
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `${
          process.env.NEXT_PUBLIC_TOKEN_TYPE
        } ${localStorage.getItem("userToken")}`,
      };
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/chat`,
        { chat: chatModalData },
        { headers }
      );
      console.log(response.data.message); // Assuming the server returns some data
      toast.success(response.data.message, {
        id: toastId,
      });
      localStorage.setItem("ChatNewCreatedPing", "Yes");
      location.reload();
    } catch (error: any) {
      console.error("Error in creating chat:", error);
      toast.error(error.response.data.error, {
        id: toastId,
      });
    }
  };

  return (
    <div className="m-3">
      <div className="text-xl flex justify-between">
        <div className="text-left">
          <p className="max-sm:text-sm">
            Chat Details{" "}
            <span className="badge badge-md badge-secondary">Beta</span>
          </p>
          <div className="drawer z-[50] drawer-end">
            <input
              id="create-chat-drawer"
              type="checkbox"
              className="drawer-toggle"
            />
            <div className="drawer-side">
              <label
                htmlFor="create-chat-drawer"
                aria-label="close sidebar"
                className="drawer-overlay"
              ></label>
              <ul className="menu p-7 md:w-1/2 w-4/5 min-h-full bg-base-200 text-base-content">
                <li className="btn mx-auto">Create a new Chat</li>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label
                      htmlFor="chatTitle"
                      className="block text-xl font-medium "
                    >
                      Chat Title *
                    </label>
                    <input
                      type="text"
                      id="chatTitle"
                      name="chatTitle"
                      value={chatModalData.chatTitle}
                      onChange={handleChange}
                      className="h-7 text-lg p-2 mt-1 block w-full rounded-md"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="department"
                      className="block text-xl font-medium "
                    >
                      Department (For your convenience)
                    </label>
                    <input
                      type="text"
                      id="department"
                      name="department"
                      value={chatModalData.department}
                      onChange={handleChange}
                      placeholder="default"
                      className="h-7 text-lg p-4 mt-1 block w-full rounded-md"
                    />
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor="priority"
                      className="block text-xl font-medium "
                    >
                      Select chat priority
                    </label>
                    <select
                      onChange={handleChange}
                      id="priority"
                      className="mt-1 p-1 text-lg block w-1/2 rounded-md"
                    >
                      <option selected value={"low"}>
                        low
                      </option>
                      <option value={"high"}>high</option>
                      <option value={"medium"}>medium</option>
                    </select>
                  </div>

                  <div className="flex">
                    <button type="submit" className="btn btn-outline">
                      Submit
                    </button>
                    &nbsp;&nbsp;
                    <label
                      htmlFor="create-chat-drawer"
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
            htmlFor="create-chat-drawer"
            className="btn btn-sm max-md:text-xs"
          >
            Create New Chat
          </label>
        </div>
      </div>
      {children}
    </div>
  );
}
