import {Schema, model} from 'mongoose';
const CustomerSchema: Schema = new Schema({
  fullname: {
    type: String,
    required: true,
  },
  cellphone: {
    type: String,
    required:true,
  },
  address :{
    type: String,
    required:true,
  },
  email: {
    type: String,
    unique: true,
    require: true,
  },
  dni: {
    type: String,
    required: true,
  },
  cars: [
    {
      brand: String,
      model: String,
      licenceplate: String,
      color: String,
      image: [String],
    }
  ],
  date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: Number,
    default: 1,
  },
})

module.exports = model("customer",CustomerSchema);