import neo4j, { Driver } from "neo4j-driver";
import { NEO4J_URI, NEO4J_USER, NEO4J_PASSWORD } from "../config";
import { makeAugmentedSchema, inferSchema } from "neo4j-graphql-js";

export const driver = neo4j.driver(
  NEO4J_URI,
  neo4j.auth.basic(NEO4J_USER, NEO4J_PASSWORD),
  { encrypted: false }
);

const schemaInferenceOptions = {
  alwaysIncludeRelationships: false,
};

export const inferAugmentedSchema = (driver: Driver) => {
  return inferSchema(driver, schemaInferenceOptions).then((result: any) => {
    console.log("TYPEDEFS:");
    console.log(result.typeDefs);

    return makeAugmentedSchema({
      typeDefs: result.typeDefs,
    });
  });
};
