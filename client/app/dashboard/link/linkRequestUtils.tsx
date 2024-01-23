import toast from "react-hot-toast";
import axios from "axios";

export async function getUserLinks() {
  const linkDataFromLocalStorage = JSON.parse(
    localStorage.getItem("linkDataFromLocalStorage")!
  );
  const LinkNewCreatedPing = localStorage.getItem("LinkNewCreatedPing");
  if (linkDataFromLocalStorage) {
    // LinkNewCreatedPing == "Yes"
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
          `${process.env.NEXT_PUBLIC_SERVER_URL}/url`,
          { headers }
        );
        console.log(response.data.forms); // Assuming the server returns some data
        toast.success(response.data.message, {
          id: toastId,
        });
        localStorage.setItem(
          "linkDataFromLocalStorage",
          JSON.stringify(response.data.urls)
        );
        localStorage.removeItem("LinkNewCreatedPing");
        return response.data.urls;
      } catch (error: any) {
        console.error("Error in getting the link:", error);
        toast.error(error.response.data.error, {
          id: toastId,
        });
      }
    }
    return linkDataFromLocalStorage;
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
        `${process.env.NEXT_PUBLIC_SERVER_URL}/url`,
        { headers }
      );
      console.log(response.data.urls); // Assuming the server returns some data
      toast.success(response.data.message, {
        id: toastId,
      });
      localStorage.setItem(
        "linkDataFromLocalStorage",
        JSON.stringify(response.data.urls)
      );
      return response.data.urls;
    } catch (error: any) {
      console.error("Error in getting link data:", error);
      toast.error(error.response.data.error, {
        id: toastId,
      });
    }
  }
}

export async function getLinkData(linkId: any) {
  const toastId = toast.loading("Getting Data From Server..");
  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `${
        process.env.NEXT_PUBLIC_TOKEN_TYPE
      } ${localStorage.getItem("userToken")}`,
    };
    const response = await axios.get(
      `${process.env["NEXT_PUBLIC_SERVER_URL"]}/url/${linkId}`,
      { headers }
    );
    toast.success(response.data.message, {
      id: toastId,
    });
    return response.data.url; // Assuming the server returns the desired data in response.data
  } catch (error: any) {
    console.error("Error fetching link data:", error.message);
    toast.error(error.response.data.error, {
      id: toastId,
    });
    throw error; // Rethrow the error to handle it in the calling context
  }
}

