"use client"
import { useEffect } from "react";
import { useRouter } from "next/navigation";
const checkLoggedInUser = () => {
    const { push } = useRouter();

    useEffect(() => {
        if(!localStorage.getItem("user") || !localStorage.getItem("userToken")){
            push("/")
          }
    }, [])
};

export default checkLoggedInUser;
