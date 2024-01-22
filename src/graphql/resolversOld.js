import Author from './../models/Author.js';
import Book from './../models/Book.js';

const hello = () => 'Hello world!';

const Authors = async (_, { filters, options }) => {
  try {
    const { _id, firstName, lastName } = filters;
    const query = {};

    if (_id) query._id = _id;

    if (firstName) {
      query.firstName = {
        $regex: firstName,
        $options: 'i',
      };
    }

    if (lastName) {
      query.lastName = {
        $regex: lastName,
        $options: 'i',
      };
    }

    return await Author.find(query);
  } catch (error) {
    return error;
  }
};

const Author_create = async (_, { author }) => {
  try {
    const { firstName, lastName } = author;

    const newAuthor = new Author({
      firstName,
      lastName,
    });

    return await newAuthor.save();
  } catch (e) {
    return e;
  }
};

const Author_update = async (_, args) => {
  try {
    const { _id, firstName, lastName } = args;

    const update = {
      $set: {
        firstName,
        lastName,
      },
    };
    const updateAuthor = await Author.findByIdAndUpdate(_id, update, {
      new: true,
    });
    if (!updateAuthor) throw new Error('Autor no encontrado');
    return updateAuthor;
  } catch (e) {
    return e;
  }
};

const Author_delete = async (_, { _id }) => {
  try {
    const deletedAuthor = await Author.findByIdAndDelete(_id);
    if (!deletedAuthor) throw new Error('Author no encontrado');
    return deletedAuthor;
  } catch (e) {
    return e;
  }
};

const Books = async (_, { filters, options }) => {
  try {
    const query = {};

    const { _id, title } = filters;

    if (_id) query._id = _id;

    if (title) {
      query.title = {
        $regex: title,
        $options: 'i',
      };
    }

    return await Book.find(query);
  } catch (e) {
    return e;
  }
};

const Book_create = async (_, { book: { title, authorId } }) => {
  try {
    const newBook = new Book({
      title,
      authorId,
    });

    return await newBook.save();
  } catch (e) {
    return e;
  }
};

const Book_delete = async (_, { _id }) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(_id);
    if (!deletedBook) throw new Error('Book no encontrado');
    return deletedBook;
  } catch (e) {
    return e;
  }
};

const Book_update = async (_, { book: { _id, title, authorId, status } }) => {
  try {
    const update = {
      $set: {
        title,
        authorId,
        status,
      },
    };
    const updateBook = await Book.findByIdAndUpdate(_id, update, { new: true });
    if (!updateBook) throw new Error('libro no encontrado');
    return updateBook;
  } catch (e) {
    return e;
  }
};

export const resolvers = {
  Query: {
    hello,
    Authors,
    Books,
  },
  Mutation: {
    Author_create,
    Author_update,
    Author_delete,

    Book_create,
    Book_delete,
    Book_update,
  },
};
