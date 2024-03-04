"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Page() {
  const [preference, setPreference] = useState({
    emailNotifications: false,
  });

  useEffect(()=>{
    const toastId = toast.loading("Getting data..");
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `${
          process.env.NEXT_PUBLIC_TOKEN_TYPE
        } ${localStorage.getItem("userToken")}`,
      };
      axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/userdetails`, {
        headers
      }).then((response)=>{
        var data = response.data;
        toast.success(data.message, {
          id: toastId,
        });
        setPreference({emailNotifications: data.userDetails.emailNotifications});
      })
    } catch (error: any) {
      console.error("Error in getting profile:", error);
      toast.error(error.response.data.error, {
        id: toastId,
      });
    }
  }, [])

  const handleChange = (e: any) => {
    var { id, value } = e.target;
    if (id == "emailNotifications") {
      value = e.target.checked;
    }
    setPreference((prevPreference) => ({
      ...prevPreference,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const toastId = toast.loading("Sending data..");

    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `${
          process.env.NEXT_PUBLIC_TOKEN_TYPE
        } ${localStorage.getItem("userToken")}`,
      };
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/user/userdetails`,
        { emailNotifications: preference.emailNotifications },
        { headers }
      );
      toast.success(response.data.message, {
        id: toastId,
      });
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
          <h2 className="my-3 mb-4 text-red-500">
            These Configuration will be havaing the higher priority 🔥
          </h2>
          {/* <div className="form-control">
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
        </div> */}
          <div className="form-control">
            <label className="label cursor-pointer" id="emailNotifications">
              <span className="label-text">All Email Notification</span>
              <input
                type="checkbox"
                id="emailNotifications"
                className="toggle"
                checked={preference.emailNotifications}
                onClick={handleChange}
              />
            </label>
          </div>

          <div className="my-7">
            <button className="btn btn-outline" type="submit">
              Change Preferences
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
