"use client";

import Link from "next/link";
import {
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";
import {
  FaFacebookF,
  FaGithub,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathName = usePathname();
    if (pathName.includes("dashboard")) {
      return null;
    }
  return (
    <footer className="relative overflow-hidden bg-[#0F172A] text-gray-300">
      {/* Top Gradient */}

      <div className="h-1 bg-linear-to-r from-red-600 via-red-500 to-pink-500" />

      {/* Blur */}

      <div className="absolute -left-40 top-0 h-72 w-72 rounded-full bg-red-600/20 blur-[120px]" />

      <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-red-500/10 blur-[150px]" />

      <div className="relative container mx-auto px-6 py-20 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-5">
          {/* Brand */}

          <div className="lg:col-span-2">
            <div>
              <Image
                src="/footer-logo.png"
                alt="logo"
                width={250}
                height={100}
              />
            </div>

            <p className="mt-6 max-w-md text-sm text-gray-400">
              LifeDrop is a modern blood donation platform that connects
              voluntary blood donors with patients in need, helping save lives
              through technology and community.
            </p>

            {/* Newsletter */}

            <div className="mt-8 flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-l-full border border-white/10 bg-white/10 px-6 py-4 outline-none placeholder:text-gray-400"
              />

              <button className="rounded-r-full bg-red-600 px-6 transition hover:bg-red-700">
                <Send size={20} />
              </button>
            </div>
          </div>

          {/* Links */}

          <div>
            <h3 className="mb-5 text-2xl font-bold text-white">Quick Links</h3>

            <div className="flex flex-col gap-4">
              <Link href="/">Home</Link>
              <Link href="/donation-requests">Blood Requests</Link>
              <Link href="/search">Search Donor</Link>
              <Link href="/funding">Funding</Link>
            </div>
          </div>

          {/* Resources */}

          <div>
            <h3 className="mb-5 text-2xl font-bold text-white">Resources</h3>
            <div className="flex flex-col gap-4">
              <Link href="/faq">FAQ</Link>
              <Link href="/privacy-policy">Privacy Policy</Link>
              <Link href="/terms">Terms & Conditions</Link>
              <Link href="/dashboard">Dashboard</Link>
            </div>
          </div>

          {/* Contact */}

          <div>
            <h3 className="mb-5 text-2xl font-bold text-white">Contact</h3>

            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <MapPin size={18} className="text-red-500" />
                Dhaka, Bangladesh
              </div>

              <div className="flex items-center gap-3">
                <Phone size={18} className="text-red-500" />
                +880 1700-000000
              </div>

              <div className="flex items-center gap-3">
                <Mail size={18} className="text-red-500" />
                support@lifedrop.com
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}

        <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 lg:flex-row">
          <p className="text-sm text-gray-500">
            © 2026 LifeDrop. All Rights Reserved.
          </p>

          <div className="flex gap-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition-all duration-300 hover:-translate-y-1 hover:bg-red-600"
            >
              <FaFacebookF className="text-lg text-white" />
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition-all duration-300 hover:-translate-y-1 hover:bg-red-600"
            >
              <FaLinkedinIn className="text-lg text-white" />
            </a>

            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition-all duration-300 hover:-translate-y-1 hover:bg-red-600"
            >
              <FaGithub className="text-lg text-white" />
            </a>

            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition-all duration-300 hover:-translate-y-1 hover:bg-red-600"
            >
              <FaXTwitter className="text-lg text-white" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
