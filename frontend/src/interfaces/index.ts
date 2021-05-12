export interface ICard {
  description: string
};

export interface ICardContainer {
  title: string
  cards: ICard[]
  setShowRegister?(): void
};