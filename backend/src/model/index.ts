import { Document, Schema, model } from "mongoose";
import { IActivity } from "../interface";

export interface IActivityModelInterface extends IActivity, Document { };

const schemaActivity = new Schema({
  groupId: {
    type: String,
    required: true,
    default: false,
  },
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

const ModelActivity = model<IActivityModelInterface>("activity", schemaActivity)

export default ModelActivity;