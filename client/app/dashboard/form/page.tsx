import Link from "next/link";

// `app/dashboard/page.tsx` is the UI htmlFor the `/dashboard` URL
export default function Page() {
  var formData = [
    {
      Id: 1,
      Name: "My Form",
      Status: "Active",
      Response_Count: "1054",
    },
    {
      Id: 2,
      Name: "New Form",
      Status: "Disabled",
      Response_Count: "104",
    },
    {
      Id: 3,
      Name: "Vashishth Form",
      Status: "Active",
      Response_Count: "14",
    },
  ];
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
            {formData.map((data) => (
              <tr className="border-2" key={data.Id}>
                <th>{data.Id}</th>
                <td className="">{data.Name}</td>
                <td>
                  {data.Status == "Active" ? (
                    <span className="badge badge-md badge-warning">
                      {data.Status}
                    </span>
                  ) : (
                    <span className="badge badge-md badge-secondary">
                      {data.Status}
                    </span>
                  )}
                </td>
                <td>
                  <span className="badge badge-md badge-warning">
                    {data.Response_Count}
                  </span>
                </td>
                <td>
                  <Link className="btn btn-sm" href={"form/details?id="+data.Id}>Details</Link>
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
                        <Link href={"form/details/settings?id="+data.Id}>Edit</Link>
                      </li>
                      <li>
                        <Link href={"form/details/settings?id="+data.Id}>Delete</Link>
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
