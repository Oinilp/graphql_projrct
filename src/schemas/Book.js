import { gql } from 'graphql-tag';

export const bookDefs = gql`

  scalar Upload

  type Book {
    _id: String
    title: String
    authorId: ID
    status: Boolean
    createdAt: String
    updatedAt: String
    author: Author
    img: String
  }

  input Options {
    page: Int
    limit: Int
  }

  input Book_filters {
    _id: String
    title: String
    status: Boolean
    
  }

  input Book_input {
    _id: String
    title: String
    authorId: ID
    status: Boolean
    img: Upload   
    
    
  }

  type Query {
    Book(filters: Book_filters, options: Options): [Book]
  }

  type Mutation {
    Book_save(book: Book_input): String
    Book_delete(_id: [String]): Boolean
  }
`
;
