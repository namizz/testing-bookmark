"use client";
import React, { useEffect, useState } from "react";
import PageStruct from "../component/PageStruct";
import InputBox from "../component/InputBox";
import Button from "../component/Button";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { DevTool } from "@hookform/devtools";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

interface LogInField {
  password: string;
  email: string;
}
const LogIn = () => {
  const form = useForm<LogInField>();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = form;

  const [loading, setLoading] = useState(false);
  const [errormsg, setMsg] = useState("");
  const router = useRouter();

  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/"); // Redirect to home if already logged in
    }
  }, [status, router]);
  const onSubmit = async (data: LogInField) => {
    setLoading(true);
    setMsg("");

    const result = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (result?.error) {
      setMsg(result.error);
    } else {
      router.push("/");
    }

    setLoading(false);
  };

  return (
    <form className="" noValidate onSubmit={handleSubmit(onSubmit)}>
      <PageStruct title="Welcome Back,">
        <InputBox
          type="email"
          label="Email Address"
          ph="Enter email address"
          register={register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Invalid email address",
            },
          })}
          error={errors.email?.message}
        />

        <InputBox
          type="password"
          label="Password"
          ph="Enter password"
          register={register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
          error={errors.password?.message}
        />
        {errormsg && (
          <p className="text-red-400 text-center text-xsm">{errormsg}</p>
        )}
        <Button
          disabled={loading}
          name={loading ? "Logging in..." : "Continue"}
          type="submit"
        />
        <p className="px-1 py-4">
          {" "}
          Already have an account?{"  "}
          <Link href={"/signup"} className="text-indigo-900 font-bold">
            Sign Up
          </Link>
        </p>
        <p className="text-gray-500 text-xs">
          By clicking Continue, you acknowledge that you have read and accepted
          our <span className="text-indigo-800">Term of Service </span>and{" "}
          <span className="text-indigo-800"> Privacy Policy</span>
        </p>
        <DevTool control={control} />
      </PageStruct>
    </form>
  );
};

export default LogIn;
