import mongoose from 'mongoose';
const collectionName = "book";


const schema = new mongoose.Schema(
  {
    _id: { 
      type: String, 
      
     },
    title: {
      type: String,
      required: true,
    },
    authorId: {
      type: String,
      ref: 'Author',
      required: true
    },
    status: { 
      type: Boolean, 
      default: true 
    },
    isRemove:{
      type: Boolean, 
      default: false,
    },
    img:{  
      type : String,

    },
    author: {  
        fullName: String,
        age: Number,
      
    }
  
    },
  
    {
    strict: true,
    timestamps: true,
    versionKey: false,
    _id: false,
    collection: collectionName

    }
);

export default mongoose.model(collectionName, schema);
