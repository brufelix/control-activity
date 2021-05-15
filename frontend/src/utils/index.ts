import moment from "moment";

export const compareDate = (date: string = "") => {
  const now = moment();

  return now > moment(date);
};
