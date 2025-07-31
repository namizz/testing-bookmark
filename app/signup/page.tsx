"use client";
import Button from "../component/Button";

import PageStruct from "../component/PageStruct";
import InputBox from "../component/InputBox";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { signup } from "@/app/api/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface SignUpField {
  name: string;
  email: string;
  password: string;
  confPassword: string;
}

const SignUp = () => {
  const form = useForm<SignUpField>();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = form;
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errmsg, setMsg] = useState("");
  const { data: session, status } = useSession();
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  const onSubmit = async (data: SignUpField) => {
    setLoading(true);
    setMsg("");

    try {
      const response = await signup(data);
      if (response?.success) {
        router.push(`/verifyEmail?email=${encodeURIComponent(data.email)}`);
      } else {
        setMsg("Something went wrong. Please Try again.");
      }
      console.log(response);
    } catch (err) {
      setMsg("Something went wrong. Please Try again later.");
      console.error("Signup error", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="" noValidate onSubmit={handleSubmit(onSubmit)}>
      <PageStruct title="Sign Up Today!">
        <button
          type="button"
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="w-full border border-gray-300 flex items-center justify-center p-2 rounded my-4 text-indigo-800 font-bold "
        >
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJg75LWB1zIJt1VTZO7O68yKciaDSkk3KMdw&s"
            alt="Google"
            className="w-4 h-4 mx-2"
          />
          Sign Up with Google
        </button>
        <InputBox
          label="Full Name"
          ph="Enter your full name"
          register={register("name", { required: "Name is required" })}
          error={errors.name?.message}
        />

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

        <InputBox
          type="password"
          label="Confirm Password"
          ph="Re-enter password"
          register={register("confPassword", {
            required: "Confirm password is required",
          })}
          error={errors.confPassword?.message}
        />
        {errmsg && (
          <p className="text-red-400 text-center text-xsm">{errmsg}</p>
        )}
        <Button
          disabled={loading}
          name={loading ? "Sending Code..." : "Continue"}
          type="submit"
        />

        <p className="px-1 py-4">
          {" "}
          Already have an account?{"  "}
          <Link href={"/login"} className="text-indigo-900 font-bold">
            Login
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

export default SignUp;
