import LoginForm from "@/components/auth/LoginForm";
import Image from "next/image";

export default function LoginPage() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#FFF8F8] via-white to-[#FFF5F5]">
      {/* Blur */}
      <div className="absolute -left-44 top-0 h-[500px] w-[500px] rounded-full bg-red-100 blur-[130px]" />

      <div className="absolute right-0 bottom-0 h-[450px] w-[450px] rounded-full bg-pink-100 blur-[120px]" />

      <div className="container mx-auto min-h-screen px-6 py-20 lg:px-12 ">
        <div className="grid min-h-screen items-center gap-16 lg:grid-cols-2">
          {/* LEFT */}

          <div className="z-10">
              <h1 className="z-10 mt-4 text-4xl font-black leading-tight text-gray-900 lg:text-4xl">
                Login & Continue
                <span className="text-red-600"> Saving Lives.</span>
              </h1>

              <p className="mt-4 max-w-lg text-lg leading-8 text-gray-500">
                Access your LifeDrop account to manage blood requests, connect
                with donors and help save lives.
              </p>

            <Image
              src="/images/login.png"
              alt="Login Illustration"
              width={200}
              height={200}
              priority
              className="mx-auto mt-2 w-full max-w-125"
            />
          </div>

          {/* RIGHT */}

          <div className="flex justify-center lg:justify-end">
            <LoginForm />
          </div>
        </div>
      </div>
    </section>
  );
}
