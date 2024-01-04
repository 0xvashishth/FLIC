"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
const ROOT_URL = process.env.NEXT_PUBLIC_SERVER_URL;
import { useRouter } from "next/navigation";
import { deleteAppClientCache } from "next/dist/server/lib/render-server";

const Logout = () => {
  const { push } = useRouter();
  useEffect(() => {
    localStorage.clear();
    // clear all other data handlers

    push("/");
  });

  return (
    <div className="hero mx-auto min-h-screen bg-base-100">
      <h1>Please Wait..</h1>
    </div>
  );
};

export default Logout;
