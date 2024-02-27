import axios from "axios";
import toast from "react-hot-toast";

export const fetchData = async (searchFormId: any) => {
  const toastId = toast.loading("Getting Data From Server..");
  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `${
        process.env.NEXT_PUBLIC_TOKEN_TYPE
      } ${localStorage.getItem("userToken")}`,
    };
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/form/getFormResponses/${searchFormId}`,
      { headers }
    );
    //  setFormData(response.data.formRequestDetails);
    toast.success(response.data.message, {
      id: toastId,
    });
    return response.data.formRequestDetails;
  } catch (error: any) {
    toast.success(error.response.data.error, {
      id: toastId,
    });
    console.error("Error fetching data:", error);
  }
};
export const deleteResponseData = async (searchFormId: any, responseId: any) => {
  const toastId = toast.loading("Deleting Data From Server..");
  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `${
        process.env.NEXT_PUBLIC_TOKEN_TYPE
      } ${localStorage.getItem("userToken")}`,
      "ResponseId": responseId,
    };
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/form/deleteResponse/${searchFormId}`,
      { headers }
    );
    //  setFormData(response.data.formRequestDetails);
    toast.success(response.data.message, {
      id: toastId,
    });
    return response.data.formRequestDetails;
    // location.reload();
  } catch (error: any) {
    toast.success(error.response.data.error, {
      id: toastId,
    });
    console.error("Error fetching data:", error);
  }
};