import { gql } from 'graphql-tag';

export const userDefs = gql`

  type User{
    _id: String
    firstName: String
    lastName: String
    fullName: String
    userName: String
    email: String
    password: String
    age: Int
    status: Boolean
    isRemoved: Boolean
    createdAt: DateTime
    updatedAt: DateTime
  }

  input Options {
    page: Int
    limit: Int
  }

  input User_filters {
    _id: String
    firstName: String
    lastName: String
    status: Boolean
    search: String
    age: Int
  }

  input User_input {
    _id: String
    firstName: String
    lastName: String
    userName: String
    email: String
    password: String
    age: Int
    status: Boolean
  }

  type Query {
    Users(filters: User_filters, options: Options): [User]
    User_login(user: User_input): String
  }

  type Mutation {
    User_save(user: User_input): String
    User_delete(_id:ID): User
    User_update(user: User_input): User
   
  }
`;
