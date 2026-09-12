"use client";

import {
  addCategory,
  getAllCategories,
  updateCategory,
} from "@/services/category";

import { Category } from "@/types/category";
import { useEffect, useState } from "react";

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [title, setTitle] = useState("");
  const [editData, setEditData] = useState<Record<number, string>>({});

  useEffect(() => {
    async function fetchCategories() {
      const categories = await getAllCategories();
      setCategories(categories);
    }

    fetchCategories();
  }, []);

  const save = async () => {
    try {
      const latestCategory = await addCategory(title);

      setCategories((prevCategories) => [
        ...prevCategories,
        latestCategory,
      ]);

      setTitle("");
    } catch (error) {
      console.error(error);
    }
  };

  const editMode = (category: Category) => {
    setEditData((prevState) => ({
      ...prevState,
      [category.id]: category.title,
    }));
  };

  const updateEditData = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number,
  ) => {
    setEditData((prevState) => ({
      ...prevState,
      [id]: e.target.value,
    }));
  };
  const cancelEdit = (id: number) => {
  setEditData((prevState) => {
    const newState = { ...prevState };
    delete newState[id];
    return newState;
  });
};
  const updateCategory_ = async (id: number) => {
    try {
      const updatedCategory = await updateCategory(
        id,
        editData[id],
      );

      setCategories((prevCategories) =>
        prevCategories.map((category) =>
          category.id === id ? updatedCategory : category,
        ),
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

  return (
    <div className="min-h-screen bg-zinc-50 p-4 sm:p-6 lg:p-8">

      {/* Page Header */}
      <div className="mb-6 sm:mb-8">
        <h2 className="text-xl font-semibold tracking-tight text-zinc-900 sm:text-2xl">
          Categories
        </h2>

        <p className="mt-1 text-sm text-zinc-500">
          Create and manage your expense categories.
        </p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">

        {/* Create Category */}
        <div className="md:col-span-1">
          <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm sm:p-6">

            <h3 className="text-base font-semibold text-zinc-900 sm:text-lg">
              Create Category
            </h3>

            <p className="mt-1 text-sm text-zinc-500">
              Add a new category.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                save();
              }}
              className="mt-5 space-y-5"
            >
              <div>
                <label
                  htmlFor="title"
                  className="mb-2 block text-sm font-medium text-zinc-700"
                >
                  Category Name
                </label>

                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Food"
                  className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Add Category
              </button>
            </form>

          </div>
        </div>

        {/* Categories Table */}
        <div className="md:col-span-2">

          <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">

            {/* Table Header */}
            <div className="border-b border-zinc-200 px-4 py-4 sm:px-6">
              <h3 className="text-base font-semibold text-zinc-900 sm:text-lg">
                All Categories
              </h3>

              <p className="mt-1 text-sm text-zinc-500">
                {categories.length} categor
                {categories.length === 1 ? "y" : "ies"}
              </p>
            </div>

            {/* Responsive Table */}
            <div className="overflow-x-auto">
              <table className="min-w-[600px] w-full text-sm">

                <thead className="bg-zinc-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500 sm:px-6">
                      ID
                    </th>

                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500 sm:px-6">
                      Category
                    </th>

                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500 sm:px-6">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>

                  {categories.length === 0 ? (
                    <tr>
                      <td
                        colSpan={3}
                        className="px-6 py-12 text-center text-sm text-zinc-500"
                      >
                        No categories found.
                      </td>
                    </tr>
                  ) : (
                    categories.map((category) => (
                      <tr
                        key={category.id}
                        className="border-b border-zinc-100 transition last:border-0 hover:bg-zinc-50"
                      >

                        {/* ID */}
                        <td className="px-4 py-4 font-medium text-zinc-600 sm:px-6">
                          {category.id}
                        </td>

                        {/* Category */}
                        <td className="px-4 py-4 sm:px-6">
                          {editData[category.id] !== undefined ? (
                            <input
                              type="text"
                              value={editData[category.id]}
                              onChange={(e) =>
                                updateEditData(e, category.id)
                              }
                              className="w-full max-w-sm rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />
                          ) : (
                            <span className="font-medium text-zinc-900">
                              {category.title}
                            </span>
                          )}
                        </td>

                        {/* Action */}
                        <td className="px-4 py-4 sm:px-6">
                        {editData[category.id] !== undefined ? (
                            <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={() => updateCategory_(category.id)}
                                className="rounded-md bg-green-600 px-3 py-2 text-xs font-medium text-white transition hover:bg-green-700 sm:text-sm"
                            >
                                Save
                            </button>

                            <button
                                type="button"
                                onClick={() => cancelEdit(category.id)}
                                className="rounded-md border border-zinc-300 bg-white px-3 py-2 text-xs font-medium text-zinc-700 transition hover:bg-zinc-100 sm:text-sm"
                            >
                                X
                            </button>
                            </div>
                        ) : (
                            <button
                            type="button"
                            onClick={() => editMode(category)}
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
