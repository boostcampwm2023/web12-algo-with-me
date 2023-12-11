import { useEffect, useState } from 'react';

const TIME_INTERVAL = 1000;
const ADDITIONAL_BUFFER_TIME = 3 * 1000;

export function useDashboardRerenderState(endsAt: Date, bufferTimeAfterCompetitionEnd: Date) {
  const [shouldRenderLoading, setShouldRenderLoading] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentDate = new Date();

      if (
        currentDate >= endsAt &&
        currentDate < new Date(bufferTimeAfterCompetitionEnd.getTime() + ADDITIONAL_BUFFER_TIME)
      ) {
        setShouldRenderLoading(true);
      }

      if (
        currentDate >= new Date(bufferTimeAfterCompetitionEnd.getTime() + ADDITIONAL_BUFFER_TIME)
      ) {
        setShouldRenderLoading(false);
      }
    }, TIME_INTERVAL);

    return () => clearInterval(intervalId);
  }, [endsAt, shouldRenderLoading, bufferTimeAfterCompetitionEnd]);

  return shouldRenderLoading;
}
