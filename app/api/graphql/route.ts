import { createYoga, createSchema } from "graphql-yoga";

import { typeDefs } from "@/graphql/schema";
import { resolvers } from "@/graphql/resolvers";

const yoga = createYoga({
  schema: createSchema({
    typeDefs,
    resolvers,
  }),
  graphqlEndpoint: "/api/graphql",
});

export const GET = async (request: Request) => {
  return yoga.handleRequest(request, {});
};

export const POST = async (request: Request) => {
  return yoga.handleRequest(request, {});
};
