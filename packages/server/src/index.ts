import { ApolloServer } from "apollo-server";
import { inferAugmentedSchema, driver } from "./neo4j";
import { PORT } from "./config";
import { GraphQLSchema } from "graphql";
import typeDefs from "./schema";
import resolvers from "./resolvers";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    return {
      driver,
      req,
    };
  },
});
server.listen(PORT).then(({ url }: { url: string }) => {
  console.log(`GraphQL API ready at ${url}`);
});
