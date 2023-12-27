import React from "react";
import {MenuHorizontal, MenuVertical} from "./clientUtils/NavLinks";
import logo from "../assets/logos/flic-transperent-white.png";
import SwitchTheme from "./clientUtils/SwitchTheme";
import SwitchLogo from "./clientUtils/SwitchLogo";

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
          <MenuVertical />
        </div>
        <div className="w-20 rounded-full">
          <SwitchLogo />
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <MenuHorizontal/>
      </div>

      <div className="navbar-end">
      
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar m-1"
          >
            <div className="w-10 rounded-full">
              <img
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
