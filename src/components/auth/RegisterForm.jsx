"use client";

import Link from "next/link";
import { useState } from "react";
import Input from "../ui/Input";
import PasswordInput from "../ui/PasswordInput";
import Select from "../ui/Select";
import { districts, districtUpazilas } from "@/app/data/DistrictUpazilas";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const router = useRouter();
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);

    if (value !== password) {
      setError("Passwords do not match");
      return;
    }
    setError("");
  };

 const bloodGroups = [
    { value: "A+", label: "A+" },
    { value: "A-", label: "A-" },
    { value: "B+", label: "B+" },
    { value: "B-", label: "B-" },
    { value: "AB+", label: "AB+" },
    { value: "AB-", label: "AB-" },
    { value: "O+", label: "O+" },
    { value: "O-", label: "O-" },
  ];
  
  const onSubmit = async (e) => {
    e.preventDefault();
    if(password !== confirmPassword){
      return
    }

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signUp.email({
      name: user.name,
      email: user.email,
      password: user.password,
      image: user.imageUrl,
      imageUrl: user.imageUrl,
      bloodGroup: user.bloodGroup,
      district: user.district,
      upazila: user.upazila,
    });
      

    console.log(data);

    if (error) {
      toast.error("Registration failed! ");
    } else {
      toast.success("Registration successful!");
      router.push("/");
    }
  };

  return (
    <div className="w-full max-w-2xl rounded-[32px] border border-red-100 bg-white/90 p-8 shadow-2xl backdrop-blur-xl md:p-12">
      <div className="text-center">
        <h1 className="text-4xl font-black tracking-tight text-red-600">
          LifeDrop
        </h1>

        <h2 className="mt-5 text-3xl font-bold text-gray-900">
          Create Your Account
        </h2>

        <p className="mt-3 text-gray-500">
          Join our community and become someone's lifesaver.
        </p>
      </div>

      {/* Form */}

      <form onSubmit={onSubmit} className="mt-10 space-y-6">
        <Input
          required
          label="Profile Picture"
          type={"url"}
          name="imageUrl"
          placeholder="https://example.com/image.jpg"
        />

        <Input
          required
          label="Full Name"
          name="name"
          placeholder="Enter your full name"
        />

        <Input
          required
          label="Email Address"
          type="email"
          name="email"
          placeholder="Enter your email"
        />

        <Select
          required
          label="Blood Group"
          name="bloodGroup"
          options={bloodGroups}
          placeholder="Select Blood Group"
        />

        {/* District + Upazila */}

        <div className="grid gap-6 md:grid-cols-2">
          <Select
            required
            label="District"
            name="district"
            onChange={(e) => setSelectedDistrict(e.target.value)}
            options={districts}
            placeholder="Select District"
          />

          <Select
            required
            label="Upazila"
            name="upazila"
            options={districtUpazilas[selectedDistrict] || []}
            placeholder="Select Upazila"
          />
        </div>

        <PasswordInput
          required
          label="Password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <PasswordInput
          required
          label="Confirm Password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handlePasswordChange}
          error={error}
        />

        {/* Button */}

        <button
          type="submit"
          className="w-full rounded-2xl bg-linear-to-r from-red-600 to-red-500 py-4 text-lg font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(220,38,38,.35)]"
        >
          Create Account
        </button>

        {/* Login */}

        <p className="text-center text-gray-600">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-red-600 hover:underline"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
