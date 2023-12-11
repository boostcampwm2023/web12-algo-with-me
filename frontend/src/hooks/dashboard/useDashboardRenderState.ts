import { useEffect, useState } from 'react';

const TIME_INTERVAL = 1000;

export function useDashboardRerenderState(endsAt: Date, bufferTimeAfterCompetitionEnd: Date) {
  const [shouldRenderLoading, setShouldRenderLoading] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentDate = new Date();

      if (currentDate >= endsAt && currentDate <= bufferTimeAfterCompetitionEnd) {
        setShouldRenderLoading(false);
        return;
      }

      setShouldRenderLoading(true);
      return;
    }, TIME_INTERVAL);

    return () => clearInterval(intervalId);
  }, [endsAt, shouldRenderLoading]);

  return shouldRenderLoading;
}
