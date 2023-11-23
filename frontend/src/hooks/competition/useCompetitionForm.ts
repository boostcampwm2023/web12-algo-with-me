import { useState } from 'react';

import type { CompetitionForm } from '@/apis/competitions';
import { createCompetition } from '@/apis/competitions';
import type { ProblemId } from '@/apis/problems';
import { formatDate, toLocalDate } from '@/utils/date';

type Valid = {
  isValid: boolean;
  message?: string;
};

const FIVE_MIN_BY_MS = 5 * 60 * 1000;
const VALIDATION_MESSAGE = {
  needLongName: '이름은 1글자 이상이어야합니다',
  needMoreParticipants: '최대 참여 인원은 1명 이상이어야 합니다',
  tooEarlyStartTime: '대회 시작 시간은 현재보다 5분 늦은 시간부터 가능합니다',
  tooEarlyEndTime: '대회 종료 시간은 대회 시작시간보다 늦게 끝나야합니다',
  needMoreProblems: '대회 문제는 1개 이상이어야합니다',
};

export function useCompetitionForm(initialForm: Partial<CompetitionForm> = {}) {
  const [name, setName] = useState<string>(initialForm.name ?? '');
  const [detail, setDetail] = useState<string>(initialForm.detail ?? '');
  const [maxParticipants, setMaxParticipants] = useState<number>(initialForm.maxParticipants ?? 1);

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

  function getAllFormData(): CompetitionForm {
    return {
      name,
      detail,
      maxParticipants,
      startsAt: new Date(startsAt).toISOString(),
      endsAt: new Date(endsAt).toISOString(),
      problems,
    };
  }

  async function submitCompetition(formData: CompetitionForm) {
    return await createCompetition(formData);
  }

  function validateForm(formData: CompetitionForm): Valid {
    const { name, maxParticipants, startsAt, endsAt, problems } = formData;
    if (name.length <= 0) {
      return {
        isValid: false,
        message: VALIDATION_MESSAGE.needLongName,
      };
    }

    if (maxParticipants <= 0) {
      return {
        isValid: false,
        message: VALIDATION_MESSAGE.needMoreParticipants,
      };
    }
    if (new Date(startsAt) <= new Date(Date.now() + FIVE_MIN_BY_MS)) {
      return {
        isValid: false,
        message: VALIDATION_MESSAGE.tooEarlyStartTime,
      };
    }

    if (new Date(endsAt) <= new Date(startsAt)) {
      return {
        isValid: false,
        message: VALIDATION_MESSAGE.tooEarlyEndTime,
      };
    }

    if (problems.length <= 0) {
      return {
        isValid: false,
        message: VALIDATION_MESSAGE.needMoreProblems,
      };
    }

    return {
      isValid: true,
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
    submitCompetition,
    validateForm,
  };
}
