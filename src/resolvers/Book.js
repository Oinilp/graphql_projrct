
import  BookModel from './../models/Book.js';
import AuthorModel from './../models/Author.js'

 import {generatorId} from './../tools.js';
import { v4 as uuidv4 } from 'uuid';
import GraphQLUpload from "graphql-upload/GraphQLUpload.mjs"
//import { createWriteStream } from 'fs';
import {uploadImage, deleteImage} from '../utils/cloudinary.js'
import { Image_Save } from '../../config/imgsave.js';
//import jwt  from 'jsonwebtoken';


const Book = async (_, { filters = {}, options = {} }) => {
  try {

   // const session = jwt.verify(token, 'XXX234SADDFSA132133ZZZZ')
    //console.log('session', session);

    const { _id, title, status} = filters;

    const query = {isRemove:false}; 

    // satudiar esta condicion 

     //if (typeof status === 'boolean' && status !== "") query.status = status
    
    //console.log(typeof status)


   // if (createdAt) query.createdAt = {$lte: createdAt} 
    

    if (_id) query._id = _id; 
   

    if (title) {
      query.title = {
        $regex: title,  
        $options: 'i',
      };
    }
     

    // let rs = await Book.find(query)
    // rs = await Promise.all(rs.map(async(book)=> {
    //   const authorId = book.authorId
    //   const author = await Author.findById(authorId)
    //   book.author = author
    //   return book
    // }))
    // console.log(rs[0])ilo

    // const aggregate = BookModel.aggregate([
    //   { $match: query },
    //   {
    //     $lookup: {
    //       from: 'authors', 
    //       localField: 'authorId', 
    //       foreignField: '_id', 
    //       as: 'author' 
    //     }
    //   },
    //   {
    //     $unwind: {path: "$author"}
    //   }
    // ])

    const aggregate = BookModel.aggregate([])
    
    aggregate.match(query)
    .lookup({
      from: 'author', 
      localField: 'authorId', 
      foreignField: '_id', 
      as: 'author' 
    })
    .unwind({path: "$author"})
    
    let books = await aggregate.exec()



     //return await BookModel.find(query);
    return books
  } catch (e) {
    return e;
  }
};

const Book_create = async (_, { book: { title, authorId, status, img } }) => {
  try {
    
    let urlImage = null

    if(img){
      const { createReadStream } = await img;
      const stream = createReadStream();
      urlImage  = await uploadImage({stream})
       const dataImage = await Image_Save(img, "portadasbook")
      urlImage = `http://10.2.30.125:8000/img/${dataImage.filename}` 
    }

      const author = await AuthorModel.findOne({_id: authorId})
     
       
    
    const newBook = new BookModel({
   //   _id: generatorId(17),
      _id: generatorId(17),
      title,
      authorId,
      status,
      img: urlImage,
      author
    });
      

    const bookSave = await newBook.save(); 
    return bookSave._id;
  } catch (e) {
    return e;
  }
};

const Book_delete = async (_, { _id }) => {
  try {

    const books = await BookModel.find({_id: {$in: _id}});
    
    if(books.length === 0) throw new Error('Book no encontrado');

    const deletedBook = await BookModel.deleteMany({_id: {$in: _id}}, {$set: {isRemove: true}});
    
    return true;
  } catch (e) {
    return e;
  }
};




const Book_update = async (_, { book:{ _id, title, authorId, status } }) => {
  try {
    const update = {
      $set: {
        title,
        authorId,
        status,
      },
    };
    const updateBook = await BookModel.findByIdAndUpdate(_id, update, { new: true });

    if (!updateBook) throw new Error('libro no encontrado');
    return updateBook._id;
  } catch (e) {
    return e;
  }
};

 //const author = async (parent) => await Author.findById(parent.authorId)

 const Book_save = async (_, {book}) => {
   try {
    if (book._id) {
      return await Book_update(_, { book });
    } else {
      return await Book_create(_, { book });
    }
   } catch (e) {
     return e
   }


 }

//  const Image_Save = async (image) => {
//   const { filename, mimetype, createReadStream } = await image;

//   const path = `public/img/${filename}`;
//   const stream = createReadStream();

//   return await new Promise((resolve, reject) =>
//     stream
//       .pipe(createWriteStream(path))
//       .on("finish", () => resolve({ path, filename, mimetype }))
//       .on("error", reject)
//   );
// }

export const bookResolvers = {
  Upload: GraphQLUpload,
  Query: {
    Book,
  },
  Mutation: {
    Book_save,
    Book_delete,
  },
  // Book:{
  //   author: async (parent) =>{
  //       const authorId =  parent.authorId
  //       return await Author.findById(authorId)

  //   }
  // }
};
