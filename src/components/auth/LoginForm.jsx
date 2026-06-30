"use client";

import Link from "next/link";
import { useState } from "react";

import {
  Input,
  Button,
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
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function LoginForm() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const onSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;

    setIsLoading(true);

    try {
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
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="w-full max-w-xs sm:max-w-sm lg:max-w-[540px] rounded-2xl sm:rounded-3xl lg:rounded-[32px] border border-white/40 bg-white/80 p-5 sm:p-8 lg:p-10 shadow-[0_20px_80px_rgba(0,0,0,.08)] backdrop-blur-xl">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center">Welcome Back 👋</h2>

      <p className="mt-2 sm:mt-3 text-sm sm:text-base text-gray-500 text-center">Login to continue using LifeDrop.</p>

      <Form onSubmit={onSubmit} className="mt-6 sm:mt-8 lg:mt-10 space-y-3 sm:space-y-4">
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
          <Label className="font-semibold text-sm sm:text-base">Email</Label>
          <Input placeholder="john@example.com" className="text-sm sm:text-base" />
          <FieldError className="text-xs sm:text-sm" />
        </TextField>

        <TextField
          isRequired
          className="w-full max-w-full"
          name="password"
          type="password"
        >
          <Label className="font-semibold text-sm sm:text-base">Password</Label>
          <InputGroup>
            <InputGroup.Input
              className="w-full max-w-full text-sm sm:text-base"
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
                  <MdOutlineRemoveRedEye className="size-3 sm:size-4" />
                ) : (
                  <FaRegEyeSlash className="size-3 sm:size-4" />
                )}
              </Button>
            </InputGroup.Suffix>
          </InputGroup>
          <Description className="text-xs sm:text-sm">
            Must be at least 8 characters with 1 uppercase and 1 number
          </Description>
          <FieldError className="text-xs sm:text-sm" />
        </TextField>

        <p className="text-right text-red-600 font-semibold text-xs sm:text-sm">
          Forgot Password?
        </p>

        <Button
          type="submit"
          color="danger"
          radius="full"
          size="lg"
          isLoading={isLoading}
          isDisabled={isLoading}
          className="h-12 sm:h-13 lg:h-14 w-full bg-linear-to-r from-red-600 to-rose-500 text-sm sm:text-base font-semibold shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-red-300"
          endContent={<ArrowRight size={16} className="sm:size-[18px]" />}
        >
          Login
        </Button>

        <p className="text-center text-gray-500 text-xs sm:text-sm">
          Don't have an account?
          <Link
            href="/signup"
            className="block sm:inline ml-0 sm:ml-2 mt-1 sm:mt-0 font-semibold text-red-600 hover:text-red-700"
          >
            Register Now
          </Link>
        </p>
      </Form>
    </div>
  );
}
