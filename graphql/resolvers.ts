import { Category } from "@/models/Category";
import { Expense } from "@/models/Expense";

console.log("Resolvers - Environment check:", {
  DB_HOST: process.env.DB_HOST,
  DB_NAME: process.env.DB_NAME,
  DB_USER: process.env.DB_USER,
  DB_PORT: process.env.DB_PORT,
});

export const resolvers = {
  Query: {
    categories: async () => {
      return await Category.findAll({
        order: [["id", "DESC"]],
      });
    },

    category: async (_: unknown, { id }: { id: string }) => {
      return await Category.findByPk(Number(id));
    },
    expenses: async () => {
      return await Expense.findAll({
        order: [["id", "DESC"]],
      });
    },

    expense: async (_: unknown, { id }: { id: string }) => {
      return await Expense.findByPk(Number(id));
    },
  },

  Mutation: {
    createCategory: async (
      _: unknown,
      { title }: { title: string }
    ) => {
       const category = await Category.create({
            title,
        });
        console.log(category.toJSON())
        return category.toJSON();
    },

    updateCategory: async (
      _: unknown,
      { id, title }: { id: string; title: string }
    ) => {
      const category = await Category.findByPk(Number(id));

      if (!category) {
        throw new Error("Category not found");
      }

      category.title = title;
      await category.save();

      return category.toJSON();;
    },

    deleteCategory: async (
      _: unknown,
      { id }: { id: string }
    ) => {
      const category = await Category.findByPk(Number(id));

      if (!category) {
        throw new Error("Category not found");
      }

      await category.destroy();

      return true;
    },
     // Expense APIs
    createExpense: async (
      _: unknown,
      {
        category_id,
        amount,
        description,
        expense_date,
      }: {
        category_id: string;
        amount: number;
        description?: string;
        expense_date: string;
      }
    ) => {
      const category = await Category.findByPk(
        Number(category_id)
      );

      if (!category) {
        throw new Error("Category not found");
      }

      return await Expense.create({
        category_id: Number(category_id),
        amount,
        description,
        expense_date,
      });
    },

    updateExpense: async (
      _: unknown,
      {
        id,
        category_id,
        amount,
        description,
        expense_date,
      }: {
        id: string;
        category_id: string;
        amount: number;
        description?: string;
        expense_date: string;
      }
    ) => {
      const expense = await Expense.findByPk(Number(id));

      if (!expense) {
        throw new Error("Expense not found");
      }

      expense.category_id = Number(category_id);
      expense.amount = amount;
      expense.description = description ?? null;
      expense.expense_date = expense_date;

      await expense.save();

      return expense;
    },

    deleteExpense: async (
      _: unknown,
      { id }: { id: string }
    ) => {
      const expense = await Expense.findByPk(Number(id));

      if (!expense) {
        throw new Error("Expense not found");
      }

      await expense.destroy();

      return true;
    },
  },
};