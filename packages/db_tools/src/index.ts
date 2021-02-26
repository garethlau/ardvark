import csv from "csv-parser";
import * as fs from "fs";
import path from "path";
import { Product } from "./interfaces";
import dotenv from "dotenv";
dotenv.config();

import { run } from "./neo4j/utils";
import { connect } from "http2";

async function readCsv(): Promise<Product[]> {
  return new Promise((resolve, reject) => {
    const products: Product[] = [];

    const filepath: string = path.join(
      "public",
      "data",
      "amazon_co-ecommerce_sample.csv"
    );

    fs.createReadStream(filepath)
      .pipe(csv())
      .on("data", (data: any) => {
        const categories: string[] = data.amazon_category_and_sub_category.split(
          " > "
        );

        const product: Product = {
          id: data.uniq_id,
          name: data.product_name,
          manufacturer: data.manufacturer,
          price: data.price,
          categories,
          description: data.description,
        };

        products.push(product);
      })
      .on("end", () => {
        resolve(products);
      })
      .on("error", (error) => reject(error));
  });
}

async function createCategories(categories: string[]) {
  const cypher = [
    "FOREACH (value IN $categories | MERGE (category:Category { value: value }))",
  ].join("\n");
  await run(cypher, { categories });
}

async function createManufacturers(manufacturers: string[]) {
  const cypher = [
    "FOREACH (value IN $manufacturers | MERGE (manufacturer:Manufacturer { value: value }))",
  ].join("\n");
  await run(cypher, { manufacturers });
}

async function createProducts(products: Product[]) {
  const cypher = [
    "UNWIND $products AS product",
    "CREATE (p:Product)",
    "SET p = product",
  ].join("\n");
  const params = {
    products: products.map(({ id, name, description, price }) => ({
      id,
      name,
      description,
      price,
    })),
  };

  await run(cypher, params);
}

async function connectCategories(p2c: Array<Record<string, string>>) {
  const cypher = [
    "UNWIND $p2cs AS p2c",
    "MATCH (product:Product)",
    "WHERE product.id = p2c.productId",
    "WITH product, p2c",
    "MATCH (category:Category) WHERE category.value = p2c.category",
    "CREATE (product)-[:IN]->(category)",
    "RETURN product",
  ].join("\n");

  const params = { p2cs: p2c };
  const result = await run(cypher, params);
  // console.log(result);
}

async function connectManufacturers(p2m: Array<Record<string, string>>) {
  const cypher = [
    "UNWIND $p2ms AS p2m",
    "MATCH (product:Product)",
    "WHERE product.id = p2m.productId",
    "WITH product, p2m",
    "MATCH (manufacturer:Manufacturer) WHERE manufacturer.value = p2m.manufacturer",
    "CREATE (product)-[:MADE_BY]->(manufacturer)",
    "RETURN product",
  ].join("\n");

  const params = { p2ms: p2m };
  const result = await run(cypher, params);
}

(async function () {
  const products: Product[] = await readCsv();

  const categorySet = new Set<string>();
  const manufacturerSet = new Set<string>();

  const p2c: Array<Record<string, string>> = [];
  const p2m: Array<Record<string, string>> = [];

  products.forEach(({ id, categories, manufacturer }) => {
    categories.forEach((category) => {
      p2c.push({ productId: id, category });
      categorySet.add(category);
    });

    manufacturerSet.add(manufacturer);
    p2m.push({ productId: id, manufacturer });
  });

  // await createCategories(Array.from(categorySet));
  // await createManufacturers(Array.from(manufacturerSet));
  // await createProducts(products);

  const size = 100;
  // while (p2c.length > 0) {
  //   let chunk = p2c.splice(0, size);
  //   await connectCategories(chunk);
  // }

  while (p2m.length > 0) {
    let chunk = p2m.splice(0, size);
    // await connectManufacturers(chunk);
  }
  console.log("Done");
})();
