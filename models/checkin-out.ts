import {Schema, model} from 'mongoose';

/* 
  Sum every hasPaid = false when any clients comes to pay the total.
*/

const CheckInOutSchema: Schema = new Schema({
    checkin:{
      type: Date,
      required:true,
    },
    checkout:{
      type: Date,
      required:false,
    },
    car: {
      type: Schema.Types.ObjectId,
      ref: "car",
      required: true,
    },
    customPrice: {
      type: Number,
      default: 0,
    },
    hasLeftKeys: {
      type: Boolean,
      default: false,
    },
    hasPaid: {
      type: Boolean,
      default: false,
    },
    status: {
      type: Number,
      default: 1,
    },
});


module.exports = model("checkin-out",CheckInOutSchema);