export interface ICard {
  mainId: string;
  groupId: string;
  description: string;
  done?: boolean;
  delivery?: string;
  fetchData?(): void;
};

export interface IActivity {
  mainId: string;
  groupId: string
  description: string;
  done: boolean;
  createAt: string;
  delivery: string;
};

export interface IGroup {
  _id: string;
  title: string;
  activities: IActivity[]
};

export interface IResponseGroup {
  data: IGroup[]
};

export interface ICreateGroup {
  fetchData?(): void
};

export interface IRegisterActivity {
  _id: string;
  fetchData?(): void;
};

export interface ITitle {
  id: string
  fetchData?(): void
};

export interface IHome {
  setCount?(number: number): void;
};

export interface IDrogAndDrop {
  setCount?(number: number): void;
};

export interface IHeader {
  count: number;
};