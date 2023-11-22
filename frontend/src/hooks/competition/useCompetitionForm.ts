import { useState } from 'react';

import type { CompetitionForm } from '@/apis/competitions';
import { formatDate, toLocalDate } from '@/utils/date';

export function useCompetitionForm(initialForm?: Partial<CompetitionForm>) {
  initialForm = initialForm ?? {};

  const [name, setName] = useState<string>(initialForm.name ?? '');
  const [detail, setDetail] = useState<string>(initialForm.detail ?? '');
  const [maxParticipants, setMaxParticipants] = useState<number>(initialForm.maxParticipants ?? 0);

  const currentDate = toLocalDate(new Date());
  const currentDateStr = formatDate(currentDate, 'YYYY-MM-DDThh:mm');

  const [startsAt, setStartsAt] = useState<string>(initialForm.startsAt ?? currentDateStr);
  const [endsAt, setEndsAt] = useState<string>(initialForm.endsAt ?? currentDateStr);

  function getAllFormData() {
    return {
      name,
      detail,
      maxParticipants,
      startsAt: new Date(startsAt).toISOString(),
      endsAt: new Date(endsAt).toISOString(),
    };
  }

  return {
    name,
    detail,
    maxParticipants,
    startsAt,
    endsAt,
    setName,
    setDetail,
    setMaxParticipants,
    setStartsAt,
    setEndsAt,
    getAllFormData,
  };
}
