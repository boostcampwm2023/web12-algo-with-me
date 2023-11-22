import { css } from '@style/css';

import type { ChangeEvent, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import { CompetitionForm, createCompetition } from '@/apis/competitions';
import type { ProblemId, ProblemInfo } from '@/apis/problems';
import { Input } from '@/components/Common';
import { useCompetitionForm } from '@/hooks/competition/useCompetitionForm';
import { useProblemList } from '@/hooks/problem/useProblemList';
import { isNil } from '@/utils/type';

export default function CompetitionCreatePage() {
  const navigate = useNavigate();

  const form = useCompetitionForm();
  const { pickedProblemIds, allProblems, togglePickedProblem } = useProblemList();

  function handleChangeName(e: ChangeEvent<HTMLInputElement>) {
    const newName = e.target.value;
    form.setName(newName);
  }

  function handleChangeDetail(e: ChangeEvent<HTMLTextAreaElement>) {
    const newDetail = e.target.value;
    form.setDetail(newDetail);
  }

  function handleChangeMaxParticipants(e: ChangeEvent<HTMLInputElement>) {
    const newMaxParticipants = Number(e.target.value);
    form.setMaxParticipants(newMaxParticipants);
  }

  function handleChangeStartsAt(e: ChangeEvent<HTMLInputElement>) {
    const newStartsAt = e.target.value;
    form.setStartsAt(newStartsAt);
  }

  function handleChangeEndsAt(e: ChangeEvent<HTMLInputElement>) {
    const newEndsAt = e.target.value;
    form.setEndsAt(newEndsAt);
  }

  function handleSelectProblem(problemId: ProblemId) {
    togglePickedProblem(problemId);
  }

  async function handleSubmitCompetition() {
    const competitionForm = {
      ...form.getAllFormData(),
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
            value={form.name}
            onChange={handleChangeName}
            placeholder="대회 이름을 입력해주세요"
            required
          ></Input.TextField>
        </Input>
        <Input label="대회 설명">
          <Input.TextArea
            name="detail"
            value={form.detail}
            onChange={handleChangeDetail}
            placeholder="대회 설명을 입력해주세요"
            required
          ></Input.TextArea>
        </Input>
        <Input label="최대 참여 인원">
          <Input.NumberField
            name="max-participants"
            value={form.maxParticipants}
            min="0"
            onChange={handleChangeMaxParticipants}
            required
          ></Input.NumberField>
        </Input>
        <Input label="대회 시작 시간">
          <Input.DateTimeField
            name="starts-at"
            value={form.startsAt}
            onChange={handleChangeStartsAt}
            required
          ></Input.DateTimeField>
        </Input>
        <Input label="대회 종료 시간">
          <Input.DateTimeField
            name="ends-at"
            value={form.endsAt}
            onChange={handleChangeEndsAt}
            required
          ></Input.DateTimeField>
        </Input>
        <ProblemList
          allProblems={allProblems}
          pickedProblemIds={pickedProblemIds}
          onSelectProblem={handleSelectProblem}
        ></ProblemList>
        <div>선택된 문제: {[...pickedProblemIds].join(',')}</div>
      </fieldset>
      <button onClick={handleSubmitCompetition}>대회 생성</button>
    </main>
  );
}

interface ProblemListProps {
  allProblems: ProblemInfo[];
  pickedProblemIds: ProblemId[];
  onSelectProblem: (problemId: ProblemId) => void;
}

const ProblemList = ({ allProblems, pickedProblemIds, onSelectProblem }: ProblemListProps) => {
  function handleSelectProblem(e: MouseEvent<HTMLUListElement>) {
    const $target = e.target as HTMLElement;
    if ($target.tagName !== 'BUTTON') return;

    const $li = $target.closest('li');
    if (!$li) return;

    const problemId = Number($li.dataset['problemId']);
    onSelectProblem(problemId);
  }

  return (
    <ul onClick={handleSelectProblem}>
      {allProblems.map(({ id, title }) => (
        <li key={id} data-problem-id={id}>
          <span>
            {id}: {title}
          </span>
          <button>{pickedProblemIds.includes(id) ? '취소' : '선택'}</button>
        </li>
      ))}
    </ul>
  );
};

const fieldSetStyle = css({
  display: 'flex',
  flexDirection: 'column',
});
