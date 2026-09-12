import { Sequelize } from "sequelize";

const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 3306,
  dialect: "mysql" as const,
  dialectModule: require("mysql2"),
  logging: false,
};

console.log("Database config:", {
  host: dbConfig.host,
  port: dbConfig.port,
  hasDBName: !!process.env.DB_NAME,
  hasDBUser: !!process.env.DB_USER,
  hasDBPassword: !!process.env.DB_PASSWORD,
});

export const sequelize = new Sequelize(
  process.env.DB_NAME!,
  process.env.DB_USER!,
  process.env.DB_PASSWORD!,
  dbConfig
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