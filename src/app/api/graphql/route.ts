import {startServerAndCreateNextHandler} from '@as-integrations/next';
import mongoConnect from '@/app/lib/db';
import {ApolloServer} from '@apollo/server';
import {NextRequest} from 'next/server';
import typeDefs from './schema';
import resolvers from './resolvers';
import {Users, Posts} from './datasources';
import UserModel from '@/app/models/userModel';
import PostModel from '@/app/models/postModel';
import {makeExecutableSchema} from 'graphql-tools';
import jwt from 'jsonwebtoken';

mongoConnect();

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const server = new ApolloServer({
  schema,
});

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req, res) => {
    const authHeader = req.headers.get('authorization') || '';
    const token = authHeader.split(' ')[1];
    let user = null;
    const jwtsecret = process.env.JWT_SECRET || '';

    try {
      if (token) {
        user = jwt.verify(token, jwtsecret);
      }
    } catch (e) {
      console.log('Invalid token');
      console.log(e);
    }

    return {
      req,
      res,
      user, 
      dataSources: {
        users: new Users({modelOrCollection: UserModel as any}),
        posts: new Posts({modelOrCollection: PostModel as any}),
      },
    };
  },
});
export async function GET(request: NextRequest) {
  const response = await handler(request);
  response.headers.set('Access-Control-Allow-Origin', '*');
  return response;
}
export async function POST(request: NextRequest) {
  const response = await handler(request);
  response.headers.set('Access-Control-Allow-Origin', '*');
  return response;
}
