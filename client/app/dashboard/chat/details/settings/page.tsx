"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useSearchParams, usePathname } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();
  const searchFormId = searchParams.get("id");
  const { push } = useRouter();
  const [form, setForm] = useState({
    formTitle: "",
    customMessage: "",
    redirectUrl: "",
    isEnabled: true,
    isEmailNotification: true,
  }); 

  const handleChange = (e: any) => {
    var { id, value } = e.target;
    console.log(id, value)
    if(id == "isEmailNotification" || id == "isEnabled"){
      value = e.target.checked;
    }
    console.log(id, value)
    setForm((prevForm) => ({
      ...prevForm,
      [id]: value,
    }));
    console.log(form)
  };

  useEffect(() => {
    async function getFormData(){
      const toastId = toast.loading("Getting form data..");
      try {
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `${process.env.NEXT_PUBLIC_TOKEN_TYPE} ${localStorage.getItem("userToken")}`
        }
        console.log("Sent ..", headers);
        const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/form/${searchFormId}`, {headers});
        toast.success(response.data.message, {
          id: toastId,
        });
        setForm(response.data.form)
      } catch (error: any) {
        console.error("Error in getting form data:", error);
        toast.error(error.response.data.error, {
          id: toastId,
        });
      }

    }
    getFormData();
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Check if there is a previous change profile attempt in the last 10 minutes
    const previousChangeFormAttempt = localStorage.getItem("formChangeFormAttempt");
    if (previousChangeFormAttempt) {
      const currentTime = Date.now();
      const timeDifference = currentTime - parseInt(previousChangeFormAttempt, 10);

      // If less than 10 minutes have passed since the last attempt, show an error toast
      if (timeDifference < 10 * 60 * 1000) {
        toast.error(
          "Please wait for 10 minutes before attempting to change form again."
        );
        return;
      }
    }

    const toastId = toast.loading("Updating form data..");
      try {
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `${process.env.NEXT_PUBLIC_TOKEN_TYPE} ${localStorage.getItem("userToken")}`
        }
        console.log("Sent ..", headers);
        const response = await axios.put(`${process.env.NEXT_PUBLIC_SERVER_URL}/form/${searchFormId}`, {form} , {headers});
        toast.success(response.data.message, {
          id: toastId,
        });
        localStorage.setItem("formChangeFormAttempt", Date.now().toString());
        setForm(response.data.form)
      } catch (error: any) {
        console.error("Error in updating profile:", error);
        toast.error(error.response.data.error, {
          id: toastId,
        });
      }

    }

    const handleDelete = async (e: any) => {
      e.preventDefault();
      if(window.confirm("Do you want to delete this form? Please Confirm!") == true){
        const toastId = toast.loading("Please wait..");
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `${process.env.NEXT_PUBLIC_TOKEN_TYPE} ${localStorage.getItem("userToken")}`
        }
        try {
          const headers = {
            'Content-Type': 'application/json',
            'Authorization': `${process.env.NEXT_PUBLIC_TOKEN_TYPE} ${localStorage.getItem("userToken")}`
          }
          await axios.delete(`${process.env.NEXT_PUBLIC_SERVER_URL}/form/${searchFormId}`, {headers}).then(()=>{
            localStorage.setItem("FormNewCreatedPing", "Yes");
            // setting up for updating the data
            toast.error("Your form has been deleted!", {
              id: toastId,
              icon: "😣"
            });
            push("/dashboard/form");
          })
        } catch (error: any) {
          console.error("Error in updating forms:", error);
          toast.error(error.response.data.error, {
            id: toastId,
          });
        }
      }else{
        toast.success("Thank God", {icon: '☺'})
      }
      
    }

  return (
    <div className="overflow-x-auto my-5 w-1/3 max-xl:m-5 max-xl:w-auto mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="form-control">
        <label className="label cursor-pointer">
          <span className="label-text">Form Title</span>
          <input type="text" value={form.formTitle} id="formTitle"
                onChange={handleChange} className="input input-bordered" defaultChecked />
        </label>
      </div>
      <div className="form-control">
        <label className="label cursor-pointer">
          <span className="label-text">Form Custom Message</span>
          <input type="text" value={form.customMessage} id="customMessage"
                onChange={handleChange} className="input input-bordered" defaultChecked />
        </label>
      </div>
      <div className="form-control">
        <label className="label cursor-pointer">
          <span className="label-text">Form Redirect URL</span>
          <input type="text" value={form.redirectUrl} id="redirectUrl"
                onChange={handleChange} className="input input-bordered" defaultChecked />
        </label>
      </div>
      <div className="text-center">
        <input type="submit" className="m-3 btn btn-sm btn-outline" value={"Save Changes"} />
      </div>
      <div className="form-control">
        <label className="label cursor-pointer">
          <span className="label-text">Form Enable</span>
          <input type="checkbox" id="isEnabled" className="toggle" checked={form.isEnabled} onChange={()=> console.log("")}  onClick={handleChange}/>
        </label>
      </div>
      <div className="form-control">
        <label className="label cursor-pointer">
          <span className="label-text">Email Notification</span>
          <input type="checkbox" id="isEmailNotification" className="toggle" checked={form.isEmailNotification} onChange={()=> console.log("")} onClick={handleChange}/>
        </label>
      </div>
      <div className="form-control">
        <label className="label cursor-pointer">
          <span className="label-text">reCAPTCHA</span>
          <input type="checkbox" className="toggle" defaultChecked disabled />
        </label>
      </div>
      </form>
      <div className="text-center">
        <button type="submit" onClick={handleDelete} className="m-3 btn text-red-500 btn-sm btn-outline">Delete Form</button>
      </div>
    </div>
  );
}
