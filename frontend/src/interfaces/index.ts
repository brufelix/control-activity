export interface ICard {
  _id: string;
  groupId: string;
  description: string;
  fetchData?(): void;
};

export interface ICreateGroup {
  fetchData?(): void
}

export interface IRegisterActivity {
  _id: string;
  fetchData?(): void;
};

export interface IActivity {
  _id: string;
  groupId: string
  description: string;
  done: boolean;
  createAt: Date;
  delivery: Date;
};

export interface IGroup {
  _id: string;
  title: string;
  activities: IActivity[]
}

export interface IResponseGroup {
  data: IGroup[]
}

export interface ITitle {
  id: string
  fetchData?(): void
};