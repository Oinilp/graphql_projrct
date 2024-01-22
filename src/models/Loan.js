import  mongoose from 'mongoose'

const collectionName = 'loan';

const schema = new mongoose.Schema(
    {
     _id: { 
     type: String, 
            
     }, 
     userId:{
      type: String,
      ref: 'User',
      required: true,
      },
     bookId :{
      type:String,
      ref:'Book',     
      required: true,
     },
     fechaLoan:{
      type: Date,
     // required: true
     },
     fechadReturn:{
      type: Date,
     default: null,
     }, 
     description:{
       type: String,
       required: true,
     },
     isRemove:{
      type: Boolean, 
      default: false,
     },
     estado:{
      type:Boolean,
      default:false
    }
},
  
{
strict: true,
timestamps: true,
versionKey: false,
_id: false,
collection: collectionName

}
)

export default mongoose.model(collectionName, schema)