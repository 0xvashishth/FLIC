import React from "react";
import {
  opun_black,
  opun_light,
  opun_medium,
} from "../assets/fonts/FontMaster";
import logo from "../assets/logos/flic-transperent-white.png";

const Login = () => {
  return (
    <div className="hero min-h-screen bg-base-100">
  <div className="hero-content flex-col">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold text-center">Login Now 🚀</h1>
      <p className="py-6 text-sys-yellow">You won't be able to login if your account is not verified. Reach out to us at hello@flic.tech for any quries 💁🏻‍♂️</p>
    </div>
    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <form className="card-body">
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
          <label className="label">
            <a href="/forgotPassword" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-outline">Login</button>
        </div>
        <label className="label">
            <a href="/signup" className="label-text-alt link link-hover">Not Registered? Signup Here 🔥</a>
        </label>
      </form>
    </div>
  </div>
</div>
  );
};

export default Login;
