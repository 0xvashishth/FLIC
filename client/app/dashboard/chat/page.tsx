"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getUserChats } from "./chatUtils";
// `app/dashboard/page.tsx` is the UI htmlFor the `/dashboard` URL
export default function Page() {
  // const { push } = useRouter();
  // const [formModalData, setFormModalData] = useState({
  //   "chatTitle": "",
  //   "redirectUrl": ""
  // });
  const [chatData, setChatData] = useState([
    {
      _id: "",
      chatTitle: "",
      isEnabled: "",
      sessionCount: "",
      department: "",
      priority: "",
    },
  ]);

  useEffect(() => {
    (async () => {
      setChatData(await getUserChats());
    })();
  }, []);

  return (
    <>
      <div className="overflow-x-auto my-5">
        <table className="table table-md table-pin-rows table-pin-cols">
          <thead className="border-2">
            <tr>
              <th></th>
              <td>Chat Name</td>
              <td>Status</td>
              <td>Session Count</td>
              <td>Department</td>
              <td>Priority</td>
              <td>More Details</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody className="border-2">
            {chatData.map((data, key) => (
              <tr className="border-2" key={key}>
                <th>{key + 1}</th>
                <td className="">{data.chatTitle}</td>
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
                    {data.sessionCount}
                  </span>
                </td>
                <td>
                  <span className="badge badge-md badge-warning">
                    {data.department}
                  </span>
                </td>
                <td>
                  <span className="badge badge-md badge-warning">
                    {data.priority}
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
