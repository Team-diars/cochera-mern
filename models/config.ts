import {Schema, model} from 'mongoose';
const ConfigSchema: Schema = new Schema({
  rateprice: {
    type: Number,
    default: 0,
    required:false,
  },
});


module.exports = model("config",ConfigSchema);