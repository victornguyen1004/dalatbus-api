import mongoose, { Schema, ObjectId } from "mongoose";

const Bus = mongoose.model(
  "Bus",
  new Schema(
    {
      id: { type: ObjectId },
      name: {
        type: String,
        required: true,
      },
      unit: {
        type: String, 
      },
      length: {
        type: String,
      },
      route: {
        type: String,
      },
      time: {
        type: String,
      },
      spacing: {
        type: String,
      },
      routeNumber: {
        type: String,
      },
      phoneNumber: {
        type: String,
      },
      slug: {
        type: String,
      },
    },
    {
      autoCreate: false,
      autoIndex: true,
    }
  )
);

export default Bus;
