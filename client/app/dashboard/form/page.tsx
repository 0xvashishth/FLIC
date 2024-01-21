"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getUserForms } from "./formRequestUtils";
// `app/dashboard/page.tsx` is the UI htmlFor the `/dashboard` URL
export default function Page() {
  // const { push } = useRouter();
  // const [formModalData, setFormModalData] = useState({
  //   "formTitle": "",
  //   "redirectUrl": ""
  // });
  const [formData, setFormData] = useState([
    {
      _id: "",
      formTitle: "",
      isEnabled: "",
      requestCount: "",
    },
  ]);

  useEffect(() => {
    (async () => {
      setFormData(await getUserForms());
    })();
  }, []);

  // const handleChange = (e: any) => {
  //   const { id, value } = e.target;
  //   setFormData((prevUser) => ({
  //     ...prevUser,
  //     [id]: value,
  //   }));
  //   console.log(formData);
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
  //       { formData },
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
  //         setFormData(response.data.user);
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
              <td>Form Name</td>
              <td>Status</td>
              <td>Response Count</td>
              <td>More Details</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody className="border-2">
            {formData.map((data, key) => (
              <tr className="border-2" key={key}>
                <th>{key + 1}</th>
                <td className="">{data.formTitle}</td>
                <td>
                  {data.isEnabled ? (
                    <span className="badge badge-md badge-warning">Active</span>
                  ) : (
                    <span className="badge badge-md badge-secondary">
                      Inactive
                    </span>
                  )}
                </td>
                <td>
                  <span className="badge badge-md badge-warning">
                    {data.requestCount}
                  </span>
                </td>
                <td>
                  <Link
                    className="btn btn-sm"
                    href={"form/details?id=" + data._id}
                  >
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
                        <Link href={"form/details/settings?id=" + data._id}>
                          Edit
                        </Link>
                      </li>
                      <li>
                        <Link href={"form/details/settings?id=" + data._id}>
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
