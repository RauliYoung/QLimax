import { startServerAndCreateNextHandler } from "@as-integrations/next";
import mongoConnect from "@/app/lib/db";
import { ApolloServer } from "@apollo/server";
import { NextRequest } from "next/server";
import typeDefs from "./schema";
import resolvers from "./resolvers";
import {Users,Posts} from "./datasources";
import UserModel from "@/app/models/userModel";
import PostModel from "@/app/models/postModel";

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
      posts: new Posts({ modelOrCollection: PostModel }),
    },
  }),
});
export async function GET(request: NextRequest) {
  return handler(request);
}
export async function POST(request: NextRequest) {
  return handler(request);
}
