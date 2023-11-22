import { useState } from 'react';

import type { CompetitionForm } from '@/apis/competitions';
import type { ProblemId } from '@/apis/problems';
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
  const [problems, setProblems] = useState<ProblemId[]>([]);

  function togglePickedProblem(problemId: ProblemId) {
    if (problems.includes(problemId)) {
      setProblems((ids) => ids.filter((id) => id !== problemId).sort());
    } else {
      setProblems((ids) => [...ids, problemId].sort());
    }
  }

  function getAllFormData() {
    return {
      name,
      detail,
      maxParticipants,
      startsAt: new Date(startsAt).toISOString(),
      endsAt: new Date(endsAt).toISOString(),
      problems,
    };
  }

  return {
    name,
    detail,
    maxParticipants,
    startsAt,
    endsAt,
    problems,
    setName,
    setDetail,
    setMaxParticipants,
    setStartsAt,
    setEndsAt,
    togglePickedProblem,
    getAllFormData,
  };
}
