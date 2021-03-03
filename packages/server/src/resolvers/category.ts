import { IResolvers } from "apollo-server";
import { Session } from "neo4j-driver";

const resolvers: IResolvers = {
  Query: {
    categories: (parent, args, context) => {
      const session: Session = context.driver.session();
      const query = ["MATCH (category:Category)", "RETURN category"].join("\n");
      return session
        .run(query)
        .then((result) =>
          result.records.map((record) => record.get("category").properties)
        );
    },
    category: (parent, { value }, context) => {
      const session: Session = context.driver.session();
      const query = [
        "MATCH (category:Category)",
        "WHERE category.value = $value",
        "RETURN category",
      ].join("\n");
      const params = {
        value,
      };
      return session
        .run(query, params)
        .then((result) => result.records[0].get("category").properties);
    },
  },
  Category: {
    products: (category, args, context) => {
      const session: Session = context.driver.session();
      const query = [
        "MATCH (category:Category)",
        "WHERE category.value = $category",
        "WITH category",
        "MATCH (category)<-[:IN]-(product:Product)",
        "RETURN product",
      ].join("\n");
      const params = {
        category: category.value,
      };
      return session
        .run(query, params)
        .then((result) =>
          result.records.map((record) => record.get("product").properties)
        );
    },
  },
};

export default resolvers;
