import React from "react";
import {
  opun_black,
  opun_light,
  opun_medium,
} from "../assets/fonts/FontMaster";
import logo from "../assets/logos/flic-transperent-white.png";

const NavBar = () => {
  return (
    <div className="m-1">
      <div className="navbar rounded-2xl bg-base-200">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a>Home 🏠</a>
            </li>
            <li>
              <a>Services</a>
              <ul className="p-2">
                <li>
                  <a>Form</a>
                </li>
                <li>
                  <a>Link</a>
                </li>
                <li>
                  <a>
                    Chat <span className="badge badge-primary">New</span>
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <a>About us</a>
            </li>
          </ul>
        </div>
        <div className="w-20 rounded-full">
          <Image alt="Tailwind CSS Navbar component" src={logo.src} />
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a className={`${opun_black.variable} font-opun-black`}>Home</a>
          </li>
          <li>
            <details>
              <summary>Services</summary>
              <ul className="p-2 z-50">
                <li>
                  <a>Form</a>
                </li>
                <li>
                  <a>Link</a>
                </li>
                <li>
                  <a>
                    Chat <span className="badge bg-sys-yellow">New</span>
                  </a>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <a>Abous us</a>
          </li>
        </ul>
      </div>

      <div className="navbar-end">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <Image
                alt="Tailwind CSS Navbar component"
                src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge badge-primary">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
        <a href="/login" className="btn btn-outline">Login</a>
      </div>
    </div>
    </div>
  );
};

export default NavBar;
