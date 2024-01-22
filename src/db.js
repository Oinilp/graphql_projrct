import mongoose from 'mongoose';


//top level await

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`db conectada "${conn.connection.name}"`);
  } catch (error){
    return error   
  }
};
 