import neo4j from "neo4j-driver";
import { NEO_URI, NEO_USER, NEO_PASS } from "../config";
const driver = neo4j.driver(
  NEO_URI,
  neo4j.auth.basic(NEO_USER, NEO_PASS),
  //neo4j.auth.basic('neo4j', 'ci'),
  { encrypted: false }
);

export default driver;
