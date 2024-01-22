import { gql } from 'graphql-tag';

export const paymentDefs = gql`

    type Payment{
        _id: String
        firstName: String
        lastName: String
        userId: String
        payment: Int
        createdAt:DateTime
        updatedAt: DateTime     
    }
   
    input Payment_input {
        userId: String
        payment: Int
        firstName: String
        lastName: String
    }

    input Payment_update_input {
        payment: Int
        firstName: String
        lastName: String
    }

    type Query {
        Payments: [Payment]
    }

    type Mutation {
        
        Payment_create(input:Payment_input):Payment
        Payment_update(_id:ID, input:Payment_update_input): Payment
    }

`