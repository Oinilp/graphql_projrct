import { authorResolvers } from './../resolvers/Author.js';
import { bookResolvers } from './../resolvers/Book.js';
import {userResolvers} from './../resolvers/User.js';
import {loanResolvers} from '../resolvers/Loan.js';
import {paymentResolvers} from '../resolvers/Payment.js'

export const resolvers = [authorResolvers, bookResolvers,userResolvers, loanResolvers, paymentResolvers];