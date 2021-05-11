import { Schema, model } from "mongoose";
import {
  IActivity as IActivityModelInterface,
  IGroup as IGroupModelInterface
} from "../interface";

const schemaActivity = new Schema({
  groupId: {
    type: String,
    required: true,
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
  },
  delivery: {
    type: Date,
    required: false,
  },
});

const SchemaGroup = new Schema({
  title: String,
  activities: [schemaActivity],
});

const ModelActivity = model<IActivityModelInterface>("activity", schemaActivity);
const ModelGroup = model<IGroupModelInterface>("groupact", SchemaGroup);

export { ModelActivity, ModelGroup };
