import { useEffect, useState } from 'react';

const TIME_INTERVAL = 1000;

export function useCompetitionRerender(startsAt: Date, endsAt: Date) {
  const [shouldRerenderDuring, setShouldRerenderDuring] = useState(false);
  const [shouldRerenderAfter, setShouldRerenderAfter] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentDate = new Date();
      if (currentDate >= startsAt && !shouldRerenderDuring) {
        setShouldRerenderDuring(true);
      }

      if (currentDate >= endsAt && !shouldRerenderAfter) {
        setShouldRerenderAfter(true);
      }
    }, TIME_INTERVAL);

    return () => clearInterval(intervalId);
  }, [startsAt, endsAt, shouldRerenderDuring, shouldRerenderAfter]);

  return { shouldRerenderDuring, shouldRerenderAfter };
}
