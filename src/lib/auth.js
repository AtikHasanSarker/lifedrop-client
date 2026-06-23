import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db("lifedrop");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      role: {
        defaultValue: "donor",
      },
    },
  },
//   session: {
//     cookieCache: {
//       enabled: true,
//       strategy: "jwt",
//       maxAge: 60 * 24 * 60,
//     },
//   },
//   plugins: [jwt()],
});
