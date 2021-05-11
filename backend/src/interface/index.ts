import { Document } from "mongoose";

export interface IActivity extends Document {
  groupId?: String
  description?: String;
  done?: Boolean;
  createAt?: Date;
  delivery?: Date;
};

export interface IGroup extends Document {
  title?: String;
  activities?: IActivity[];
};
