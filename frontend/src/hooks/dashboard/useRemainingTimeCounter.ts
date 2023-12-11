import { useEffect, useState } from 'react';

export function useRemainingTimeCounter(endsAt: Date) {
  const [remainingTime, setRemainingTime] = useState<string>('');

  useEffect(() => {
    const endsAtDate = new Date(endsAt);

    const calculateRemainingTime = () => {
      const currentTime = new Date();
      const timeDifference = endsAtDate.getTime() - currentTime.getTime();

      if (timeDifference > 0) {
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        return `${minutes}분 ${seconds}초`;
      }

      return '';
    };

    const intervalId = setInterval(() => {
      const newRemainingTime = calculateRemainingTime();
      setRemainingTime(newRemainingTime);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [endsAt]);

  return remainingTime;
}
