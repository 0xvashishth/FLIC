"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
const ROOT_URL = process.env.NEXT_PUBLIC_SERVER_URL;
import { useRouter } from "next/navigation";

const Signup = () => {
  const { push } = useRouter();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    password: "",
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

    // Check if there is a previous signup attempt in the last 10 minutes
    const previousSignupAttempt = localStorage.getItem("userSignupAttempt");
    if (previousSignupAttempt) {
      const currentTime = Date.now();
      const timeDifference = currentTime - parseInt(previousSignupAttempt, 10);

      // If less than 10 minutes have passed since the last attempt, show an error toast
      if (timeDifference < 10 * 60 * 1000) {
        toast.error(
          "Please wait for 10 minutes before attempting to sign up again."
        );
        return;
      }
    }

    const toastId = toast.loading("Sending data..");

    try {
      const response = await axios.post(`${ROOT_URL}/user/signup`, { user });
      console.log(response.data.message); // Assuming the server returns some data
      toast.success(response.data.message, {
        id: toastId,
      });

      // Update the timestamp for the latest signup attempt
      localStorage.setItem("userSignupAttempt", Date.now().toString());
      setUser({
        firstName: "",
        lastName: "",
        password: "", 
        email: "",
      })
    } catch (error: any) {
      console.error("Error signing up:", error);
      toast.error(error.response.data.error, {
        id: toastId,
      });
    }
  };

  return (
    <div className="hero min-h-screen bg-base-100">
      <div className="hero-content flex-col">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold text-center">Signup Now 🚀</h1>
          <p className="py-6 text-sys-yellow">
            Once Signup has been done, checkout your mail to verify your
            account. Reach out to us at support@flic.tech for any quries 💁🏻‍♂️
          </p>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form className="card-body" onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label" htmlFor="firstName">
                <span className="label-text">First Name</span>
              </label>
              <input
                type="name"
                id="firstName"
                value={user.firstName}
                onChange={handleChange}
                placeholder="first name"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label" htmlFor="lastName">
                <span className="label-text">Last Name</span>
              </label>
              <input
                type="name"
                value={user.lastName}
                onChange={handleChange}
                id="lastName"
                placeholder="last name"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label" htmlFor="email">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                value={user.email}
                onChange={handleChange}
                id="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label" htmlFor="password">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                value={user.password}
                onChange={handleChange}
                id="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-outline">
                Register
              </button>
            </div>
            <label className="label">
              <a href="/login" className="label-text-alt link link-hover">
                Already Registered? Login Here 🔥
              </a>
            </label>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
