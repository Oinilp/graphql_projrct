import LoanModel from "../models/Loan.js";
import { v4 as uuidv4 } from "uuid";

const Loan = async (_, { filters = {} }) => {
  try {
    const { _id, status } = filters;

    const query = { isRemove: false };

    if (typeof status === "boolean" && status !== "") query.status = status;

   // console.log(status);

    if (_id) query._id = _id;

    const aggregate = LoanModel.aggregate([]);

    aggregate
      .match(query)
      .lookup({
        from: "book",
        localField: "bookId",
        foreignField: "_id",
        // pipeline: [
        //   {
        //     $lookup: {
        //       from: "author",
        //       localField: "authorId",
        //       foreignField: "_id",
        //       as: "author",
        //     },
        //   },
        //   { $unwind: { path: "$author" } },
        // ],
        as: "book",
      })
      .unwind({ path: "$book" })

      // .lookup({
      //   from: 'author',
      //   localField: 'book.authorId',
      //   foreignField: '_id',
      //   as: 'author'
      // })

      //  .unwind({ path: "$author" })

      .lookup({
        from: "user",
        localField: "userId",
        foreignField: "_id",
        as: "user",
      })
      .unwind({ path: "$user" });

    let loan = await aggregate.exec();
      //console.log(loan[0]);
    return loan;
  } catch (error) {
    return error;
  }
};

const Loan_create = async (_, { loan }) => {
  try {
    const { userId, bookId, description, fechaReturn } = loan;

    const newLoan = new LoanModel({
      _id: uuidv4(),
      userId,
      bookId,
      description,
      fechaLoan: new Date(), //fecha actual
      fechaReturn,
    });

    //if ( ) throw new Error(" ");
    const loanSeve = await newLoan.save();
    return loanSeve._id;
  } catch (error) {
    return error;
  }
};
const Loan_update = async (_, { loan }) => {
  try {
    const { _id } = loan;

    const update = {
      $set: {
        fechaReturn: new Date(),
      },
    };
    const updateLoan = await LoanModel.findByIdAndUpdate(_id, update, {
      new: true,
    });
    if (!updateLoan) throw new Error("Perestamo no encontrado");

    return updateLoan._id;
  } catch (error) {
    return error;
  }
};

const Loan_save = async (_, { loan }) => {
  try {
    if (loan._id) {
      return await Loan_update(_, { loan });
    } else {
      return Loan_create(_, { loan });
    }
  } catch (e) {
    return e;
  }
};

export const loanResolvers = {
  Query: {
    Loan,
  },
  Mutation: {
    Loan_save,
  },
};
