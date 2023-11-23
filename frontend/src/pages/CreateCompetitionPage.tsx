import { css } from '@style/css';

import type { ChangeEvent, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import type { ProblemId, ProblemInfo } from '@/apis/problems';
import { Input } from '@/components/Common';
import { useCompetitionForm } from '@/hooks/competition/useCompetitionForm';
import { useProblemList } from '@/hooks/problem/useProblemList';
import { isNil } from '@/utils/type';

export default function CompetitionCreatePage() {
  const navigate = useNavigate();

  const form = useCompetitionForm();
  const { problemList } = useProblemList();

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
    form.togglePickedProblem(problemId);
  }

  async function handleSumbitCompetition() {
    const formData = form.getAllFormData();
    const { isValid, message } = form.validateForm(formData);

    if (!isValid) {
      if (!isNil(message)) {
        alert(message);
      }
      return;
    }

    const competition = await form.submitCompetition(formData);
    if (isNil(competition)) {
      alert('Oops... 대회 생성에 실패했습니다');
      return;
    }

    const TO_DETAIL_PAGE = `/contest/detail/${competition.id}`;
    navigate(TO_DETAIL_PAGE);
  }

  return (
    <main>
      <h1>대회 생성 하기</h1>
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
        <Input label="최대 참여 인원 (1명 이상)">
          <Input.NumberField
            name="max-participants"
            value={form.maxParticipants}
            min="1"
            onChange={handleChangeMaxParticipants}
            required
          ></Input.NumberField>
        </Input>
        <Input label="대회 시작 시간 (현재 시간보다 5분 늦은 시간부터 가능합니다)">
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
          allProblems={problemList}
          pickedProblemIds={form.problems}
          onSelectProblem={handleSelectProblem}
        ></ProblemList>
        <div>선택된 문제: {[...form.problems].join(',')}</div>
      </fieldset>
      <button onClick={handleSumbitCompetition}>대회 생성</button>
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
