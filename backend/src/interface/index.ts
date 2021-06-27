import { Document } from "mongoose";

export interface IActivity extends Document {
  groupId?: string
  description?: string;
  done?: boolean;
  createAt?: Date;
  delivery?: Date;
  position?: number;
};

export interface IGroup extends Document {
  title?: String;
  activities?: IActivity[];
};

export interface IProject extends Document {
  title?: String;
  groups?: IGroup[];
  users?: string[];
};


export interface IUser extends Document {
  username?: string;
  password?: string;
};
