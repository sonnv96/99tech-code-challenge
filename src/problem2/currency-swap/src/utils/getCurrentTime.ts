export const getCurrentTime = () => {
  const now = new Date();

  const hours = now.getUTCHours();
  const minutes = now.getUTCMinutes();

  const period = hours >= 12 ? "PM" : "AM";

  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  const timeString = `${formattedHours}:${formattedMinutes}${period} UTC`;

  return `Last updated at ${timeString}.`;
};
