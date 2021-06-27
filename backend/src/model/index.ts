import { Schema, model } from "mongoose";
import {
  IActivity as IActivityModelInterface,
  IGroup as IGroupModelInterface,
  IUser,
  IProject
} from "../interface";

const schemaActivity = new Schema({
  groupId: {
    type: String,
    required: true,
  },
  mainId: {
    type: String,
    required: true
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
    defaultValue: null
  },
  position: {
    type: Number,
    required: false,
  }
});

const SchemaGroup = new Schema({
  title: String,
  activities: [schemaActivity],
  idProject: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: false,
  }
});

const SchemaProject = new Schema({
  title: String,
  groups: [SchemaGroup],
  users: [String],
});

const SchemaUser = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  projects: [String],
});

const ModelActivity = model<IActivityModelInterface>("activity", schemaActivity);
const ModelGroup = model<IGroupModelInterface>("groupact", SchemaGroup);
const ModelProject = model<IProject>("project", SchemaProject);
const ModelUser = model<IUser>("user", SchemaUser);

export { ModelActivity, ModelGroup, ModelProject, ModelUser };
