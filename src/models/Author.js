import mongoose from 'mongoose';

const collectionName = "author"


const schema = new mongoose.Schema(
  {
    _id: { 
      type: String, 
      required: true
     },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      
    },
    age: {
      type: Number,
      default: 0,
    },
    fullName: {
      type:String
    },
    isRemove:{
      type: Boolean, 
      default: false,
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
