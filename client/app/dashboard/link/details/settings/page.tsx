"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useSearchParams, usePathname } from "next/navigation";
import { getLinkData, updateLinkData } from "../../linkRequestUtils";

export default function Page() {
  const searchParams = useSearchParams();
  const searchLinkId = searchParams.get("id");
  const { push } = useRouter();
  const [link, setLink] = useState({
    title: "",
    originalURL: "",
    shortenedSuffix: "",
    isActive: true,
    // isEmailNotification: true,
  });

  useEffect(() => {
    async function getFormResponse() {
      setLink(await getLinkData(searchLinkId));
    }
    getFormResponse();
  }, []);

  const handleChange = (e: any) => {
    var { id, value } = e.target;
    console.log(id, value);
    if (id == "isActive") {
      value = e.target.checked;
    }
    console.log(id, value);
    setLink((prevLink) => ({
      ...prevLink,
      [id]: value,
    }));
    console.log(link);
  };

  //   useEffect(() => {
  //     async function getFormData(){
  //       const toastId = toast.loading("Getting link data..");
  //       try {
  //         const headers = {
  //           'Content-Type': 'application/json',
  //           'Authorization': `${process.env.NEXT_PUBLIC_TOKEN_TYPE} ${localStorage.getItem("userToken")}`
  //         }
  //         console.log("Sent ..", headers);
  //         const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/link/${searchLinkId}`, {headers});
  //         toast.success(response.data.message, {
  //           id: toastId,
  //         });
  //         setLink(response.data.link)
  //       } catch (error: any) {
  //         console.error("Error in getting link data:", error);
  //         toast.error(error.response.data.error, {
  //           id: toastId,
  //         });
  //       }

  //     }
  //     getFormData();
  //   }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    var linkObj = await updateLinkData(searchLinkId, link);
    if (linkObj) {
      setLink(linkObj);
    } else {
    //   window.alert("Something went wrong!");
    }
  };

  const handleDelete = async (e: any) => {
    e.preventDefault();
    if (
      window.confirm("Do you want to delete this link? Please Confirm!") == true
    ) {
      const toastId = toast.loading("Please wait..");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `${
          process.env.NEXT_PUBLIC_TOKEN_TYPE
        } ${localStorage.getItem("userToken")}`,
      };
      try {
        const headers = {
          "Content-Type": "application/json",
          Authorization: `${
            process.env.NEXT_PUBLIC_TOKEN_TYPE
          } ${localStorage.getItem("userToken")}`,
        };
        await axios
          .delete(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/url/${searchLinkId}`,
            { headers }
          )
          .then(() => {
            localStorage.setItem("LinkNewCreatedPing", "Yes");
            // setting up for updating the data
            toast.error("Your link has been deleted!", {
              id: toastId,
              icon: "😣",
            });
            push("/dashboard/link");
          });
      } catch (error: any) {
        console.error("Error in updating links:", error);
        toast.error(error.response.data.error, {
          id: toastId,
        });
      }
    } else {
      toast.success("Thank God", { icon: "☺" });
    }
  };

  return (
    <div className="overflow-x-auto my-5 w-1/3 max-xl:m-5 max-xl:w-auto mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">Link Title *</span>
            <input
              type="text"
              value={link.title}
              id="title"
              onChange={handleChange}
              className="input input-bordered"
              defaultChecked
            />
          </label>
        </div>
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">Destination (Original URL) *</span>
            <input
              type="text"
              value={link.originalURL}
              id="originalURL"
              onChange={handleChange}
              className="input input-bordered"
              defaultChecked
            />
          </label>
        </div>
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">Custom back-half *</span>
            <input
              type="text"
              value={link.shortenedSuffix}
              id="shortenedSuffix"
              onChange={handleChange}
              className="input input-bordered"
              defaultChecked
            />
          </label>
        </div>
        <div className="text-center">
          <input
            type="submit"
            className="m-3 btn btn-sm btn-outline"
            value={"Save Changes"}
          />
        </div>
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">Link Active</span>
            <input
              type="checkbox"
              id="isActive"
              className="toggle"
              checked={link.isActive}
              onChange={() => console.log("")}
              onClick={handleChange}
            />
          </label>
        </div>
        {/* <div className="link-control">
        <label className="label cursor-pointer">
          <span className="label-text">Email Notification</span>
          <input type="checkbox" id="isEmailNotification" className="toggle" checked={link.isEmailNotification} onChange={()=> console.log("")} onClick={handleChange}/>
        </label>
      </div> */}
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">reCAPTCHA</span>
            <input type="checkbox" className="toggle" defaultChecked disabled />
          </label>
        </div>
      </form>
      <div className="text-center">
        <button
          type="submit"
          onClick={handleDelete}
          className="m-3 btn text-red-500 btn-sm btn-outline"
        >
          Delete Link
        </button>
      </div>
    </div>
  );
}
