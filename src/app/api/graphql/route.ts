import { startServerAndCreateNextHandler } from "@as-integrations/next";
import mongoConnect from "@/app/lib/db";
import { ApolloServer } from "@apollo/server";
import { NextRequest } from "next/server";
import typeDefs from "./schema";
import resolvers from "./resolvers";
import Users from "./datasources";
import UserModel from "@/app/models/userModel";

mongoConnect();

const server = new ApolloServer({
  resolvers,
  typeDefs,
});

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req, res) => ({
    req,
    res,
    dataSources: {
      users: new Users({ modelOrCollection: UserModel }),
    },
  }),
});
export async function GET(request: NextRequest) {
  return handler(request);
}
export async function POST(request: NextRequest) {
  return handler(request);
}
