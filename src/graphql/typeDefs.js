import { authorDefs } from '../schemas/Author.js';
import { bookDefs } from '../schemas/Book.js';
import { userDefs } from '../schemas/User.js';
import {loanDefs} from '../schemas/Loan.js';
import {paymentDefs} from '../schemas/Payment.js'

export const typeDefs = [authorDefs, bookDefs, userDefs, loanDefs, paymentDefs];
