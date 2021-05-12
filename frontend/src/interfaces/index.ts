export interface ICard {
  description: string
};

export interface ICardContainer {
  _id: string
  title: string
  activities: ICard[]
  fetchData?(): void
  setShowRegister?(): void
};