import { formatISO } from "date-fns";

export const toLocaleISODateString = (date: Date) => {
  return formatISO(date).substring(0, 19);
};
