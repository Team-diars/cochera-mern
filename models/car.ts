import {Schema, model} from 'mongoose';
const CarSchema: Schema = new Schema({
    brand :{
      type: String,
      required:true,
    },
    model :{
      type: String,
      required:true,
    },
    type: {
      type: String,
      required: true,
      default: 'auto'
    },
    licenceplate :{
      type: String,
      required:true,
    },
    color :{
      type: String,
      required:true,
    },
    image: [
      String
    ],
    customer: {
      type: Schema.Types.ObjectId,
      ref: "customer",
      required: true,
    },
    status: {
      type: Number,
      default: 1,
    },
});


module.exports = model("car",CarSchema);