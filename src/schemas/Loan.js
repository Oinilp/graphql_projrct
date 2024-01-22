import { gql } from 'graphql-tag';

export const loanDefs = gql`

  type Loan{
    _id: String
    userId:ID
    bookId: ID
    fechaLoan: DateTime
    #fechaDevolucion: DateTime
    status: Boolean
    user: User
    book: Book
    description: String
    createdAt: String
    updatedAt: String
  }

  input Options {
    page: Int
    limit: Int
  }

  input Loan_filters {
    _id: String
    status: Boolean
    userId:ID
   
   
  }

  scalar DateTime
  input Loan_input {
    _id: String
    userId: ID
    bookId: ID
    description: String
    #fechaLoan: DateTime
    #fechaReturn: DateTime
    status: Boolean
    

  }

  type Query {
    Loan(filters: Loan_filters, options: Options): [Loan]
    
  }

  type Mutation {
    Loan_save(loan: Loan_input): String
    
   
  }
`;
