"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Page() {
  const { push } = useRouter();

  const [preference, setPreference] = useState({
    linkEmailNotifications: false,
    formEmailNotifications: false,
    newslatterEmailNotification: false,
    carbonCopyEmail: "",
  });
  

//   useEffect(() => {
//     setPreference(JSON.parse(localStorage.getItem("user")!));
//   }, []);

const handleChange = (e: any) => {
    var { id, value } = e.target;
    console.log(id, value);
    if (id == "linkEmailNotifications" || id == "formEmailNofication" || id == "newslatterEmailNotification") {
      value = e.target.checked;
    }
    console.log(id, value);
    setPreference((prevPreference) => ({
      ...prevPreference,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Check if there is a previous change profile attempt in the last 10 minutes
    const previousChangeProfileAttempt = localStorage.getItem("userChangeProfileAttempt");
    if (previousChangeProfileAttempt) {
      const currentTime = Date.now();
      const timeDifference = currentTime - parseInt(previousChangeProfileAttempt, 10);

      // If less than 10 minutes have passed since the last attempt, show an error toast
      if (timeDifference < 10 * 60 * 1000) {
        toast.error(
          "Please wait for 10 minutes before attempting to change profile again."
        );
        return;
      }
    }

    const toastId = toast.loading("Sending data..");

    try {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `${process.env.NEXT_PUBLIC_TOKEN_TYPE} ${localStorage.getItem("userToken")}`
      }
      console.log("Sent ..", headers);
      const response = await axios.put(`${process.env.NEXT_PUBLIC_SERVER_URL}/user`, { preference }, {headers});
      console.log(response.data.message); // Assuming the server returns some data
      toast.success(response.data.message, {
        id: toastId,
      });

      // Update the user profile after updation
      localStorage.setItem("userChangeProfileAttempt", Date.now().toString());
      await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/me`, {headers}).then((response)=>{
        setPreference(response.data.user);
        localStorage.setItem("user", JSON.stringify(response.data.user));
      })
    } catch (error: any) {
      console.error("Error in updating profile:", error);
      toast.error(error.response.data.error, {
        id: toastId,
      });
    }
  };

  return (
    <div className="m-3">
      <div>
        <h1 className="text-xl">Preferences ⚙</h1>
      </div>
      <div className="my-5 overflow-x-auto w-5/6 max-xl:m-5 max-xl:w-auto mx-auto">
        <form onSubmit={handleSubmit}>
            <h2 className="my-3 mb-4 text-red-500">These Configuration will be havaing the higher priority 🔥</h2>
            <div className="form-control">
          <label className="label cursor-pointer" id="carbonCopyEmail">
            <span className="label-text">CC in your mail communication</span>
            <input
              type="text"
              value={preference.carbonCopyEmail}
              id="carbonCopyEmail"
              onChange={handleChange}
              className="input input-bordered"
              defaultChecked
            />
          </label>
        </div>
        <div className="form-control">
          <label className="label cursor-pointer" id="formEmailNotifications">
            <span className="label-text">Form Email Notification</span>
            <input
              type="checkbox"
              id="formEmailNotifications"
              className="toggle"
              checked={preference.formEmailNotifications}
              onClick={handleChange}
            />
          </label>
          </div>
          <div className="form-control">
          <label className="label cursor-pointer" id="linkEmailNotifications">
            <span className="label-text">Link Email Notification</span>
            <input
              type="checkbox"
              id="linkEmailNotifications"
              className="toggle"
              checked={preference.linkEmailNotifications}
              onClick={handleChange}
            />
          </label>
        </div>
        <div className="form-control">
          <label className="label cursor-pointer" id="newslatterEmailNotification">
            <span className="label-text">News Letter Email Notification</span>
            <input
              type="checkbox"
              id="newslatterEmailNotification"
              className="toggle"
              checked={preference.newslatterEmailNotification}
              onClick={handleChange}
            />
          </label>
        </div>

        <div className="my-7">
            <button className="btn btn-outline" type="submit">Change Preferences</button>
          </div>

        </form>
      </div>
    </div>
  );
}
