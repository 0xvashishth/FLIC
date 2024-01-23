"use client";
import Link from "next/link";
import { useSearchParams, usePathname } from "next/navigation";
import { getLinkData } from "../linkRequestUtils";
import { useEffect, useState } from "react";

export default function Page() {
  const searchParams = useSearchParams();
  const [linkData, setLinkData] = useState({
    shortenedSuffix:""
  })
  const searchLinkId = searchParams.get("id");
  const pathname = usePathname();
  var Root_Url = process.env.NEXT_PUBLIC_ROOT_URL;
  var form_Url = `${Root_Url}` +  `l/` + `${linkData.shortenedSuffix}`


  useEffect(() => {
    async function getFormResponse(){
      setLinkData(await getLinkData(searchLinkId));
    }
    getFormResponse();
  }, []);

  return (
    <div className="rounded-lg my-3 ">
      <div className="my-3 flex">
        <h2 className="align-middle ml-3 mr-3 mt-3">Your Shortened URL</h2>
        <input className="input font-mono input-bordered w-1/2" defaultValue={`${Root_Url}` +  `l/` + `${linkData.shortenedSuffix}`} />
      </div>
    </div>
  );
}
