import moment from "moment";

export const compareDate = (date: string = "") => {
  const now = moment();

  return now > moment(date);
};

export const formatDate = (date: string) => {
  const [year, mon, day] = date.slice(0, 10).split("-")
  moment.locale('pt');
  moment.updateLocale('pt', {
    months: [
      "Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul",
      "Ago", "Set", "Out", "Nov", "Dez"
    ]
  });

  return moment([year, `${+mon - 1}`, day]).format('DD [de] MMMM/YYYY');
};