import { ApolloServer } from "apollo-server";
import { inferAugmentedSchema, driver } from "./neo4j";
import { PORT } from "./config";
import { GraphQLSchema } from "graphql";

const createServer = (augmentedSchema: GraphQLSchema) =>
  new ApolloServer({
    schema: augmentedSchema,
    // inject the request object into the context to support middleware
    // inject the Neo4j driver instance to handle database call
    context: ({ req }) => {
      return {
        driver,
        req,
      };
    },
  });

inferAugmentedSchema(driver)
  .then(createServer)
  .then((server: ApolloServer) => server.listen(PORT, "0.0.0.0"))
  .then(({ url }: { url: string }) => {
    console.log(`GraphQL API ready at ${url}`);
  })
  .catch((err: Error) => console.error(err));
