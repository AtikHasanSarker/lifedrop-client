import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { auth } from "@/lib/auth";

export async function POST(request) {
  try {
    const headersList = await headers();
    const origin = headersList.get("origin");

    const userSession = await auth.api.getSession({
      headers: headersList,
    });

    if (!userSession?.user) {
      return NextResponse.json(
        { error: "You must be logged in to make a donation." },
        { status: 401 }
      );
    }

    const user = userSession.user;

    // Parse and validate the request body
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid request body. Expected JSON." },
        { status: 400 }
      );
    }

    const { amount } = body;

    // Validate amount
    if (amount === undefined || amount === null) {
      return NextResponse.json(
        { error: "Amount is required." },
        { status: 400 }
      );
    }

    const parsedAmount = Number(amount);

    if (isNaN(parsedAmount) || typeof parsedAmount !== "number") {
      return NextResponse.json(
        { error: "Amount must be a valid number." },
        { status: 400 }
      );
    }

    if (parsedAmount < 10) {
      return NextResponse.json(
        { error: "Minimum donation amount is 10 BDT." },
        { status: 400 }
      );
    }

    // Create a one-time Stripe Checkout Session with a dynamic price
    const session = await stripe.checkout.sessions.create({
      customer_email: user.email,
      line_items: [
        {
          price_data: {
            currency: "bdt",
            product_data: {
              name: "LifeDrop Donation",
              description: "Support blood donation activities",
            },
            // Stripe requires amount in the smallest currency unit (paisa for BDT)
            unit_amount: Math.round(parsedAmount * 100),
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      metadata: {
        userId: user.id,
        userName: user.name,
        userEmail: user.email,
        amount: String(parsedAmount),
      },
      success_url: `${origin}/funding/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/funding`,
    });

    // Return the Checkout URL to the client so it can redirect
    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("[/api/payment POST]", err);
    return NextResponse.json(
      { error: err.message || "An unexpected error occurred." },
      { status: err.statusCode || 500 }
    );
  }
}
