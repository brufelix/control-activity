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
  groupId: string;
  description: string;
  done: boolean;
  createAt: string;
  delivery: string;
  position: number;
};

export interface IGroup {
  _id: string;
  title: string;
  activities: IActivity[];
  position: number;
};

export interface ICreateGroup {
  fetchData?(): void;
  position?: number;
};

export interface IRegisterActivity {
  _id: string;
  fetchData?(): void;
  position?: number;
};

export interface ITitle {
  id: string;
  fetchData?(): void;
};

export interface IHome {
  setCount?(number: number): void;
  resultSearch?: IGroup[];
};

export interface IDrogAndDrop {
  setCount?(number: number): void;
  resultSearch?: IGroup[];
};

export interface IHeader {
  count: number;
  setResultSearch?(result: IGroup[]): void;
};