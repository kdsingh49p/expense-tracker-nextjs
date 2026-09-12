import { serverURL } from "./server";

const CATEGORY_QUERY = `
  query {
    categories {
      id
      title
    }
  }
`;

const CATEGORY_ADD = `
mutation CreateCategory($title: String!) {
    createCategory(title: $title) {
        id
        title
    }
}
`;
const CATEGORY_UPDATE = `
mutation updateCategory($id: ID!, $title: String!) {
    updateCategory(id: $id, title: $title) {
        id
        title
    }
}
`;

export async function getAllCategories() {
  const response = await fetch(serverURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: CATEGORY_QUERY,
      variables: {},
    }),
  });

  const result = await response.json();

  if (result.errors) {
    throw new Error(result.errors[0].message);
  }

  return result.data.categories;
}

export async function updateCategory(id: number, title: string) {
  const response = await fetch(serverURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: CATEGORY_UPDATE,
      variables: {
        id: id,
        title: title,
      },
    }),
  });
  const result = await response.json();
  if (result.errors) {
    throw new Error(result.errors[0].message);
  }

  return result.data.updateCategory;
}
export async function addCategory(title: string) {
  const response = await fetch(serverURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: CATEGORY_ADD,
      variables: {
        title: title,
      },
    }),
  });

  const result = await response.json();
  if (result.errors) {
    throw new Error(result.errors[0].message);
  }

  return result.data.createCategory;
}
