import { css } from '@style/css';

import type { ChangeEvent, MouseEvent } from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { CompetitionForm, createCompetition } from '@/apis/competitions';
import type { ProblemId, ProblemInfo } from '@/apis/problems';
import { fetchProblemList } from '@/apis/problems';
import { Input } from '@/components/Common';
import { formatDate, toLocalDate } from '@/utils/date';
import { isNil } from '@/utils/type';

export default function CompetitionCreatePage() {
  const navigate = useNavigate();
  const [name, setName] = useState<string>('');
  const [detail, setDetail] = useState<string>('');
  const [maxParticipants, setMaxParticipants] = useState<number>(0);

  const currentDate = toLocalDate(new Date());
  const currentDateStr = formatDate(currentDate, 'YYYY-MM-DDThh:mm');

  const [startsAt, setStartsAt] = useState<string>(currentDateStr);
  const [endsAt, setEndsAt] = useState<string>(currentDateStr);
  const [pickedProblemIds, setPickedProblemIds] = useState<ProblemId[]>([]);
  const [allProblems, setAllProblems] = useState<ProblemInfo[]>([]);

  async function updateProblemList() {
    const problems = await fetchProblemList();

    setAllProblems(problems);
  }

  useEffect(() => {
    updateProblemList();
  }, []);

  function handleChangeName(e: ChangeEvent<HTMLInputElement>) {
    const newName = e.target.value;
    setName(newName);
  }

  function handleChangeDetail(e: ChangeEvent<HTMLTextAreaElement>) {
    const newDetail = e.target.value;
    setDetail(newDetail);
  }

  function handleChangeMaxParticipants(e: ChangeEvent<HTMLInputElement>) {
    const newMaxParticipants = Number(e.target.value);
    setMaxParticipants(newMaxParticipants);
  }

  function handleChangeStartsAt(e: ChangeEvent<HTMLInputElement>) {
    const newStartsAt = e.target.value;
    setStartsAt(newStartsAt);
  }

  function handleChangeEndsAt(e: ChangeEvent<HTMLInputElement>) {
    const newEndsAt = e.target.value;
    setEndsAt(newEndsAt);
  }

  function handleSelectProblem(e: MouseEvent<HTMLUListElement>) {
    const $target = e.target as HTMLElement;
    if ($target.tagName !== 'BUTTON') return;

    const $li = $target.closest('li');
    if (!$li) return;

    const problemId = Number($li.dataset['problemId']);

    if (pickedProblemIds.includes(problemId)) {
      setPickedProblemIds((ids) => ids.filter((id) => id !== problemId));
    } else {
      setPickedProblemIds((ids) => [...ids, problemId]);
    }
  }

  async function handleSubmitCompetition() {
    const competitionForm = {
      name,
      detail,
      maxParticipants,
      startsAt: new Date(startsAt).toISOString(),
      endsAt: new Date(endsAt).toISOString(),
      problems: pickedProblemIds,
    } satisfies CompetitionForm;

    const competitionInfo = await createCompetition(competitionForm);
    if (isNil(competitionInfo)) return;

    const { id } = competitionInfo;
    navigate(`/contest/detail/${id}`);
  }

  return (
    <main>
      <fieldset className={fieldSetStyle}>
        <Input label="대회 이름">
          <Input.TextField
            name="name"
            value={name}
            onChange={handleChangeName}
            placeholder="대회 이름을 입력해주세요"
            required
          ></Input.TextField>
        </Input>
        <Input label="대회 설명">
          <Input.TextArea
            name="detail"
            value={detail}
            onChange={handleChangeDetail}
            placeholder="대회 설명을 입력해주세요"
            required
          ></Input.TextArea>
        </Input>
        <Input label="최대 참여 인원">
          <Input.NumberField
            name="max-participants"
            value={maxParticipants}
            min="0"
            onChange={handleChangeMaxParticipants}
            required
          ></Input.NumberField>
        </Input>
        <Input label="대회 시작 시간">
          <Input.DateTimeField
            name="starts-at"
            value={startsAt}
            onChange={handleChangeStartsAt}
            required
          ></Input.DateTimeField>
        </Input>
        <Input label="대회 종료 시간">
          <Input.DateTimeField
            name="ends-at"
            value={endsAt}
            onChange={handleChangeEndsAt}
            required
          ></Input.DateTimeField>
        </Input>
        <ul onClick={handleSelectProblem}>
          {allProblems.map(({ id, title }) => (
            <li key={id} data-problem-id={id}>
              <span>
                {id}: {title}
              </span>
              {pickedProblemIds.includes(id) ? <button>취소</button> : <button>선택</button>}
            </li>
          ))}
        </ul>
        <div>선택된 문제: {[...pickedProblemIds].sort().join(',')}</div>
      </fieldset>
      <button id="create-competition" onClick={handleSubmitCompetition}>
        대회 생성
      </button>
    </main>
  );
}

const fieldSetStyle = css({
  display: 'flex',
  flexDirection: 'column',
});
