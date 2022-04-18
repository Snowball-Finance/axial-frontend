export const dateDifferenceFromNowByHours = ({
  dateInSeconds,
}: {
  dateInSeconds: number;
}) => {
  const date = new Date(dateInSeconds * 1000);
  const now = new Date();
  const diff = date.getTime() - now.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  return hours;
};
