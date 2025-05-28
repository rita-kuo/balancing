export const toLocaleISODateString = (date: Date) => {
  const parts = date.toLocaleString().split(", ");
  const dateParts = parts[0].split("/").map((part) => part.padStart(2, "0"));
  dateParts.unshift(dateParts.pop()!!);
  const timeDefines = parts[1].split(" ");
  const timeParts = timeDefines[0]
    .split(":")
    .map((part) => part.padStart(2, "0"));
  if (timeDefines[1] === "PM" && timeDefines[0].split(":")[0] !== "12") {
    timeParts[0] = (parseInt(timeParts[0]) + 12).toString();
  }

  return `${dateParts.join("-")}T${timeParts.join(":")}`;
};
