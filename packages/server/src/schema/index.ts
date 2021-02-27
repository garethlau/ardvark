import { gql } from "apollo-server";

export const typeDefs = gql`
  type Product {
    id: String!
    name: String!
    description: String!
    price: String!
    categories: [Category]
    manufacturer: Manufacturer
    similar: [Product]
  }

  type Manufacturer {
    value: String!
  }

  type Category {
    value: String!
  }

  type ProductConnection {
    hasMore: Boolean!
    products: [Product]!
  }

  type Query {
    productsConnection(
      """
      The number of results to show. Must be >= 1. Default = 20.
      """
      limit: Int

      """
      The number of results to skip. Default = 0.
      """
      skip: Int
    ): ProductConnection!
    product(id: String!): Product!
  }
`;

export default typeDefs;
