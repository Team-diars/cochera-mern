import {Schema, model} from 'mongoose';
const CarSchema: Schema = new Schema({
    brand :{
        type: String,
        required:false,
    },
    model :{
        type: String,
        required:false,
    },
    licenceplate :{
        type: String,
        required:false,
    },
    color :{
        type: String,
        required:false,
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