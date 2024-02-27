"use client"

// `app/dashboard/page.tsx` is the UI for the `/dashboard` URL
import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import {fetchData, deleteResponseData} from "./ResponseUtils"

export default function Page() {
  // const [formData, setFormData] = useState([
  //   {
  //     requestDate: "",
  //     _id: "",
  //     dynamicData: {
  //       email: ""
  //     }
  //   }

  // ]);
  // const searchParams = useSearchParams();
  // const searchFormId = searchParams.get("id");
  // // const pathname = usePathname();

  // useEffect(() => {
  //   async function getFormResponse(){
  //     setFormData(await fetchData(searchFormId));
  //   }
  //   getFormResponse();
  // }, []);

  return (
    <div className="overflow-x-auto text-center">
      Coming Soon 🚀
      {/* <table className="table table-md table-pin-rows table-pin-cols">
        <thead className="border-2">
          <tr>
            <th>Index</th>
            <td>Date</td>
            <td>Email</td>
            <td>More Details</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody className="border-2">
          {formData.map((data, key) => (
            <tr className="border-2" key={data._id}>
              <th>{key+1}</th>
              <td>{data.requestDate}</td>
              <td>
                <span className="badge badge-md badge-warning">
                  {data.dynamicData.email}
                </span>
              </td>
              <td>
                <a
                  className="btn btn-sm"
                  onClick={() =>
                    console.log("The Clicked Number Is " + data._id)
                  }
                >
                  Details
                </a>
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
                      <a href={`mailto:`+ data.dynamicData.email}>Reply</a>
                    </li>
                    <li>
                      <button onClick={async () => setFormData(await deleteResponseData(searchFormId, data._id))}>Delete</button>
                    </li>
                  </ul>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}
    </div>
  );
}
