"use client";
import React, { useEffect, useState } from "react";
import {
  // opun_black,
  // opun_light,
  opun_medium,
} from "../assets/fonts/FontMaster";
// import logo from "../assets/logos/flic-transperent-white.png";
import { MDXRemote } from 'next-mdx-remote/rsc'

const HomePage = () => {
  const [user, setUser] = useState({
    email: "",
  });

  const markdown = `<h1 className='text-3xl'> Welcome to my MDX page! </h1>
 
  This is some **bold** and _italics_ text.
   
  This is a list in markdown:
   
  - One
  - Two
  - Three
   
  Checkout my React component:
   `

  useEffect(() => {
    var userItem = JSON.parse(localStorage.getItem("user")!);
    setUser(userItem!);
  }, []);

  return (
    <div className="z-10">
      <div className="hero pt-3 bg-base-100">
        <div className="hero-content text-center">
          <div className="max-w-xl">
            <h1 className="text-4xl font-bold">Form Link Chat</h1>
            
            <p className="py-8">
              Providing efficient solution for creating a short URL, Serverless
              Form to operate Form without hosting server and Chat support with
              complete dashboard 🎉
            </p>
          </div>
        </div>
      </div>
      <div className="m-2">
        <div className="mockup-code max-w-md mx-auto">
          <pre
            data-prefix="$"
            className={`${opun_medium.variable} font-opun-medium`}
          >
            <code className={`${opun_medium.variable} font-opun-medium`}>
              Deploy Serverless Forms 🥳
            </code>
          </pre>
          <pre
            data-prefix="$"
            className={`${opun_medium.variable} font-opun-medium`}
          >
            <code className={`${opun_medium.variable} font-opun-medium`}>
              Shorten Unlimited Links 🔥
            </code>
          </pre>
          <pre
            data-prefix="$"
            className={`${opun_medium.variable} font-opun-medium`}
          >
            <code className={`${opun_medium.variable} font-opun-medium`}>
              Chat Support To Your Website 👨🏻‍🚀
            </code>
          </pre>
        </div>
      </div>
      <div className="text-center p-9">
        {!user ? (
          <a href="/signup" className="btn btn-outline">
            Get Started 🚀
          </a>
        ) : (
          <a href="/dashboard" className="btn btn-outline">
            Dashboard 🚀
          </a>
        )}
      </div>
    </div>
  );
};

export default HomePage;
