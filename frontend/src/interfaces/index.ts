export interface ICard {
  _id: string;
  groupId: string;
  description: string;
  fetchData?(): void;
};

export interface ICardContainer {
  _id: string;
  title: string;
  activities: ICard[];
  fetchData?(): void;
  setShowRegister?(): void;
};