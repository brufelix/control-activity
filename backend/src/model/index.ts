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
  projectId: {
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
  projectId: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: false,
  }
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
  projects: {
    type: [String],
    default: [],
  }
});

const SchemaProject = new Schema({
  maintainer: String,
  title: String,
  groups: [String],
  users: [String],
});

const ModelUser = model<IUser>("user", SchemaUser);
const ModelProject = model<IProject>("project", SchemaProject);
const ModelGroup = model<IGroupModelInterface>("groupact", SchemaGroup);
const ModelActivity = model<IActivityModelInterface>("activity", schemaActivity);

export { ModelActivity, ModelGroup, ModelProject, ModelUser };
