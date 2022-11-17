export const stringDateToDate = (dateString: string): string => {
  const dateParts = dateString.split(' ').slice(1);
  const datePart = dateParts[0];
  const date = new Date();
  switch (dateParts[1]) {
    case 'dny':
      date.setDate(date.getDate() - parseInt(datePart));
      break;
    case 'hodinami':
      date.setHours(date.getHours() - parseInt(datePart));
      break;
    case 'minutami':
      date.setMinutes(date.getMinutes() - parseInt(datePart));
      break;
    case 'dnem':
      date.setDate(date.getDate() - 1);
      break;
    default:
      break;
  }

  return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
};
