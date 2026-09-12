"use client";

import {
  addExpense,
  getAllExpenses,
  updateExpense,
} from "@/services/expense";

import { getAllCategories } from "@/services/category";
import { Category } from "@/types/category";
import { Expense } from "@/types/expense";
import { useEffect, useState } from "react";

export default function Expenses() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category_id, setCategoryId] = useState("");
  const [expense_date, setExpenseDate] = useState("");

  const [editData, setEditData] = useState<Record<number, Expense>>({});

  useEffect(() => {
    async function fetchData() {
      try {
        const [expensesData, categoriesData] = await Promise.all([
          getAllExpenses(),
          getAllCategories(),
        ]);

        setExpenses(expensesData);
        setCategories(categoriesData);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  const save = async () => {
    try {
      const latestExpense = await addExpense({
        category_id: Number(category_id),
        amount: Number(amount),
        description,
        expense_date,
      });

      setExpenses((prevExpenses) => [
        latestExpense,
        ...prevExpenses,
      ]);

      setAmount("");
      setDescription("");
      setCategoryId("");
      setExpenseDate("");
    } catch (error) {
      console.error(error);
    }
  };

  const editMode = (expense: Expense) => {
    setEditData((prevState) => ({
      ...prevState,
      [expense.id]: {
        ...expense,
      },
    }));
  };

  const updateEditData = (
    id: number,
    field: keyof Expense,
    value: string
  ) => {
    setEditData((prevState) => ({
      ...prevState,
      [id]: {
        ...prevState[id],
        [field]:
          field === "amount" || field === "category_id"
            ? Number(value)
            : value,
      },
    }));
  };

  const updateExpense_ = async (id: number) => {
    try {
      const expense = editData[id];

      const updatedExpense = await updateExpense(id, {
        category_id: expense.category_id,
        amount: expense.amount,
        description: expense.description ?? "",
        expense_date: expense.expense_date,
      });

      setExpenses((prevExpenses) =>
        prevExpenses.map((item) =>
          item.id === id ? updatedExpense : item
        )
      );

      setEditData((prevState) => {
        const newState = { ...prevState };
        delete newState[id];
        return newState;
      });
    } catch (error) {
      console.error(error);
    }
  };

  const cancelEdit = (id: number) => {
    setEditData((prevState) => {
      const newState = { ...prevState };
      delete newState[id];
      return newState;
    });
  };

  const getCategoryTitle = (categoryId: number) => {
    const category = categories.find(
      (category) => category.id === categoryId
    );

    return category?.title ?? "Unknown";
  };

  return (
    <div className="min-h-screen bg-zinc-50 p-4 sm:p-6 lg:p-8">

      {/* Page Header */}
      <div className="mb-6 sm:mb-8">
        <h2 className="text-xl font-semibold tracking-tight text-zinc-900 sm:text-2xl">
          Expenses
        </h2>

        <p className="mt-1 text-sm text-zinc-500">
          Create and manage your expenses.
        </p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">

        {/* Create Expense */}
        <div className="md:col-span-1">
          <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm sm:p-6">

            <h3 className="text-base font-semibold text-zinc-900 sm:text-lg">
              Create Expense
            </h3>

            <p className="mt-1 text-sm text-zinc-500">
              Add a new expense.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                save();
              }}
              className="mt-5 space-y-5"
            >

              {/* Amount */}
              <div>
                <label
                  htmlFor="amount"
                  className="mb-2 block text-sm font-medium text-zinc-700"
                >
                  Amount
                </label>

                <input
                  id="amount"
                  type="number"
                  min="0"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="e.g. 500"
                  className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Category */}
              <div>
                <label
                  htmlFor="category_id"
                  className="mb-2 block text-sm font-medium text-zinc-700"
                >
                  Category
                </label>

                <select
                  id="category_id"
                  value={category_id}
                  onChange={(e) =>
                    setCategoryId(e.target.value)
                  }
                  className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-sm text-zinc-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="">
                    Select category
                  </option>

                  {categories.map((category) => (
                    <option
                      key={category.id}
                      value={category.id}
                    >
                      {category.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Description */}
              <div>
                <label
                  htmlFor="description"
                  className="mb-2 block text-sm font-medium text-zinc-700"
                >
                  Description
                </label>

                <input
                  id="description"
                  type="text"
                  value={description}
                  onChange={(e) =>
                    setDescription(e.target.value)
                  }
                  placeholder="e.g. Grocery shopping"
                  className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Expense Date */}
              <div>
                <label
                  htmlFor="expense_date"
                  className="mb-2 block text-sm font-medium text-zinc-700"
                >
                  Expense Date
                </label>

                <input
                  id="expense_date"
                  type="date"
                  value={expense_date}
                  onChange={(e) =>
                    setExpenseDate(e.target.value)
                  }
                  className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-sm text-zinc-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Submit */}
              <button
                disabled={ category_id == "" || amount == "" || description == "" || expense_date==""}
                type="submit"
                className={(category_id == "" || amount == "" || description == "" || expense_date=="") ? "w-full rounded-lg  px-4 py-2.5 text-sm font-medium text-black transition disabled:cursor-not-allowed disabled:opacity-50" : "w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"}
              >
                Add Expense
              </button>

            </form>
          </div>
        </div>

        {/* Expense Table */}
        <div className="md:col-span-2">

          <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">

            {/* Table Header */}
            <div className="border-b border-zinc-200 px-4 py-4 sm:px-6">
              <h3 className="text-base font-semibold text-zinc-900 sm:text-lg">
                All Expenses
              </h3>

              <p className="mt-1 text-sm text-zinc-500">
                {expenses.length} expense
                {expenses.length === 1 ? "" : "s"}
              </p>
            </div>

            {/* Responsive Table */}
            <div className="overflow-x-auto">
              <table className="min-w-[850px] w-full text-sm">

                <thead className="bg-zinc-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500 sm:px-6">
                      ID
                    </th>

                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500 sm:px-6">
                      Amount
                    </th>

                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500 sm:px-6">
                      Category
                    </th>

                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500 sm:px-6">
                      Description
                    </th>

                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500 sm:px-6">
                      Date
                    </th>

                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500 sm:px-6">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>

                  {expenses.length === 0 ? (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-6 py-12 text-center text-sm text-zinc-500"
                      >
                        No expenses found.
                      </td>
                    </tr>
                  ) : (
                    expenses.map((expense) => (
                      <tr
                        key={expense.id}
                        className="border-b border-zinc-100 transition last:border-0 hover:bg-zinc-50"
                      >

                        {/* ID */}
                        <td className="px-4 py-4 font-medium text-zinc-600 sm:px-6">
                          {expense.id}
                        </td>

                        {/* Amount */}
                        <td className="px-4 py-4 sm:px-6">
                          {editData[expense.id] !== undefined ? (
                            <input
                              type="number"
                              value={
                                editData[expense.id].amount
                              }
                              onChange={(e) =>
                                updateEditData(
                                  expense.id,
                                  "amount",
                                  e.target.value
                                )
                              }
                              className="w-28 rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />
                          ) : (
                            <span className="font-medium text-zinc-900">
                              ₹{expense.amount}
                            </span>
                          )}
                        </td>

                        {/* Category */}
                        <td className="px-4 py-4 sm:px-6">
                          {editData[expense.id] !== undefined ? (
                            <select
                              value={
                                editData[expense.id].category_id
                              }
                              onChange={(e) =>
                                updateEditData(
                                  expense.id,
                                  "category_id",
                                  e.target.value
                                )
                              }
                              className="rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            >
                              {categories.map((category) => (
                                <option
                                  key={category.id}
                                  value={category.id}
                                >
                                  {category.title}
                                </option>
                              ))}
                            </select>
                          ) : (
                            <span className="text-zinc-700">
                              {getCategoryTitle(
                                expense.category_id
                              )}
                            </span>
                          )}
                        </td>

                        {/* Description */}
                        <td className="px-4 py-4 sm:px-6">
                          {editData[expense.id] !== undefined ? (
                            <input
                              type="text"
                              value={
                                editData[expense.id]
                                  .description ?? ""
                              }
                              onChange={(e) =>
                                updateEditData(
                                  expense.id,
                                  "description",
                                  e.target.value
                                )
                              }
                              className="w-full max-w-xs rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />
                          ) : (
                            <span className="text-zinc-700">
                              {expense.description || "-"}
                            </span>
                          )}
                        </td>

                        {/* Date */}
                        <td className="px-4 py-4 sm:px-6">
                          {editData[expense.id] !== undefined ? (
                            <input
                              type="date"
                              value={
                                editData[expense.id].expense_date
                              }
                              onChange={(e) =>
                                updateEditData(
                                  expense.id,
                                  "expense_date",
                                  e.target.value
                                )
                              }
                              className="rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />
                          ) : (
                            <span className="text-zinc-700">
                              {expense.expense_date}
                            </span>
                          )}
                        </td>

                        {/* Action */}
                        <td className="px-4 py-4 sm:px-6">
                          {editData[expense.id] !== undefined ? (
                            <div className="flex gap-2">

                              <button
                                type="button"
                                onClick={() =>
                                  updateExpense_(expense.id)
                                }
                                className="rounded-md bg-green-600 px-3 py-2 text-xs font-medium text-white transition hover:bg-green-700 sm:text-sm"
                              >
                                Save
                              </button>

                              <button
                                type="button"
                                onClick={() =>
                                  cancelEdit(expense.id)
                                }
                                className="rounded-md border border-zinc-300 bg-white px-3 py-2 text-xs font-medium text-zinc-700 transition hover:bg-zinc-100 sm:text-sm"
                              >
                                Cancel
                              </button>

                            </div>
                          ) : (
                            <button
                              type="button"
                              onClick={() =>
                                editMode(expense)
                              }
                              className="rounded-md border border-zinc-300 bg-white px-3 py-2 text-xs font-medium text-zinc-700 transition hover:bg-zinc-100 sm:text-sm"
                            >
                              Edit
                            </button>
                          )}
                        </td>

                      </tr>
                    ))
                  )}

                </tbody>
              </table>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
