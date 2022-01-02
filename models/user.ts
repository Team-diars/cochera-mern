import {Schema, model} from 'mongoose';
const UserSchema: Schema = new Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: Number,
    default: 1,
  },
})

module.exports = model("user",UserSchema);