"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
// import { useRouter } from "next/navigation";
import { useRouter } from "next/navigation";
// import Link from "next/link";
// import { getUserForms } from "./formRequestUtils";
// import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  // const { push } = useRouter();
  // const pathname = usePathname();

  const [formModalData, setFormModalData] = useState({
    formTitle: "",
    redirectUrl: "",
    customMessage: "",
  });

  const handleChange = (e: any) => {
    const { id, value } = e.target;
    setFormModalData((prevFormModalData) => ({
      ...prevFormModalData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // // Check if there is a previous change profile attempt in the last 10 minutes
    // const previousChangeProfileAttempt = localStorage.getItem(
    //   "userChangeProfileAttempt"
    // );
    // if (previousChangeProfileAttempt) {
    //   const currentTime = Date.now();
    //   const timeDifference =
    //     currentTime - parseInt(previousChangeProfileAttempt, 10);

    //   // If less than 10 minutes have passed since the last attempt, show an error toast
    //   if (timeDifference < 10 * 60 * 1000) {
    //     toast.error(
    //       "Please wait for 10 minutes before attempting to change profile again."
    //     );
    //     return;
    //   }
    // }

    const toastId = toast.loading("Sending data..");

    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `${
          process.env.NEXT_PUBLIC_TOKEN_TYPE
        } ${localStorage.getItem("userToken")}`,
      };
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/form`,
        { form: formModalData },
        { headers }
      );
      console.log(response.data.message); // Assuming the server returns some data
      toast.success(response.data.message, {
        id: toastId,
      });
      localStorage.setItem("FormNewCreatedPing", "Yes");
      location.reload();
    } catch (error: any) {
      console.error("Error in updating profile:", error);
      toast.error(error.response.data.error, {
        id: toastId,
      });
    }
  };

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
                <li className="btn mx-auto">Create a new Form</li>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label
                      htmlFor="formTitle"
                      className="block text-xl font-medium "
                    >
                      Form Title *
                    </label>
                    <input
                      type="text"
                      id="formTitle"
                      name="formTitle"
                      value={formModalData.formTitle}
                      onChange={handleChange}
                      className="h-7 text-lg p-2 mt-1 block w-full rounded-md"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="redirectUrl"
                      className="block text-xl font-medium "
                    >
                      Redirect URL *
                    </label>
                    <input
                      type="text"
                      id="redirectUrl"
                      name="redirectUrl"
                      value={formModalData.redirectUrl}
                      onChange={handleChange}
                      className="h-7 text-lg p-2 mt-1 block w-full rounded-md"
                      required
                    />
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor="customMessage"
                      className="block text-sm font-medium "
                    >
                      Custom Message
                    </label>
                    <textarea
                      id="customMessage"
                      name="customMessage"
                      value={formModalData.customMessage}
                      onChange={handleChange}
                      placeholder="This message will be displayed to user when user submits the form"
                      className="p-2 mt-1 block w-full rounded-md"
                    />
                  </div>

                  <div className="flex">
                    <button type="submit" className="btn btn-outline" >
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
          <label
            htmlFor="create-form-drawer"
            className="btn btn-sm max-md:text-xs"
          >
            Create New Form
          </label>
          {/* Drawer For Creating A Form */}
        </div>
      </div>
      {children}
    </div>
  );
}
