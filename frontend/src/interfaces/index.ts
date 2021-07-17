export interface IUser {
  username: string,
  projects: IProject[]
};

export interface IProject {
  _id?: string,
  title: string,
  maintainer: string,
  users: [string],
  groups: [],
}

export interface IGroup {
  _id: string;
  title: string;
  activities: IActivity[];
  position: number;
};

export interface ILocalStorageUser {
  valid: boolean,
  user: IUser,
}

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

export interface IUseCount {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
};

export interface IUseAuth {
  isAuth: boolean;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
};

export interface ISelectedProject {
  selectedProject: string;
  setSelectedProject: React.Dispatch<React.SetStateAction<string>>;
};

export interface IUseSearchResult {
  resultSearch: IGroup[];
  setResultSearch: React.Dispatch<React.SetStateAction<IGroup[]>>;
};

export interface IUserSearchDesc {
  currentResearch: string;
  setCurrentResearch: React.Dispatch<React.SetStateAction<string>>;
};

export interface IModalResgiter {
  visible: boolean;
  onCancel(): void;
};

export interface IModalCreateProject {
  visible?: boolean;
  onCancel?(): void;
  setVisible?(boolean: boolean): void;
  projectsNumbers?: number
};

export interface IModalNewProject {
  visible?: boolean;
  onCancel?(): void;
  setVisible?(boolean: boolean): void;
  projectsNumbers?: number
};

export interface IResponseAuth {
  valid: boolean,
  user: IUser
}

export interface IResponseResgisterUser {
  created: boolean,
  message: string,
}