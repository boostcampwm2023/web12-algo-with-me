export default function secToTime(sec: number) {
  const days = Math.floor(sec / (1000 * 60 * 60 * 24));
  const hours = Math.floor((sec % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((sec % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((sec % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds };
}
