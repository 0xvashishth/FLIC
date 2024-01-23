"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getUserLinks } from "./linkRequestUtils";
// `app/dashboard/page.tsx` is the UI htmlFor the `/dashboard` URL
export default function Page() {
  // const { push } = useRouter();
  // const [formModalData, setFormModalData] = useState({
  //   "formTitle": "",
  //   "redirectUrl": ""
  // });
  const [linkData, setLinkData] = useState([
    {
      _id: "",
      title: "",
      clickCount: "",
      isActive: "",
      shortenedSuffix: ""
    },
  ]);

  useEffect(() => {
    (async () => {
      setLinkData(await getUserLinks());
    })();
  }, []);

  // const handleChange = (e: any) => {
  //   const { id, value } = e.target;
  //   setLinkData((prevUser) => ({
  //     ...prevUser,
  //     [id]: value,
  //   }));
  //   console.log(linkData);
  // };

  // const handleSubmit = async (e: any) => {
  //   e.preventDefault();

  //   // Check if there is a previous change profile attempt in the last 10 minutes
  //   const previousChangeProfileAttempt = localStorage.getItem(
  //     "userChangeProfileAttempt"
  //   );
  //   if (previousChangeProfileAttempt) {
  //     const currentTime = Date.now();
  //     const timeDifference =
  //       currentTime - parseInt(previousChangeProfileAttempt, 10);

  //     // If less than 10 minutes have passed since the last attempt, show an error toast
  //     if (timeDifference < 10 * 60 * 1000) {
  //       toast.error(
  //         "Please wait for 10 minutes before attempting to change profile again."
  //       );
  //       return;
  //     }
  //   }

  //   const toastId = toast.loading("Sending data..");

  //   try {
  //     const headers = {
  //       "Content-Type": "application/json",
  //       Authorization: `${
  //         process.env.NEXT_PUBLIC_TOKEN_TYPE
  //       } ${localStorage.getItem("userToken")}`,
  //     };
  //     console.log("Sent ..", headers);
  //     const response = await axios.put(
  //       `${process.env.NEXT_PUBLIC_SERVER_URL}/user`,
  //       { linkData },
  //       { headers }
  //     );
  //     console.log(response.data.message); // Assuming the server returns some data
  //     toast.success(response.data.message, {
  //       id: toastId,
  //     });

  //     // Update the user profile after updation
  //     localStorage.setItem("userChangeProfileAttempt", Date.now().toString());
  //     await axios
  //       .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/me`, { headers })
  //       .then((response) => {
  //         setLinkData(response.data.user);
  //         localStorage.setItem("user", JSON.stringify(response.data.user));
  //       });
  //   } catch (error: any) {
  //     console.error("Error in updating profile:", error);
  //     toast.error(error.response.data.error, {
  //       id: toastId,
  //     });
  //   }
  // };

  return (
    <>
      <div className="overflow-x-auto my-5">
        <table className="table table-md table-pin-rows table-pin-cols">
          <thead className="border-2">
            <tr>
              <th></th>
              <td>Link Name</td>
              <td>Status</td>
              <td>Click Count</td>
              <td>Shortened URL</td>
              <td>Details</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody className="border-2">
            {linkData.map((data, key) => (
              <tr className="border-2" key={key}>
                <th>{key + 1}</th>
                <td className="">{data.title}</td>
                <td>
                {data.isActive ? (
                    <span className="badge badge-md badge-warning">Active</span>
                  ) : (
                    <span className="badge badge-md badge-secondary">
                      Inactive
                    </span>
                  )}
                </td>
                <td>
                  <span className="badge badge-md badge-warning">
                    {data.clickCount}
                  </span>
                </td>
                <td>
                  <span>
                  {`${process.env["NEXT_PUBLIC_ROOT_URL"]}l/${data.shortenedSuffix}`}
                  </span>
                </td>
                <td>
                <Link className="btn btn-sm m-1" href={"link/details?id=" + data._id}>
                          Details
                </Link>
                </td>
                <td>
                  <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-sm m-1">
                      Action
                    </div>
                    <ul
                      tabIndex={0}
                      className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box"
                    >
                      <li>
                        <Link href={"link/details/settings?id=" + data._id}>
                          Edit
                        </Link>
                      </li>
                      <li>
                        <Link href={"link/details/settings?id=" + data._id}>
                          Delete
                        </Link>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
