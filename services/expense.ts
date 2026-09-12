import { serverURL } from "./server";

const EXPENSE_QUERY = `
  query {
    expenses {
      id
      category_id
      amount
      description
      expense_date
    }
  }
`;

const EXPENSE_ADD = `
  mutation CreateExpense(
    $category_id: ID!
    $amount: Float!
    $description: String
    $expense_date: String!
  ) {
    createExpense(
      category_id: $category_id
      amount: $amount
      description: $description
      expense_date: $expense_date
    ) {
      id
      category_id
      amount
      description
      expense_date
    }
  }
`;

const EXPENSE_UPDATE = `
  mutation UpdateExpense(
    $id: ID!
    $category_id: ID!
    $amount: Float!
    $description: String
    $expense_date: String!
  ) {
    updateExpense(
      id: $id
      category_id: $category_id
      amount: $amount
      description: $description
      expense_date: $expense_date
    ) {
      id
      category_id
      amount
      description
      expense_date
    }
  }
`;

const EXPENSE_DELETE = `
  mutation DeleteExpense($id: ID!) {
    deleteExpense(id: $id)
  }
`;

export async function getAllExpenses() {
  const response = await fetch(serverURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: EXPENSE_QUERY,
      variables: {},
    }),
  });

  const result = await response.json();

  if (result.errors) {
    throw new Error(result.errors[0].message);
  }

  return result.data.expenses;
}

export async function addExpense({
  category_id,
  amount,
  description,
  expense_date,
}: {
  category_id: number;
  amount: number;
  description?: string;
  expense_date: string;
}) {
  const response = await fetch(serverURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: EXPENSE_ADD,
      variables: {
        category_id: String(category_id),
        amount,
        description,
        expense_date,
      },
    }),
  });

  const result = await response.json();

  if (result.errors) {
    throw new Error(result.errors[0].message);
  }

  return result.data.createExpense;
}

export async function updateExpense(
  id: number,
  {
    category_id,
    amount,
    description,
    expense_date,
  }: {
    category_id: number;
    amount: number;
    description?: string;
    expense_date: string;
  }
) {
  const response = await fetch(serverURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: EXPENSE_UPDATE,
      variables: {
        id: String(id),
        category_id: String(category_id),
        amount,
        description,
        expense_date,
      },
    }),
  });

  const result = await response.json();

  if (result.errors) {
    throw new Error(result.errors[0].message);
  }

  return result.data.updateExpense;
}

export async function deleteExpense(id: number) {
  const response = await fetch(serverURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: EXPENSE_DELETE,
      variables: {
        id: String(id),
      },
    }),
  });

  const result = await response.json();

  if (result.errors) {
    throw new Error(result.errors[0].message);
  }

  return result.data.deleteExpense;
}
