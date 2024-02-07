"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
const ROOT_URL = process.env.NEXT_PUBLIC_SERVER_URL;
import { useRouter } from "next/navigation";

const ForgotPassword = () => {
  const { push } = useRouter();
  const [user, setUser] = useState({
    email: "",
  });
  useEffect(() => {
    if (localStorage.getItem("user") && localStorage.getItem("userToken")) {
      push("/dashboard");
    }
  });
  const handleChange = (e: any) => {
    const { id, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Check if there is a previous forgot password attempt in the last 10 minutes
    const previousForgotPasswordAttempt = localStorage.getItem("userForgotPasswordAttempt");
    if (previousForgotPasswordAttempt) {
      const currentTime = Date.now();
      const timeDifference = currentTime - parseInt(previousForgotPasswordAttempt, 10);

      // If less than 10 minutes have passed since the last attempt, show an error toast
      if (timeDifference < 10 * 60 * 1000) {
        toast.error(
          "Please wait for 10 minutes before attempting to forgot password in again."
        );
        return;
      }
    }

    const toastId = toast.loading("Sending data..");

    try {
      const response = await axios.post(`${ROOT_URL}/user/forgot_password`, { user });
      console.log(response.data.message); // Assuming the server returns some data
      toast.success(response.data.message, {
        id: toastId,
      });
      localStorage.setItem("userForgotPasswordAttempt", Date.now().toString());
      setUser({
        email: "",
      })
      // push("/dashboard");
    } catch (error: any) {
      console.error("Error Forgot Password in:", error);
      toast.error(error.response.data.error, {
        id: toastId,
      });
    }
  };

  return (
    <div className="hero min-h-screen bg-base-100">
  <div className="hero-content flex-col">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold text-center">Forgot Password 🚀</h1>
      <p className="py-6 text-sys-yellow">You won't be able to forgot your password if your account is not verified. Reach out to us at support@flic.tech for any quries 💁🏻‍♂️</p>
    </div>
    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <form className="card-body" onSubmit={handleSubmit}>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" value={user.email}
                onChange={handleChange}
                id="email" placeholder="email" className="input input-bordered" required />
        </div>
        <div className="form-control mt-6">
          <button type="submit" className="btn btn-outline">Submit</button>
        </div>
        <label className="label">
            <a href="/login" className="label-text-alt link link-hover">Already Know Your Password? Login Here 🔥</a>
        </label>
      </form>
    </div>
  </div>
</div>
  );
};

export default ForgotPassword;
