"use client";

import Link from "next/link";
import { useState } from "react";

import {
  Input,
  Button,
  Separator,
  FieldError,
  Description,
  InputGroup,
  Label,
  TextField,
  Form,
} from "@heroui/react";

import {  ArrowRight } from "lucide-react";
import { FaRegEyeSlash } from "react-icons/fa6";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function LoginForm() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());
    const { data, error } = await authClient.signIn.email({
      email: user.email,
      password: user.password,
    });

    if (error) {
      toast.error("Login failed! Email or password is incorrect.");
    } else {
      toast.success("Login successful! Redirecting...");
      router.push("/");
    }
  };


  return (
    <div className="w-full max-w-[540px] rounded-[32px] border border-white/40 bg-white/80 p-10 shadow-[0_20px_80px_rgba(0,0,0,.08)] backdrop-blur-xl">
      <h2 className="text-3xl font-bold text-gray-900 text-center">Welcome Back 👋</h2>

      <p className="mt-3 text-gray-500 text-center">Login to continue using LifeDrop.</p>

      <Form onSubmit={onSubmit} className="mt-10 space-y-4">
        <TextField
          isRequired
          name="email"
          type="email"
          validate={(value) => {
            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
              return "Please enter a valid email address";
            }
            return null;
          }}
        >
          <Label className="font-semibold">Email</Label>
          <Input placeholder="john@example.com" />
          <FieldError />
        </TextField>

        <TextField
          isRequired
          className="w-full max-w-full"
          name="password"
          type="password"
        >
          <Label className="font-semibold">Password</Label>
          <InputGroup>
            <InputGroup.Input
              className="w-full max-w-full"
              type={isVisible ? "text" : "password"}
              placeholder="Enter your password"
            />
            <InputGroup.Suffix className="pr-0">
              <Button
                isIconOnly
                aria-label={isVisible ? "Hide password" : "Show password"}
                size="sm"
                variant="ghost"
                onPress={() => setIsVisible(!isVisible)}
              >
                {isVisible ? (
                  <MdOutlineRemoveRedEye className="size-4" />
                ) : (
                  <FaRegEyeSlash className="size-4" />
                )}
              </Button>
            </InputGroup.Suffix>
          </InputGroup>
          <Description>
            Must be at least 8 characters with 1 uppercase and 1 number
          </Description>
          <FieldError />
        </TextField>

        <p className="text-right text-red-600 font-semibold text-sm">
          Forgot Password?
        </p>

        <Button
        type="submit"
          color="danger"
          radius="full"
          size="lg"
          className=" h-14
    w-full
    bg-linear-to-r
    from-red-600
    to-rose-500
    text-base
    font-semibold
    shadow-lg
    transition-all
    duration-300
    hover:scale-[1.02]
    hover:shadow-red-300
  "
          endContent={<ArrowRight size={18} />}
        >
          Login
        </Button>

        <p className="text-center text-gray-500">
          Don't have an account?
          <Link
            href="/signup"
            className="ml-2 font-semibold text-red-600 hover:text-red-700"
          >
            Register Now
          </Link>
        </p>
      </Form>
    </div>
  );
}
