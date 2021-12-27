import mongoose, { CallbackError, CallbackWithoutResult, ConnectOptions } from 'mongoose';
import config from 'config';

const db = config.get("mongoURI") as string;

export const connectToDB = async() => {
  try {
    const obj: ConnectOptions = {
      bufferCommands: false,
      dbName: "test", 
      user: "root", 
      pass: "root", 
      autoIndex: false,
      autoCreate: true,
    }
    await mongoose.connect(
        db,
        obj, 
        (error: CallbackError) => {
        if (error){
          console.log(error);
        }
    })
    console.log('Mongo connected!')
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

//module.exports = connectToDB;