"use client";
import React, { useEffect, useState } from "react";
import PageStruct from "../component/PageStruct";
import Button from "../component/Button";
import InputBox from "../component/InputBox";
import { useForm } from "react-hook-form";
import { verifyEmail } from "../api/api";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";

interface Code {
  email: string;
  OTP: string;
}
const VerifyEmail = () => {
  const form = useForm<Code>();
  const { register, handleSubmit, formState } = form;
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const router = useRouter();

  const [count, setCount] = useState(30);
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const onSubmit = async (data: Code) => {
    setErr("");

    if (!email) return;
    setLoading(true);
    console.log(email);
    try {
      const response = await verifyEmail({ email, OTP: data.OTP });
      console.log(response);
      if (response.success) {
        router.push("/");
      } else {
        setErr(response?.message || "Verification Failed");
      }
    } catch (error) {
      console.error("Verification error:", error);
      setErr("Verification Failed");
    }
    setLoading(false);
  };
  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <PageStruct title="Verify with Email">
        <p className="text-gray-500 pt-8 pb-16">
          We've sent a verification code to the email address you provided. To
          complete the verification process, please enter the code here.
        </p>
        <InputBox
          ph="Enter Verification Code"
          register={register("OTP", { required: "Enter verification code" })}
        />
        {err && <p className="text-red-400 text-center text-xsm">{err}</p>}
        {count != 0 ? (
          <p className="text-gray-500 text-center pt-4 pb-8">
            You can request to{" "}
            <span className="text-indigo-800 font-semibold">Resend Code</span>{" "}
            in
            <span className="text-indigo-800 font-semibold">
              {" 0:"}
              {count || "30"}
            </span>
          </p>
        ) : (
          <button className="text-indigo-800 font-semibold w-full py-2 my-2  border rounded-full">
            Resend
          </button>
        )}
        <Button
          name={loading ? "Verifying..." : "Continue"}
          disabled={loading}
          type="submit"
        />
      </PageStruct>
    </form>
  );
};

export default VerifyEmail;
