import toast from "react-hot-toast";
import axios from "axios";

export async function getUserChats() {
  const chatDataFromLocalStorage = JSON.parse(
    localStorage.getItem("chatDataFromLocalStorage")!
  );
  const ChatNewCreatedPing = localStorage.getItem("ChatNewCreatedPing");
  if (chatDataFromLocalStorage) {
    // ChatNewCreatedPing == "Yes"
    // Now bypassing the above rule, because if response count is update, i also need to update the data
    if (1) {
      const toastId = toast.loading("Getting Data From Server..");
      try {
        const headers = {
          "Content-Type": "application/json",
          Authorization: `${
            process.env.NEXT_PUBLIC_TOKEN_TYPE
          } ${localStorage.getItem("userToken")}`,
        };
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/chat/getUserChats`,
          { headers }
        );
        console.log(response.data.chats); // Assuming the server returns some data
        toast.success(response.data.message, {
          id: toastId,
        });
        localStorage.setItem(
          "chatDataFromLocalStorage",
          JSON.stringify(response.data.chats)
        );
        localStorage.removeItem("ChatNewCreatedPing");
        return response.data.chats;
      } catch (error: any) {
        console.error("Error in retrieving data:", error);
        toast.error(error.response.data.error, {
          id: toastId,
        });
      }
    }
    return chatDataFromLocalStorage;
  } else {
    const toastId = toast.loading("Getting Data From Server..");
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `${
          process.env.NEXT_PUBLIC_TOKEN_TYPE
        } ${localStorage.getItem("userToken")}`,
      };
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/chat/getUserChats`,
        { headers }
      );  
      console.log(response.data.chats); // Assuming the server returns some data
      toast.success(response.data.message, {
        id: toastId,
      });
      localStorage.setItem(
        "chatDataFromLocalStorage",
        JSON.stringify(response.data.chats)
      );
      return response.data.chats;
    } catch (error: any) {
      console.error("Error in getting chat data:", error);
      toast.error(error.response.data.error, {
        id: toastId,
      });
    }
  }
}
