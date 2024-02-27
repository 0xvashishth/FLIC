"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useSearchParams, usePathname } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();
  const searchChatId = searchParams.get("id");
  const { push } = useRouter();
  const [chat, setChat] = useState({
    chatTitle: "",
    defaultAskQuestion: "",
    priority: "low",
    department: "",
    isEmailNotification: true,
    isEnabled: true,
    notes: "",
  });

  const handleChange = (e: any) => {
    var { id, value } = e.target;
    console.log(id, value);
    if (id == "isEmailNotification" || id == "isEnabled") {
      value = e.target.checked;
    }
    console.log(id, value);
    setChat((prevChat) => ({
      ...prevChat,
      [id]: value,
    }));
    console.log(chat);
  };

  useEffect(() => {
    async function getChatData() {
      const toastId = toast.loading("Getting chat data..");
      try {
        const headers = {
          "Content-Type": "application/json",
          Authorization: `${
            process.env.NEXT_PUBLIC_TOKEN_TYPE
          } ${localStorage.getItem("userToken")}`,
        };
        console.log("Sent ..", headers);
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/chat/${searchChatId}`,
          { headers }
        );
        toast.success(response.data.message, {
          id: toastId,
        });
        setChat(response.data.chat);
      } catch (error: any) {
        console.error("Error in getting chat data:", error);
        toast.error(error.response.data.error, {
          id: toastId,
        });
      }
    }
    getChatData();
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Check if there is a previous change profile attempt in the last 10 minutes
    // const previousChangeChatAttempt = localStorage.getItem(
    //   "chatChangeChatAttempt"
    // );
    // if (previousChangeChatAttempt) {
    //   const currentTime = Date.now();
    //   const timeDifference =
    //     currentTime - parseInt(previousChangeChatAttempt, 10);

    //   // If less than 10 minutes have passed since the last attempt, show an error toast
    //   if (timeDifference < 10 * 60 * 1000) {
    //     toast.error(
    //       "Please wait for 10 minutes before attempting to change chat again."
    //     );
    //     return;
    //   }
    // }

    const toastId = toast.loading("Updating chat data..");
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `${
          process.env.NEXT_PUBLIC_TOKEN_TYPE
        } ${localStorage.getItem("userToken")}`,
      };
      console.log("Sent ..", headers);
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/chat/${searchChatId}`,
        { chat },
        { headers }
      );
      toast.success(response.data.message, {
        id: toastId,
      });
      localStorage.setItem("chatChangeChatAttempt", Date.now().toString());
      setChat(response.data.chat);
    } catch (error: any) {
      console.error("Error in updating chat", error);
      toast.error(error.response.data.error, {
        id: toastId,
      });
    }
  };

  const handleDelete = async (e: any) => {
    e.preventDefault();
    if (
      window.confirm("Do you want to delete this chat? Please Confirm!") == true
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
            `${process.env.NEXT_PUBLIC_SERVER_URL}/chat/${searchChatId}`,
            { headers }
          )
          .then(() => {
            localStorage.setItem("ChatNewCreatedPing", "Yes");
            // setting up for updating the data
            toast.error("Your chat has been deleted!", {
              id: toastId,
              icon: "😣",
            });
            push("/dashboard/chat");
          });
      } catch (error: any) {
        console.error("Error in updating chat:", error);
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
            <span className="label-text">Chat Title</span>
            <input
              type="text"
              value={chat.chatTitle}
              id="chatTitle"
              onChange={handleChange}
              className="input input-bordered"
            />
          </label>
        </div>
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">
              Ask question * (If you are not online)
            </span>
            <input
              type="text"
              value={chat.defaultAskQuestion}
              id="defaultAskQuestion"
              onChange={handleChange}
              className="input input-bordered"
            />
          </label>
        </div>
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">Department</span>
            <input
              type="text"
              value={chat.department}
              id="department"
              onChange={handleChange}
              className="input input-bordered"
            />
          </label>
        </div>

        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">Priority</span>
            <select
              onChange={handleChange}
              id="priority"
              className="text-lg input select cursor-pointer border-2 block input-bordered rounded-md"
              value={chat.priority}
            >
              <option value={"low"}>low</option>
              <option value={"high"}>high</option>
              <option value={"medium"}>medium</option>
            </select>
          </label>
        </div>
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">Additional Notes</span>
            <input
              type="text"
              value={chat.notes}
              id="notes"
              onChange={handleChange}
              className="input input-bordered"
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
            <span className="label-text">Chat Enable</span>
            <input
              type="checkbox"
              id="isEnabled"
              className="toggle"
              checked={chat.isEnabled}
              onChange={()=> console.log("")}
              onClick={handleChange}
            />
          </label>
        </div>
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">Email Notification</span>
            <input
              type="checkbox"
              id="isEmailNotification"
              className="toggle"
              checked={chat.isEmailNotification}
              onChange={()=> console.log("")}
              onClick={handleChange}
            />
          </label>
        </div>
      </form>
      <div className="text-center">
        <button
          type="submit"
          onClick={handleDelete}
          className="m-3 btn text-red-500 btn-sm btn-outline"
        >
          Delete Chat
        </button>
      </div>
    </div>
  );
}
