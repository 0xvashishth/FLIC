"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Page() {
  const { push } = useRouter();

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    bio: "",
    githubProfile: "",
  });
  

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")!));
  }, []);

  const handleChange = (e: any) => {
    const { id, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [id]: value,
    }));
    console.log(user);
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
      const response = await axios.put(`${process.env.NEXT_PUBLIC_SERVER_URL}/user`, { user }, {headers});
      console.log(response.data.message); // Assuming the server returns some data
      toast.success(response.data.message, {
        id: toastId,
      });

      // Update the user profile after updation
      localStorage.setItem("userChangeProfileAttempt", Date.now().toString());
      await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/me`, {headers}).then((response)=>{
        setUser(response.data.user);
        localStorage.setItem("user", JSON.stringify(response.data.user));
      })
    } catch (error: any) {
      console.error("Error in updating profile:", error);
      toast.error(error.response.data.error, {
        id: toastId,
      });
    }
  };

  const handleDelete = async (e: any) => {
    e.preventDefault();
    if(window.confirm("Do you want to delete your account? Please Confirm!") == true){
      const toastId = toast.loading("Please wait..");
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `${process.env.NEXT_PUBLIC_TOKEN_TYPE} ${localStorage.getItem("userToken")}`
      }
      try {
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `${process.env.NEXT_PUBLIC_TOKEN_TYPE} ${localStorage.getItem("userToken")}`
        }
        console.log("Sent ..", headers);
        await axios.delete(`${process.env.NEXT_PUBLIC_SERVER_URL}/user`, {headers}).then(()=>{
          localStorage.clear();
          toast.error("Your account has been deleted!", {
            id: toastId,
            icon: "😣"
          });
          push("/");
        })
      } catch (error: any) {
        console.error("Error in updating profile:", error);
        toast.error(error.response.data.error, {
          id: toastId,
        });
      }
    }else{
      toast.success("Thank God", {icon: '☺'})
    }
    
  }

  return (
    <div className="m-3">
      <div>
        <h1 className="text-xl">Profile Settings ⚙</h1>
      </div>
      <div className="my-5 overflow-x-auto w-5/6 max-xl:m-5 max-xl:w-auto mx-auto">
        <form onSubmit={handleSubmit}>
          <div className="flex">
            <label className="m-1 form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">First Name</span>
              </div>
              <input
                type="text"
                id="firstName"
                className="input input-bordered w-full max-w-xs"
                value={user.firstName}
                onChange={handleChange}
              />
            </label>
            <label className="m-1 form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Last Name</span>
              </div>
              <input
                type="text"
                id="lastName"
                className="input input-bordered w-full max-w-xs"
                value={user.lastName}
                onChange={handleChange}
              />
            </label>
          </div>
          <div>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Bio</span>
              </div>
              <textarea
                id="bio"
                className="input input-bordered w-full max-w-xs"
                value={user.bio ? user.bio : ""}
                onChange={handleChange}
              />
              {/* <textarea /> */}
              <div className="label">
                <span className="label-text-alt text-gray-400">
                  You can write the whole description about you!
                </span>
              </div>
            </label>
          </div>
          <div>
            <label className="m-1 form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">GitHub Profile</span>
              </div>
              <input
                type="text"
                id="githubProfile"
                className="input input-bordered w-full max-w-xs"
                value={user.githubProfile ? user.githubProfile : ""}
                onChange={handleChange}
              />
              <div className="label">
                <span className="label-text-alt text-gray-400">
                  e.g. https://github.com/0xvashishth/
                </span>
              </div>
            </label>
          </div>
          <div className="my-7">
            <button className="btn btn-outline" type="submit">Change Profile</button>
          </div>
        </form>
      </div>
      <div className="my-3">
        <h1 className="text-xl text-red-600">Account Deletion 💀</h1>
        <div className="my-7 overflow-x-auto w-5/6 max-xl:m-5 max-xl:w-auto mx-auto">
          <button onClick={handleDelete} className="btn btn-outline text-red-600">Delete Account</button>
        </div>
      </div>
    </div>
  );
}
