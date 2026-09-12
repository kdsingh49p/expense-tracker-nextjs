import { testConnection } from "./sequelize";
import "@/models/Category";
import "@/models/Expense";

// Test database connection on server startup
testConnection().catch((error) => {
  console.error("Failed to initialize database:", error);
  process.exit(1);
});
