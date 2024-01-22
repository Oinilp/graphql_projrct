import { gql } from 'graphql-tag';

export const typeDefs = gql`
  input Options {
    page: Int
    limit: Int
  }

  type Author {
    _id: ID
    firstName: String
    lastName: String
    createdAt: String
    updatedAt: String
  }

  type Book {
    _id: ID
    title: String
    authorId: ID
    status: Boolean
    createdAt: String
    updatedAt: String
  }

  input Author_input {
    _id: ID
    firstName: String!
    lastName: String
  }

  input Author_filters {
    _id: String
    firstName: String
    lastName: String
  }

  input Book_filters {
    _id: String
    title: String
    status: Boolean
  }

  input Book_input {
    _id: ID
    title: String!
    authorId: ID
    status: Boolean
  }

  type Query {
    hello: String
    Authors(filters: Author_filters, options: Options): [Author]
    Books(filetrs: Book_filters, options: Options): [Book]
  }

  type Mutation {
    Author_create(author: Author_input): Author
    Author_update(author: Author_input): Author
    Author_delete(_id: ID!): Author

    Book_create(book: Book_input): Book
    Book_update(book: Book_input): Book
    Book_delete(_id: ID!): Book
  }
`;
