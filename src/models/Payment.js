import {Schema, model} from 'mongoose';
import {generatorId} from './../tools.js';


const paymentSchema = new Schema(
    {
      _id: { 
        type: String,
        requires: true,
       },
      payment: {
        type: Number,
      },
      userId: {
        type: String,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
      updatedAt: {
        type: Date,
        default: Date.now,
      },
      firstName: {
        type: String,
        requires: true,
      },
      lastName: {
        type: String,
        requires: true,
      },
},
);
  
export default model("pagos", paymentSchema);
