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
