import {Schema, model} from 'mongoose';
const CustomerSchema: Schema = new Schema({
  fullname: {
    type: String,
    required: true,
  },
  cellphone: {
    type: String,
    required:false,
  },
  address :{
    type: String,
    required:false,
  },
  cars: [
    {
      brand: String,
      model: String,
      licenceplate: String,
      color: String,
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