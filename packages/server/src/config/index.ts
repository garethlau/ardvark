import dotenv from "dotenv";

dotenv.config();

export const NEO4J_URI = process.env.NEO4J_URI || "";
export const NEO4J_USER = process.env.NEO4J_USER || "user";
export const NEO4J_PASSWORD = process.env.NEO4J_PASSWORD || "letmeinplease";
export const PORT = process.env.PORT || 5000;
