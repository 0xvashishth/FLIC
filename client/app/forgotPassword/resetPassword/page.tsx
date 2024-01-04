"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
const ROOT_URL = process.env.NEXT_PUBLIC_SERVER_URL;
import { useSearchParams, useRouter } from "next/navigation";

const ResetPassword = () => {
  const { push } = useRouter();
  const searchParams = useSearchParams();

  const [password, setPassword] = useState();

  const [resetToken, setResetToken] = useState("");
  const [resetEmail, setResetEmail] = useState("");
  const [resetTime, setResetTime] = useState("");
  const [validatingToken, setValidatingToken] = useState(false);

  useEffect(() => {
    const toastId = toast.loading(
      "Please wait, we are checking your details 😁"
    );
    const queryToken = searchParams.get("token");
    const queryTime = searchParams.get("time");
    const queryEmail = searchParams.get("email");

    if (!queryToken || !queryTime || !queryEmail) {
      toast.error("Something went wrong. Please request a new one.", {
        id: toastId,
      });
        push("/forgotPassword");
    } else {
      const currentTime = Date.now();
      const linkCreationTime = parseInt(queryTime!);
      const timeDifference = currentTime - linkCreationTime;
      const thirtyMinutesInMillis = 30 * 60 * 1000;

      if (timeDifference > thirtyMinutesInMillis) {
        toast.success("Reset link has expired. Please request a new one.", {
          id: toastId,
        });
        push("/forgotPassword");
      } else {
        // Store them in state
        setResetToken(queryToken!);
        setResetEmail(queryEmail!);
        setResetTime(queryTime!);

        const userSendForCheck = {
          token: queryToken,
          time: queryTime,
          email: queryEmail,
        };

        // Validate token on the server
        const validateResetToken = async () => {
          try {
            const response = await axios.post(
              `${ROOT_URL}/user/forgot_password_reset_check`,
              { user: userSendForCheck }
            );
            console.log(response.data.message); // Assuming the server returns some data
            // Not needed to create new token
            // setResetToken(response.data.newToken);
            toast.success(response.data.message, {
              id: toastId,
            });
            // push("/dashboard");
          } catch (error: any) {
            console.error("Error in Resetting Password in:", error);
            toast.error(error.response.data.error, {
              id: toastId,
            });
            push("/forgotPassword");
          }
        };

        validateResetToken();
      }
    }
  }, []);

  const handleChange = (e: any) => {
    const { value } = e.target;
    setPassword(value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Check if there is a previous forgot password attempt in the last 10 minutes
    const previousForgotPasswordResetAttempt = localStorage.getItem(
      "userForgotPasswordResetAttempt"
    );
    if (previousForgotPasswordResetAttempt) {
      const currentTime = Date.now();
      const timeDifference =
        currentTime - parseInt(previousForgotPasswordResetAttempt, 10);

      // If less than 10 minutes have passed since the last attempt, show an error toast
      if (timeDifference < 10 * 60 * 1000) {
        toast.error(
          "Please wait for 10 minutes before attempting to forgot password reset in again."
        );
        return;
      }
    }

    const toastId = toast.loading("Sending data..");

    try {
      const userSendForCheck = {
        token: resetToken,
        time: resetTime,
        email: resetEmail,
        password: password,
      };
      const response = await axios.post(
        `${ROOT_URL}/user/forgot_password_reset`,
        {
          user: userSendForCheck,
        }
      );
      console.log(response.data.message); // Assuming the server returns some data
      toast.success(response.data.message, {
        id: toastId,
      });
      localStorage.setItem(
        "previousForgotPasswordResetAttempt",
        Date.now().toString()
      );
      push("/login");
    } catch (error: any) {
      console.error("Error Forgot Password in:", error);
      toast.error(error.response.data.error, {
        id: toastId,
      });
    }
  };

  return (
    <div className="hero min-h-screen bg-base-100">
      <div className="hero-content flex-col">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold text-center">Reset Password 🚀</h1>
          <p className="py-6 text-sys-yellow">
            You won't be able to reset your password if your account is not
            verified. Reach out to us at hello@flic.tech for any quries 💁🏻‍♂️
          </p>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form className="card-body" onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">New Password</span>
              </label>
              <input
                type="password"
                // value={password}
                value={password}
                onChange={handleChange}
                id="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-outline">
                Submit
              </button>
            </div>
            <label className="label">
              <a href="/login" className="label-text-alt link link-hover">
                Already Know Your Password? Login Here 🔥
              </a>
            </label>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
