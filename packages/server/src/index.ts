import { ApolloServer } from "apollo-server";
import { driver } from "./neo4j";
import { PORT } from "./config";
import path from "path";
import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";

const resolversArray = loadFilesSync(path.join(__dirname, "./resolvers"));
const resolvers = mergeResolvers(resolversArray);
const typesArray = loadFilesSync(path.join(__dirname, "./schema"));
const typeDefs = mergeTypeDefs(typesArray);

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
