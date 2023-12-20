import React from "react";
import {
  opun_black,
  opun_light,
  opun_medium,
} from "../assets/fonts/FontMaster";
import logo from "../assets/logos/flic-transperent-white.png";

const ForgotPassword = () => {
  return (
    <div className="hero min-h-screen bg-base-100">
  <div className="hero-content flex-col">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold text-center">Forgot Password 🚀</h1>
      <p className="py-6 text-sys-yellow">You won't be able to forgot your password if your account is not verified. Reach out to us at hello@flic.tech for any quries 💁🏻‍♂️</p>
    </div>
    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <form className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" placeholder="email" className="input input-bordered" required />
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-outline">Submit</button>
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
