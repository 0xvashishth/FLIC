"use client"
// `app/dashboard/page.tsx` is the UI for the `/dashboard` URL
export default function Page() {
    var formData = [
        {
          Id: 1,
          Date: "12-10-2012",
          Email: "vashishth@gmail.com",
          Response_Count: "1054",
        },
        {
          Id: 2,
          Date: "12-08-1012",
          Email: "vasu@gmail.com",
          Response_Count: "104",
        },
        {
          Id: 3,
          Date: "12-08-1012",
          Email: "Active@gmail.com",
          Response_Count: "14",
        },
      ];

    return (
        <div className="overflow-x-auto my-5">
        <table className="table table-md table-pin-rows table-pin-cols">
          <thead className="border-2">
            <tr>
              <th></th>
              <td>Date</td>
              <td>Email</td>
              <td>More Details</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody className="border-2">
            {formData.map((data) => (
              <tr className="border-2" key={data.Id}>
                <th>{data.Id}</th>
                <td>{data.Date}</td>
                <td>
                    <span className="badge badge-md badge-warning">
                      {data.Email}
                    </span>
                  
                </td>
                <td>
                  <a
                    className="btn btn-sm"
                    onClick={() =>
                      console.log("The Clicked Number Is " + data.Id)
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
                        <a>Reply</a>
                      </li>
                      <li>
                        <a>Delete</a>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
        )
}