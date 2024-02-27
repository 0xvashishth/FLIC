"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import Editor from "@monaco-editor/react";
import { getChatData } from "../chatUtils";

export default function Page({data}: any) {
  const searchParams = useSearchParams();
  const [chatData, setChatData] = useState({
    chatTitle: "",
    _id: "",
  });
  const searchChatId = searchParams.get("id");
  useEffect(() => {
    async function getFormResponse() {
      setChatData(await getChatData(searchChatId));
    }
    getFormResponse();
  }, []);

  return (
    <div className="rounded-lg my-3 ">
      <div className="my-3 flex">
        <h2 className="align-middle ml-3 mr-3 mt-3">Your Chat's endpoint</h2>
        <input className="input font-mono input-bordered w-1/2" defaultValue={chatData._id} />
      </div>
    </div>
  );
}
