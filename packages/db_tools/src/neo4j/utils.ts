import driver from "./index";
import { QueryResult } from "neo4j-driver";

export function run(cypher: string, params?: any): Promise<QueryResult> {
  const session = driver.session();
  return new Promise(async (resolve, reject) => {
    try {
      const result = await session.run(cypher, params);
      resolve(result);
    } catch (error) {
      console.log(error.message);
      reject(error);
    } finally {
      session.close();
    }
  });
}
