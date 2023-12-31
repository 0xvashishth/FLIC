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
    <div className="m-3">
      <div className="text-xl flex justify-between">
        <div className="text-left">
          <h1>Form Details & Analytics 🔍</h1>
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
              <ul className="menu p-7 w-1/2 min-h-full bg-base-200 text-base-content">
                <li className="btn mx-auto text-2xl">
                  Create a new Form
                  </li>
                <form>
                  <div className="mb-4">
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium "
                    >
                      Username
                    </label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      className="form-input mt-1 block w-full rounded-md"
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium "
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      className="form-input mt-1 block w-full rounded-md"
                    />
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium "
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="form-input mt-1 block w-full rounded-md"
                    />
                  </div>

                  <div className="flex">
                  <button
                    type="submit"
                    className="btn btn-outline"
                  >
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
          <label htmlFor="create-form-drawer" className="btn btn-sm">
            Create New Form
          </label>
          {/* Drawer For Creating A Form */}
          
        </div>
      </div>
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
                <td>{data.Name}</td>
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
                  <a className="btn btn-sm">Details</a>
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
                        <a>Edit</a>
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
    </div>
  );
}
