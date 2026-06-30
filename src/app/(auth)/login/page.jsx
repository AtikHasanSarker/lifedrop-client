import LoginForm from "@/components/auth/LoginForm";
import Image from "next/image";

export default function LoginPage() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#FFF8F8] via-white to-[#FFF5F5]">
      {/* Blur */}
      <div className="absolute -left-44 top-0 h-[300px] w-[300px] rounded-full bg-red-100 blur-[100px] sm:h-[400px] sm:w-[400px] sm:blur-[120px] lg:h-[500px] lg:w-[500px] lg:blur-[130px]" />

      <div className="absolute right-0 bottom-0 h-[280px] w-[280px] rounded-full bg-pink-100 blur-[100px] sm:h-[350px] sm:w-[350px] sm:blur-[110px] lg:h-[450px] lg:w-[450px] lg:blur-[120px]" />

      <div className="container mx-auto md:min-h-screen px-4 py-10 sm:px-6 sm:py-16 lg:px-12 lg:py-20">
        <div className="grid min-h-screen items-center gap-8 sm:gap-12 lg:gap-16 lg:grid-cols-2">
          {/* LEFT */}

          <div className="z-10 hidden lg:block">
              <h1 className="z-10 mt-4 text-2xl font-black leading-tight text-gray-900 sm:text-3xl lg:text-4xl">
                Login & Continue
                <span className="text-red-600"> Saving Lives.</span>
              </h1>

              <p className="mt-4 max-w-lg text-sm leading-6 text-gray-500 sm:text-base sm:leading-8">
                Access your LifeDrop account to manage blood requests, connect
                with donors and help save lives.
              </p>

            <Image
              src="/images/login.png"
              alt="Login Illustration"
              width={400}
              height={400}
              priority
              className="mx-auto mt-4 w-full max-w-xs sm:max-w-sm lg:max-w-lg"
            />
          </div>

          {/* RIGHT */}

          <div className="flex mx-auto justify-center w-full lg:justify-end">
            <LoginForm />
          </div>
        </div>
      </div>
    </section>
  );
}
