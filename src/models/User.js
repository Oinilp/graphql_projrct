import mongoose from 'mongoose';
const collectionName = "user";
import bcrypt from 'bcryptjs';


const schema = new mongoose.Schema(
  {
    _id: { 
      type: String,
     },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      default: 0,
     //unique: true
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    userName:{
      type: String,
      //required: true,
      unique: true,
    },
    fullName: {
      type:String
    },
    age: {
      type: Number,
      default: 0,
    },
    isRemoved: {
      type:Boolean,
      default: false,
    },
    status: {
      type:Boolean,
      default: false,
    },
    createdAt: { 
      type: Date, 
      default: Date.now
    },
    updatedAt: { 
      type: Date, 
      default: Date.now 
    },
    
  },
  {
    strict: true,
    timestamps: true,
    versionKey: false,
    _id: false,
    collection: collectionName

  }
);

schema.methods.encryptPassword =  async (password) =>{
   const salt = await  bcrypt.genSalt(10);
   const hash = bcrypt.hash(password, salt)
   return hash;
};

   schema.methods.matchPassword = async function (password){
   return await  bcrypt.compareSync(password, this.password);

}


export default mongoose.model( collectionName, schema);
