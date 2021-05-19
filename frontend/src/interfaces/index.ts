export interface ICard {
  mainId: string;
  groupId: string;
  description: string;
  done?: boolean;
  delivery?: string;
  inResearch?: boolean;
  fetchData?(): void;
  getSearchData?(): void;
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

export interface IAddDeliveryDate {
  mainId: string;
  groupId: string;
  inResearch: boolean;
  visible?: boolean;
  setVisible?(boolean: boolean): void;
  getSearchData?(): void;
  fetchData?(): void;
};

export interface IGroup {
  _id: string;
  title: string;
  activities: IActivity[];
  position: number;
};

export interface ICreateGroup {
  position?: number;
  fetchData?(): void;
};

export interface IRegisterActivity {
  _id: string;
  position?: number;
  fetchData?(): void;
};

export interface ITitle {
  id: string;
  fetchData?(): void;
};

export interface IHome {
  resultSearch?: IGroup[];
  currentResearch?: string;
  setCount?(number: number): void;
  setResultSearch?(result: IGroup[]): void;
};

export interface IDrogAndDrop {
  resultSearch?: IGroup[];
  currentResearch?: string;
  setCount?(number: number): void;
  setResultSearch?(result: IGroup[]): void;
};

export interface IHeader {
  count: number;
  currentResearch?: string;
  setCurrentResearch?(search: string): void;
  setResultSearch?(result: IGroup[]): void;
};