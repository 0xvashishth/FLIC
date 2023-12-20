import React from "react";
import {
  opun_black,
  opun_light,
  opun_medium,
} from "../assets/fonts/FontMaster";
import logo from "../assets/logos/flic-transperent-white.png";

const Signup = () => {
  return (
    <div className="hero min-h-screen bg-base-100">
  <div className="hero-content flex-col">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold text-center">Signup Now 🚀</h1>
      <p className="py-6 text-sys-yellow">Once Signup has been done, checkout your mail to verify your account. Reach out to us at hello@flic.tech for any quries 💁🏻‍♂️</p>
    </div>
    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <form className="card-body">
      <div className="form-control">
          <label className="label">
            <span className="label-text">Full Name</span>
          </label>
          <input type="name" placeholder="full name" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" placeholder="email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" placeholder="password" className="input input-bordered" required />
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-outline">Register</button>
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
