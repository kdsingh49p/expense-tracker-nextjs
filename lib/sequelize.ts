import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  process.env.DB_NAME!,
  process.env.DB_USER!,
  process.env.DB_PASSWORD!,
  {
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 3306,
    dialect: "mysql",
    dialectModule: require("mysql2"),
    logging: false,
  }
);

export async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("✓ Database connection established successfully.");
  } catch (error) {
    console.error("✗ Unable to connect to the database:", error);
    throw error;
  }
}