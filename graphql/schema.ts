export const typeDefs = `

    type Category{
        id: ID!
        title: String!
    }

    type Expense{
        id: ID!
        category_id: ID! 
        amount: Float!
        expense_date: String!
        description: String
    }

    type Query {
        categories: [Category!]!
        category(id: ID!): Category
        expense(id: ID!): Expense
        expenses: [Expense!]!
    }
    
    type Mutation{
        createCategory(title: String!) : Category!
        updateCategory(id: ID!, title: String!) : Category!
        deleteCategory(id: ID!) : Boolean!

        createExpense(  
            category_id: ID!
            amount: Float!
            description: String
            expense_date: String!
        ) : Expense!
        updateExpense(
            id: ID!
            category_id: ID!
            amount: Float!
            description: String
            expense_date: String!
        ): Expense!
        deleteExpense(id: ID!) : Boolean!
    }
`;