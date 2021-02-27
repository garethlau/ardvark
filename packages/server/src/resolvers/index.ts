import { ResolverFn, IResolvers } from "apollo-server";
import { Session } from "neo4j-driver";
import { int } from "neo4j-driver";

const resolvers: IResolvers = {
  Query: {
    product: (parent, args, context) => {
      const session: Session = context.driver.session();
      const query = [
        "MATCH (product:Product)",
        "WHERE product.id = $id",
        "RETURN product",
      ].join("\n");
      const params = {
        id: args.id,
      };
      return session.run(query, params).then((result) => {
        return result.records[0].get("product").properties;
      });
    },
    products: async (parent, { limit = 20, skip = 0 }, context) => {
      const session: Session = context.driver.session();
      const query = [
        "MATCH (product:Product) RETURN product SKIP $skip LIMIT $limit",
      ].join("\n");
      const params = { skip: int(skip), limit: int(limit) };

      const result = session.run(query, params);
      const products = (await result).records.map(
        (record) => record.get("product").properties
      );
      let hasMore = true;
      if (products.length < limit) {
        hasMore = false;
      }

      return {
        hasMore,
        products,
      };
    },
  },
  Product: {
    similar: (product, { skip = 0, limit = 5 }, context) => {
      const session: Session = context.driver.session();
      const query = [
        "MATCH (p:Product)-[:IN]->(category:Category)<-[:IN]-(product:Product)",
        "WHERE p.id = $productId",
        "RETURN product",
        "SKIP $skip LIMIT $limit",
      ].join("\n");
      const params = {
        productId: product.id,
        skip: int(skip),
        limit: int(limit),
      };
      return session
        .run(query, params)
        .then((result) =>
          result.records.map((record) => record.get("product").properties)
        );
    },
    categories: (product, args, context) => {
      const session: Session = context.driver.session();
      const query = [
        "MATCH (product:Product)-[:IN]->(category:Category)",
        "WHERE product.id = $productId",
        "RETURN category",
      ].join("\n");
      const params = { productId: product.id };
      return session
        .run(query, params)
        .then((result) =>
          result.records.map((record) => record.get("category").properties)
        );
    },
    manufacturer: (product, args, context) => {
      const session: Session = context.driver.session();
      const query = [
        "MATCH (product:Product)-[:MADE_BY]->(manufacturer:Manufacturer)",
        "WHERE product.id = $productId",
        "RETURN manufacturer",
      ].join("\n");
      const params = {
        productId: product.id,
      };
      return session
        .run(query, params)
        .then((result) => result.records[0].get("manufacturer").properties);
    },
  },
};

export default resolvers;
