import UserModel from "./../models/User.js";
import bcrypt from 'bcryptjs';
import jwt  from 'jsonwebtoken';
import {generatorId} from './../tools.js';


const Users = async (_, { filters = {}, options = {} }) => {
  try {
    const query = { 
    //  isRemoved: true
    }; 

    const { _id, firstName,age, lastName, status, search } = filters;

    // if(age) query.age =  age
    if (age && age !== '') query.age = {$in: age};

    // if (firstName && firstName !== '' && age && age !== 0)
    // query.$and = [{age: age}, {firstName: firstName}]

    if (_id) query._id = _id;
    //if (firstName) query.firstName = firstName;
    //if (status)  query.status = status;

    if(typeof status === 'boolean' ) query.status = status 


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

    if (search && search !== '' ) {
      const like = {$regex: search, $options: 'i'}
        query.$or = [
          {firstName: like},
          {lastName: like},
          {email: like}
        ]
      }

    // if (age) {
    //   const ageString = age.toString()
    //   query.age = {
    //     $regex: ageString,  
    //     $options: 'i',
    //   };
    // }
     
    console.log(query);

    return await UserModel.find(query);
  } catch (e) {
    return e;
  }  
};

const User_create = async (_, { user }) => {
  try {
  
    let { firstName, lastName, email, userName,  password, age, status } = user;

    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
    //console.log(password);

    const newUser = new UserModel({
      _id: generatorId(17),
      email,
      password,
      firstName,
      lastName,
      userName,
      age,
      status,
      fullName: `${firstName} ${lastName}`,
      createdAt: new Date()
    });

    const userSave = await newUser.save();
   
    return userSave._id;

  } catch (e) {
    return e;
  }
};

const User_login = async (_, { user: { userName, password, email } }) => {
  try {
   //console.log(userName, password);
    const login = await  UserModel.findOne({ $or: [ { email }, { userName }]})
    if(!login) throw Error("Usuario no encontrado")
   // console.log(login);

    const ispassword = await  bcrypt.compareSync(password, login.password)
    if(!ispassword ) throw Error("Contraseña incorrecta")
  // console.log(ispassword);
    delete login.password

     const token = jwt.sign({ ...login }, 'XXX234SADDFSA132133ZZZZ', { expiresIn: '1h' });
   // console.log(login); 
    
    return token;
  } catch (e) {
    return e;
  }
};

const User_update = async (_,{ user: { _id, firstName, status, lastName, email, password, age } }) => {
  try {
    const update = {
      $set: {
        firstName,
        lastName,
        email,
        password,
        age, 
        status,
        updatedAt: new Date()
      },
    };
    const updateUser = await UserModel.findByIdAndUpdate(_id, update, {
      new: true,
    });

    if (!updateUser) throw new Error("User no encontrado");
    return updateUser._id;
  } catch (error) {
    return error;
  }
};

const User_delete = async (_, { _id }) => {
  try {
    // Verifica si _id es una cadena válida
    
    if (typeof _id !== "string") {
      console.log(typeof _id)
      throw new Error('El ID no es válido.');
    }
     

    // Busca el usuario por su ID y establece isRemove en true
    const deletedUser = await UserModel.findByIdAndUpdate(
      _id,
      { $set: { isRemoved: true } },
      { new: true } // Devuelve el documento actualizado
    );

    // Verifica si el usuario fue encontrado
    if (!deletedUser) {
      throw new Error("Usuario no encontrado");
    }

    return deletedUser;
  } catch (e) {
    console.error('Error en User_delete:', e);
    throw e;
  }
};


const User_save = async (_, { user }) => {
  try {
    if (user._id) {
      return await User_update(_, { user });
    } else if(user) {
      return await User_create(_, { user });
    }else {
      return await User_login(_,{user})
    }
  } catch (e) {
    return e;
  }
};



export const userResolvers = {
  Query: {
    Users,
    User_login
  },
  Mutation: {
    User_save,
    User_delete,
    User_update,
   
    
  },
};
