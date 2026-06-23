import RegisterForm from "@/components/auth/RegisterForm";

export const metadata = {
  title: "Register | LifeDrop",
};

export default function RegisterPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#FFFDFD]">
      {/* Background Blur */}
      <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-red-100 blur-[120px]" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-rose-100 blur-[120px]" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle,#dc2626_1px,transparent_1px)] [background-size:28px_28px]" />

      <div className="relative flex min-h-screen items-center justify-center px-5 py-20">
        <RegisterForm />
      </div>
    </main>
  );
}
