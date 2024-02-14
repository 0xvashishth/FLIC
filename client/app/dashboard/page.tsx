"use client"

import SwitchLogo from "@/app/components/clientUtils/SwitchLogo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Page() {

  const [dashboardData, setDashboardData] = useState({
    latestForm: "loading..",
    latestChat: "loading..",
    latestLink: "loading..",
  })

  const [flag, removeFlag] = useState(true);

  useEffect(()=>{
    var getData = async () => {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `${
          process.env.NEXT_PUBLIC_TOKEN_TYPE
        } ${localStorage.getItem("userToken")}`,
      };
      await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/user/mydashboard`,
        { headers }
      ).then(async (res)=>{
        console.log(res)
        setDashboardData(res.data);
        removeFlag(false);
      })
    }
    getData()
  })


  return (
    <div className="m-3">
      <div className="text-center">
        <div className="text-left">
          <div className="text-center text-2xl m-2">FLIC Stats</div>
        </div>
        <ul className="glass m-3 menu menu-vertical md:menu-horizontal bg-base-200 rounded-box">
          <li className="">
            <div className="">
              <a className="text-base">Total Forms</a>
              <span className="badge badge-md badge-warning">{flag? "loading.." : dashboardData.latestForm.length }</span>
            </div>
          </li>
          <li className="">
            <div className="">
              <a className="text-base">Total Links</a>
              <span className="badge badge-md badge-secondary">{flag? "loading.." : dashboardData.latestLink.length }</span>
            </div>
          </li>
          <li className="">
            <div className="">
              <a className="text-base">Total Chats</a>
              <span className="badge badge-md badge-info">{flag? "loading.." : dashboardData.latestChat.length }</span>
            </div>
          </li>
        </ul>
      </div>
      <div className="m-1 ">
        <div className="menu mx-auto">
          <ul className="menu bg-base-200 rounded-box">
            <li className="menu-title">Recently Opened 🕥</li>
            <li>
              <Link href={flag? "#" : dashboardData.latestForm[0] ? `/dashboard/form/details?id=${dashboardData.latestForm[0]._id}` : "#"}>
                <span className="badge badge-warning">Form</span>{flag? "loading.." : dashboardData.latestForm[0] ? `Created Form: ${dashboardData.latestForm[0].formTitle}` : "No Forms Created" }
              </Link>
            </li>
            <li>
            <Link href={flag? "#" : dashboardData.latestChat[0] ? `/dashboard/chat/details?id=${dashboardData.latestChat[0]._id}` : "#"}>
                <span className="badge badge-info">Chat</span>{flag? "loading.." : dashboardData.latestChat[0] ? `Created Chat: ${dashboardData.latestChat[0].department}` : "No Chats Created" }
              </Link>
            </li>
            <li>
            <Link href={flag? "#" : dashboardData.latestLink[0] ? `/dashboard/link/details?id=${dashboardData.latestLink[0]._id}` : "#"}>
                <span className="badge badge-secondary">Link</span>{flag? "loading.." : dashboardData.latestLink[0] ? `Created Link: ${dashboardData.latestLink[0].originalURL}` : "No Links Created" }
              </Link>
            </li>
          </ul>
        </div>
        <div className="menu mx-auto">
          <ul className="menu bg-base-200 rounded-box">
            <li className="menu-title">Announcements From Flic 📢</li>
            <li>
              <a><span className="badge badge-accent">Admin</span>
                Lorem ipsum
                dolor sit amet consectetur adipisicing elit. Ipsa totam quo
                reprehenderit cumque quis molestiae, voluptatum vero nisi omnis
                nostrum debitis minus voluptas molestias quibusdam! Veniam
                nostrum dicta laudantium libero.{" "}
              </a>
            </li>
            <li>
              <a><span className="badge badge-accent">Admin</span>
                Lorem ipsum
                dolor sit amet consectetur adipisicing elit. Tempore doloribus
                laudantium excepturi totam dignissimos nostrum a tempora
                expedita error.
              </a>
            </li>
            {/* <li>
              <a>
                <span className="badge badge-info">Chat</span>Item 3
              </a>
            </li> */}
          </ul>
        </div>
      </div>
    </div>
  );
}
