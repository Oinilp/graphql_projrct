import AuthorModel from "./../models/Author.js";
import {generatorId} from './../tools.js';
import pkg from '@codecraftkit/utils';

//import { v4 as uuidv4 } from "uuid";
const {generateId, handlePagination} = pkg;

const Author = async (_, { filters = {}, options = {} }) => {
  try {
    const { _id, firstName, lastName,age,search } = filters;

    const {limit, skip} =  handlePagination(options)

      // console.log(age);
    const query = { isRemove:false };



     if(age)query.age = {$gt: age};


    // if (firstName && firstName !== '' && age && age !== 0)
    //    query.$and = [{age: {$lt: age}}, {firstName: firstName}]
   

   //if(age && age !== 0)query.$and = [{age: {$gt: age[0]}}, {age: {$exists: true}}]

      ///if(age && age !== 0 )query.$and = [{age:{ $lt:age[0], $gt:age[1] }}]
      
    // if (age.length > 0)
    // query.$and =  [{age: {$gt: age[0]}}, {age: {$lt: age[1]}}]
    
    //  if (age.length > 0)
    //  query.$or =  [{age: {$gt: age[0]}}, {age: {$eq: age[1]}}]

   // if(age)query.age = [{$sort: {age: 1}}]
     
  

if (search && search !== '' ) {
const like = {$regex: search, $options: 'i'}
  query.$or = [
    {firstName: like},
    {lastName: like}
  ]
}

    if (_id) query._id = _id;
     
   // console.log(query);


    if (firstName) {
      query.firstName = {
        $regex: firstName,
        $options: "i",
      };
    }

    if (lastName) {
      query.lastName = {
        $regex: lastName,
        $options: "i",
      };
    }
    // console.log(query);

    const aggregate = AuthorModel.aggregate([])

    //const find = AuthorModel.find(query)
     aggregate.match(query)
    .lookup({
      from: "book",
      localField: "_id",
      foreignField: "authorId",
      as: "book",
    })
    .unwind({path: "$book", preserveNullAndEmptyArrays:false } )

     //.project({fullName: 1})
     //.skip((page - 1) * limit).limit(limit)
    
    //aggregate.match(query)
    //.unwind({path: "$book"})
    //.project({ authorId : 0 , title: 1 })
      
    // if(age )aggregate.age({$sort: { age:1}}) ;
  
    if(skip )aggregate.skip(skip) ;
    if(limit)aggregate.limit(limit) ;


    let authors = await aggregate.exec();
   

    // return await AuthorModel.find(query);
    return authors;
  } catch (error) {
    return error;
  }
};

const Author_create = async (_, { author }) => {
  try {
    // console.log(generatorId(17) )

    const { firstName, lastName, age } = author;
    const newAuthor = new AuthorModel({
      _id: generatorId(17),
      firstName,
      lastName,
      age,
      fullName: `${firstName} ${lastName}`,
    });

    // const newAuthor = new AuthorModel.find({lastName: {$in: lastName}});
    if (!lastName) throw new Error("Autor creado con exito");
    const authorSeve = await newAuthor.save();
    return authorSeve._id;
  } catch (e) {
    return e;
  }
};

const Author_update = async (_, { author }) => {
  try {
    const { _id, firstName, lastName, age } = author;

    //console.log(_id)

    const update = {
      $set: {
        firstName,
        lastName,
        fullName: `${firstName} ${lastName}`,
        age
      },
    };
    const updateAuthor = await AuthorModel.findByIdAndUpdate(_id, update, {
      new: true,
    });

    if (!updateAuthor) throw new Error("Autor no encontrado");
    
    return updateAuthor._id;
  } catch (e) {
    return e;
  }
};

const Author_delete = async (_, { _id }) => {
  try {
    //const deletedAuthor = await AuthorModel.findByIdAndDelete(_id );

    const authors = await AuthorModel.find({ _id: { $in: _id } });

    //console.log(authors);

    if (authors.length === 0) throw new Error("Author no encontrado");

    await AuthorModel.updateMany({_id: {$in: _id}}, {$set: {isRemove: true}})

      //console.log(AuthorModel);

    return true;
  } catch (e) {
    return e;
  }
};

const Author_save = async (_, { author }) => {
  try {
    if (author._id) {
      return await Author_update(_, { author });
    } else {
      return await Author_create(_, { author });
    }
  } catch (e) {
    return e;
  }
};

//const book = async (parent) => await Book.findById(parent.id);

export const authorResolvers = {
  Query: {
    Author,
  },
  Mutation: {
    Author_save,
    Author_delete,
  },
  // Author:{
  //   book: async (parent) => {
  //   const id = parent._id
  //   let book = await BookModel.find({authorId:id})
  //   return book
  //   },
  //   fullName: (parent) => {

  //     return  ` ${parent.firstName} ${parent.lastName}`
  //   }
  // }
};
