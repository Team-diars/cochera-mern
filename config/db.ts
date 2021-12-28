import mongoose, { CallbackError, CallbackWithoutResult, ConnectOptions } from 'mongoose';
import config from 'config';

const db = config.get("mongoURI") as string;

export const connectToDB = async() => {
  try {
    await mongoose.connect( 
        db, {
          bufferCommands: false,
          dbName: process.env.DBNAME, 
          user: process.env.USER, 
          pass: process.env.PASS, 
          autoIndex: false,
          autoCreate: true,
        }, (error: CallbackError) => {
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