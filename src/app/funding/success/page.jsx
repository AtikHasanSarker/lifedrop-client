import { auth } from "@/lib/auth";
import { stripe } from "@/lib/stripe";
import {
  ArrowLeft,
  BadgeCheck,
  Calendar,
  CreditCard,
  Heart,
  LayoutDashboard,
  Mail,
  Receipt,
} from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

async function recordFunding(session) {
    
  const paymentData = {
    userId: session.metadata?.userId,
    userName: session.metadata?.userName,
    UserEmail:
      session.customer_details?.email ||
      session.metadata?.userEmail,
    amount: session.amount_total / 100,
    currency: session.currency,
    paymentIntent:
      typeof session.payment_intent === "object"
        ? session.payment_intent.id
        : session.payment_intent,
    checkoutSessionId: session.id,
    paymentStatus: session.payment_status,
    transactionDate: session.created,
  };

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/funding`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paymentData),
    });

    const resBody = await res.json().catch(() => ({}));

    if (!res.ok) {
      throw new Error(resBody.error || resBody.message || "Failed to save funding.");
    }
  } catch (err) {
    console.error("Error recording funding:");
  }
}

function formatDate(timestamp) {
  if (!timestamp) return "N/A";
  return new Date(timestamp * 1000).toLocaleString("en-GB", {
    dateStyle: "long",
    timeStyle: "short",
  });
}

function formatCurrency(currency) {
  return (currency || "BDT").toUpperCase();
}


export default async function SuccessPage({ searchParams }) {
    const userSession = await auth.api.getSession({
      headers: await headers(),
    });

  const { session_id } = await searchParams;

  if (!session_id) {
    redirect("/funding");
  }

  let session;

  try {
    session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ["payment_intent"],
    });
  } catch (err) {
    console.error("[success page] Failed to retrieve session:", err.message);
    redirect("/funding");
  }

  if (session.status === "open" || session.status !== "complete") {
    redirect("/funding");
  }
  
  // Trigger DB save — idempotent, safe to run on refresh
  await recordFunding(session);

  const paymentIntent =
    typeof session.payment_intent === "object"
      ? session.payment_intent
      : null;
  const donatedAmount = session.amount_total / 100;
  const currency = formatCurrency(session.currency);
  const customerEmail =
    session.customer_details?.email ||
    session.metadata?.userEmail 
  const paymentStatus = session.payment_status || "paid";
  const transactionDate = formatDate(
    paymentIntent?.created || session.created
  );

  const transactionId = paymentIntent?.id || session.id;

  return (
    <main className="min-h-screen py-16 flex items-center justify-center bg-linear-to-br from-green-50 via-white to-emerald-50 px-4">
      <article className="w-full max-w-2xl rounded-3xl border border-green-100 bg-white p-8 shadow-xl space-y-6">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-green-100 ring-8 ring-green-50">
            <Heart className="h-12 w-12 text-green-600 fill-green-500" />
          </div>
        </div>

        {/* Title */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-gray-900">
            Payment Successful 🎉
          </h1>
          <p className="text-gray-500 max-w-md mx-auto">
            Thank you for supporting{" "}
            <span className="font-semibold text-green-700">LifeDrop</span>. Your
            donation helps save lives.
          </p>
        </div>

        {/* Donated Amount — prominent */}
        <div className="flex flex-col items-center justify-center rounded-2xl bg-linear-to-r from-green-500 to-emerald-600 py-6 px-8 text-white shadow-lg shadow-green-200">
          <p className="text-sm font-medium uppercase tracking-widest opacity-80">
            Donated Amount
          </p>
          <p className="text-5xl font-extrabold mt-1">
            ৳{donatedAmount.toLocaleString("en-BD")}
          </p>
          <p className="text-sm opacity-75 mt-1">{currency}</p>
        </div>

        {/* Details Grid */}
        <div className="rounded-2xl border border-gray-200 bg-gray-50 divide-y divide-gray-200 overflow-hidden">
          {/* Customer Email */}
          <div className="flex items-center gap-4 px-5 py-4">
            <div className="shrink-0 rounded-full bg-green-100 p-2.5">
              <Mail className="h-5 w-5 text-green-600" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                Customer Email
              </p>
              <p className="text-sm font-semibold text-gray-800 break-all">
                {customerEmail}
              </p>
            </div>
          </div>

          {/* Payment Status */}
          <div className="flex items-center gap-4 px-5 py-4">
            <div className="shrink-0 rounded-full bg-green-100 p-2.5">
              <BadgeCheck className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                Payment Status
              </p>
              <p className="text-sm font-semibold text-green-700 capitalize">
                {paymentStatus}
              </p>
            </div>
          </div>

          {/* Currency */}
          <div className="flex items-center gap-4 px-5 py-4">
            <div className="shrink-0 rounded-full bg-green-100 p-2.5">
              <CreditCard className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                Currency
              </p>
              <p className="text-sm font-semibold text-gray-800">{currency}</p>
            </div>
          </div>

          {/* Transaction Date */}
          <div className="flex items-center gap-4 px-5 py-4">
            <div className="shrink-0 rounded-full bg-green-100 p-2.5">
              <Calendar className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                Transaction Date
              </p>
              <p className="text-sm font-semibold text-gray-800">
                {transactionDate}
              </p>
            </div>
          </div>

          {/* Transaction ID */}
          <div className="flex items-center gap-4 px-5 py-4">
            <div className="shrink-0 rounded-full bg-green-100 p-2.5">
              <Receipt className="h-5 w-5 text-green-600" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                Transaction ID
              </p>
              <p className="text-xs font-mono text-gray-600 break-all">
                {transactionId}
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href={`/dashboard/${userSession.user.role}`}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700 active:scale-95"
          >
            <LayoutDashboard size={18} />
            Go to Dashboard
          </Link>

          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-100 active:scale-95"
          >
            <ArrowLeft size={18} />
            Back to Home
          </Link>
        </div>

        {/* Help */}
        <p className="text-center text-sm text-gray-400">
          Need help?{" "}
          <a
            href="mailto:support@lifedrop.org"
            className="font-medium text-green-600 hover:underline"
          >
            Contact support
          </a>
        </p>
      </article>
    </main>
  );
}
