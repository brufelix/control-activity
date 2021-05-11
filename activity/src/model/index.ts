import { Schema, model } from "mongoose";

import { IActivity } from "../interface";

const schemaActivity = new Schema({
  description: {
    type: String,
    required: true
  },
  done: {
    type: Boolean,
    required: true,
    default: false,
  },
  createAt: {
    type: Date,
    required: true,
    default: false,
  },
  delivery: {
    type: Date,
    required: false,
    default: false,
  },
});

const ModelTask = model<IActivity>("activity", schemaActivity)

export default ModelTask;