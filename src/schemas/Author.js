import { gql } from 'graphql-tag';

export const authorDefs = gql`

  input Options {
    page: Int
    limit: Int
  }

  type Author {
    _id: String
    firstName: String
    lastName: String
    fullName: String
    age: Int
    createdAt: String
    updatedAt: String
    book: [Book]
    isRemove: Boolean
  }

  input Author_input {
    _id: String  
    firstName: String
    lastName: String
    age: Int
  }

  input Author_filters {
    _id: String
    firstName: String
    lastName: String
    status: Boolean
    search: String
    age: [Int]
  }

  type Query {
    Author(filters: Author_filters, options: Options): [Author]
  }

  type Mutation {
    Author_save(author: Author_input): String
    Author_delete( _id: [String ]): Boolean
   
  }
`
;
