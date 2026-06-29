import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { MongoClient } from "mongodb";

let cachedClient = null;

async function getDb() {
  if (!cachedClient) {
    cachedClient = new MongoClient(process.env.MONGODB_URI);
    await cachedClient.connect();
  }
  return cachedClient.db("lifedrop");
}

export async function POST(request) {
  try {
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid request body." },
        { status: 400 }
      );
    }

    const { sessionId } = body;

    if (!sessionId) {
      return NextResponse.json(
        { error: "sessionId is required." },
        { status: 400 }
      );
    }

    // Retrieve the checkout session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["payment_intent"],
    });

    if (session.status !== "complete") {
      return NextResponse.json(
        { error: "Payment is not yet complete." },
        { status: 402 }
      );
    }

    const db = await getDb();
    const fundingCollection = db.collection("fundings");

    // Idempotency: only insert if this session hasn't been recorded yet
    const existing = await fundingCollection.findOne({
      checkoutSessionId: session.id,
    });

    if (existing) {
      // Already saved — return the existing record without duplication
      return NextResponse.json({
        message: "Already recorded.",
        funding: existing,
      });
    }

    const paymentIntent = session.payment_intent;

    const fundingDoc = {
      userId: session.metadata?.userId || null,
      userEmail: session.metadata?.userEmail || session.customer_details?.email || null,
      // amount in BDT (convert from paisa)
      amount: session.amount_total / 100,
      currency: session.currency?.toUpperCase() || "BDT",
      paymentIntent: typeof paymentIntent === "string"
        ? paymentIntent
        : paymentIntent?.id || null,
      checkoutSessionId: session.id,
      paymentStatus: session.payment_status,
      createdAt: new Date(),
    };

    await fundingCollection.insertOne(fundingDoc);

    return NextResponse.json({
      message: "Funding recorded successfully.",
      funding: fundingDoc,
    });
  } catch (err) {
    console.error("[/api/payment/confirm POST]", err);
    return NextResponse.json(
      { error: err.message || "An unexpected error occurred." },
      { status: err.statusCode || 500 }
    );
  }
}
