"use client"
import React, {useEffect, useState} from "react";
import {
  opun_black,
  opun_light,
  opun_medium,
} from "../assets/fonts/FontMaster";
import logo from "../assets/logos/flic-transperent-white.png";
import axios from 'axios';
import toast from "react-hot-toast";
const ROOT_URL = process.env.NEXT_PUBLIC_SERVER_URL

const Signup = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    password: "",
    email: ""
    });
    const handleChange = (e: any) => {
      const { id, value } = e.target;
      setUser((prevUser) => ({
        ...prevUser,
        [id]: value
      }));
    };
  
    const handleSubmit = async (e: any) => {
      e.preventDefault();
  
      // You can perform any necessary actions here, such as sending data to the server
  
      try {
        const response = await axios.post(`${ROOT_URL}/user/signup`, user);
        console.log(response.data.message); // Assuming the server returns some data
        toast.success(response.data.message);
      } catch (error: any) {
        console.error("Error signing up:", error);
        toast.error(error.message);
      }
    };

  return (
    <div className="hero min-h-screen bg-base-100">
  <div className="hero-content flex-col">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold text-center">Signup Now 🚀</h1>
      <p className="py-6 text-sys-yellow">Once Signup has been done, checkout your mail to verify your account. Reach out to us at hello@flic.tech for any quries 💁🏻‍♂️</p>
    </div>
    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <form className="card-body" onSubmit={handleSubmit}>
      <div className="form-control">
          <label className="label" htmlFor="firstName">
            <span className="label-text">First Name</span>
          </label>
          <input type="name" id="firstName" value={user.firstName}
          onChange={handleChange} placeholder="first name" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label" htmlFor="lastName">
            <span className="label-text">Last Name</span>
          </label>
          <input type="name" value={user.lastName}
          onChange={handleChange} id="lastName" placeholder="last name" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label" htmlFor="email">
            <span className="label-text">Email</span>
          </label>
          <input type="email" value={user.email}
          onChange={handleChange} id="email" placeholder="email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label" htmlFor="password">
            <span className="label-text">Password</span>
          </label>
          <input type="password" value={user.password}
          onChange={handleChange} id="password" placeholder="password" className="input input-bordered" required />
        </div>
        <div className="form-control mt-6">
          <button type="submit" className="btn btn-outline">Register</button>
        </div>
        <label className="label">
            <a href="/login" className="label-text-alt link link-hover">Already Registered? Login Here 🔥</a>
        </label>
      </form>
    </div>
  </div>
</div>
  );
};

export default Signup;
