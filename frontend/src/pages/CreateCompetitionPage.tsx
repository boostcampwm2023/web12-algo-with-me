import { css } from '@style/css';

import type { ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import type { ProblemId, ProblemInfo } from '@/apis/problems';
import { Button, HStack, Input, VStack } from '@/components/Common';
import Header from '@/components/Header';
import { PageLayout } from '@/components/Layout';
import { SelectableProblemList } from '@/components/Problem/SelectableProblemList';
import { SelectedProblemList } from '@/components/Problem/SelectedProblemList';
import { useCompetitionForm } from '@/hooks/competition/useCompetitionForm';
import { useProblemList } from '@/hooks/problem/useProblemList';
import { isNil } from '@/utils/type';

export default function CompetitionCreatePage() {
  const navigate = useNavigate();

  const form = useCompetitionForm();
  const { problemList } = useProblemList();

  const unpickedProblems = problemList.filter((problem) => {
    return !form.problemIds.includes(problem.id);
  });
  const pickedProblems = form.problemIds.map((problemId) => {
    return problemList.find((problem) => problem.id === problemId);
  }) as ProblemInfo[];

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

  function handleToggleSelectedProblem(problemId: ProblemId) {
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

    const TO_DETAIL_PAGE = `/competition/detail/${competition.id}`;
    navigate(TO_DETAIL_PAGE);
  }

  return (
    <>
      <Header></Header>
      <PageLayout>
        <HStack className={contentStyle}>
          <h1>대회 생성하기</h1>
          <Input label="대회 이름" comment="대회 이름은 1글자 이상 들어가야 합니다.">
            <Input.TextField
              name="name"
              value={form.name}
              onChange={handleChangeName}
              placeholder="대회 이름을 입력해주세요"
              required
            ></Input.TextField>
          </Input>
          <Input label="대회 설명" comment="대회 설명은 1글자 이상 들어가야 합니다.">
            <Input.TextArea
              name="detail"
              value={form.detail}
              onChange={handleChangeDetail}
              placeholder="대회 설명을 입력해주세요"
              required
            ></Input.TextArea>
          </Input>
          <Input label="최대 참여 인원" comment="최대 참여 인원은 1명 이상이어야합니다.">
            <Input.NumberField
              name="max-participants"
              value={form.maxParticipants}
              min="1"
              onChange={handleChangeMaxParticipants}
              required
            ></Input.NumberField>
          </Input>
          <VStack className={css({ gap: '3rem' })}>
            <Input
              label="대회 시작 시간"
              comment="현재 시간보다 5분 늦은 시간부터 시작 가능합니다."
            >
              <Input.DateTimeField
                name="starts-at"
                value={form.startsAt}
                onChange={handleChangeStartsAt}
                required
              ></Input.DateTimeField>
            </Input>
            <Input
              label="대회 종료 시간"
              comment="대회 종료는 시작시간보다 늦어야하며 대회는 최소 5분 이상이어야합니다."
            >
              <Input.DateTimeField
                name="ends-at"
                value={form.endsAt}
                onChange={handleChangeEndsAt}
                required
              ></Input.DateTimeField>
            </Input>
          </VStack>
          <VStack alignItems="flexStart" className={css({ gap: '3rem' })}>
            <SelectableProblemList
              problemList={unpickedProblems}
              onSelectProblem={handleToggleSelectedProblem}
            ></SelectableProblemList>
            <SelectedProblemList
              problemList={pickedProblems}
              onCancelProblem={handleToggleSelectedProblem}
            ></SelectedProblemList>
          </VStack>
          <Button theme="brand" onClick={handleSumbitCompetition}>
            대회 생성
          </Button>
        </HStack>
      </PageLayout>
    </>
  );
}

const contentStyle = css({
  margin: '100px auto 0 auto',
  maxWidth: '900px',
  gap: '3rem',
  alignItems: 'flex-start',
});
