// `app/dashboard/page.tsx` is the UI for the `/dashboard` URL
export default function Page() {
  return (
    <div className="overflow-x-auto my-5 w-1/3 max-xl:m-5 max-xl:w-auto mx-auto">
        <div className="form-control">
        <label className="label cursor-pointer">
          <span className="label-text">Change Name</span>
          <input type="text" className="input input-bordered" defaultChecked />
        </label>
      </div>
      <div className="form-control">
        <label className="label cursor-pointer">
          <span className="label-text">Change Email</span>
          <input type="email" className="input input-bordered" defaultChecked />
        </label>
      </div>
      <div className="text-center">
        <input type="submit" className="m-3 btn btn-sm btn-outline" value={"Save Changes"} />
      </div>
      <div className="form-control">
        <label className="label cursor-pointer">
          <span className="label-text">Form Enable</span>
          <input type="checkbox" className="toggle" defaultChecked />
        </label>
      </div>
      <div className="form-control">
        <label className="label cursor-pointer">
          <span className="label-text">Email Notification</span>
          <input type="checkbox" className="toggle" defaultChecked />
        </label>
      </div>
      <div className="form-control">
        <label className="label cursor-pointer">
          <span className="label-text">reCAPTCHA</span>
          <input type="checkbox" className="toggle" defaultChecked />
        </label>
      </div>
    </div>
  );
}
