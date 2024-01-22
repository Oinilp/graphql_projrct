import PaymentModel from "../models/Payment.js";
import {generatorId} from './../tools.js';


const Payments = async (_, { filters = {}, options = {} }) => {
    try {
      const query = {};
  
      // Agrega lógica para manejar los filtros según sea necesario
      if (filters._id) {
        query.userId = filters._id;
      }
  
      if (typeof filters.isRemove === 'boolean') {
        query.isRemove = filters.isRemove;
      }
  
      // Otros campos de filtro...
  
      console.log(query);
  
      return await PaymentModel.find(query);
    } catch (e) {
      console.error('Error al obtener pagos:', e);
      throw e;
    }
};



const Payment_create = async (_, { 
  //firstName, lastName, userId, payment
  input  
}) => {
    try {
      
      //let {firstName, lastName, userId, payment} = pagos
      console.log(input)
      const newPayment = new PaymentModel({
        _id: generatorId(17),
        ...input
      });
      console.log(newPayment)
      const savedPayment = await newPayment.save();
      console.log(savedPayment)
  
      return savedPayment;
    } catch (error) {
      console.error('Error al crear el pago:', error);
      return error;
    }
};

const Payment_update = async (_,{_id,input}) => {
    try {
      const update = {
            $set: {
                updatedAt: new Date(),
                ...input
            },
        };
      const updatePayment = await PaymentModel.findByIdAndUpdate(_id, update, {
        new: true,
      });
  
      if (!updatePayment) throw new Error("Pago no encontrado");
      return updatePayment;
    }catch (error) {
      return error;
    }
};

export const paymentResolvers = {
    Query: {
      Payments,
    },
    Mutation: {
      Payment_create,
      Payment_update
    },
  };