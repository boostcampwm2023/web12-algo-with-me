import { css } from '@style/css';

import type { ChangeEvent, HTMLAttributes } from 'react';
import { useState } from 'react';

import { formatDate, toLocalDate } from '@/utils/date';

import axios from 'axios';

export default function CompetitionCreatePage() {
  const [name, setName] = useState<string>('');
  const [detail, setDetail] = useState<string>('');
  const [maxParticipants, setMaxParticipants] = useState<number>(0);

  const currentDate = toLocalDate(new Date());
  const currentDateStr = formatDate(currentDate, 'YYYY-MM-DDThh:mm');

  const [startsAt, setStartsAt] = useState<string>(currentDateStr);
  const [endsAt, setEndsAt] = useState<string>(currentDateStr);

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

  const handleSubmitCompetition = async () => {
    // TODO: problems추가하기
    const data = {
      name,
      detail,
      maxParticipants,
      startsAt: new Date(startsAt).toISOString(),
      endsAt: new Date(endsAt).toISOString(),
    };
    await axios.post('http://101.101.208.240:3000/competitions', data);
  };

  return (
    <main>
      <h1>대회 생성</h1>
      <fieldset className={fieldSetStyle}>
        <Label>
          <Label.Text>대회 이름</Label.Text>
          <input
            name="name"
            className={inputStyle}
            value={name}
            onChange={handleChangeName}
            placeholder="대회 이름을 입력해주세요"
            required
          ></input>
        </Label>
        <Label>
          <Label.Text>대회 설명</Label.Text>
          <textarea
            name="detail"
            className={inputStyle}
            value={detail}
            onChange={handleChangeDetail}
            placeholder="대회 설명을 입력해주세요"
            required
          ></textarea>
        </Label>
        <Label>
          <Label.Text>최대 참여 인원</Label.Text>
          <input
            name="max-participants"
            type="number"
            min="0"
            className={inputStyle}
            value={maxParticipants}
            onChange={handleChangeMaxParticipants}
            required
          ></input>
        </Label>
        <Label>
          <Label.Text>대회 시작 시간</Label.Text>
          <input
            type="datetime-local"
            name="starts-at"
            className={inputStyle}
            value={startsAt}
            onChange={handleChangeStartsAt}
            required
          ></input>
        </Label>
        <Label>
          <Label.Text>대회 종료 시간</Label.Text>
          <input
            name="ends-at"
            type="datetime-local"
            className={inputStyle}
            value={endsAt}
            onChange={handleChangeEndsAt}
            required
          ></input>
        </Label>
      </fieldset>
      <button id="create-competition" onClick={handleSubmitCompetition}>
        대회 생성
      </button>
    </main>
  );
}

interface LabelProps extends HTMLAttributes<HTMLLabelElement> {}

const Label = ({ className, children, ...rest }: LabelProps) => {
  return (
    <label {...rest} className={`${className} ${labelStyle}`}>
      {children}
    </label>
  );
};

interface LabelTextProps extends HTMLAttributes<HTMLSpanElement> {}

Label.Text = ({ className, children, ...rest }: LabelTextProps) => {
  return (
    <span {...rest} className={`${className} ${labelTextStyle}`}>
      {children}
    </span>
  );
};

const fieldSetStyle = css({
  display: 'flex',
  flexDirection: 'column',
});

const inputStyle = css({
  border: '1px solid black',
  width: '20rem',
});

const labelStyle = css({
  display: 'flex',
  flexDirection: 'row',
  textAlign: 'center',
  gap: '4',
});

const labelTextStyle = css({
  margin: 'auto 0',
  width: '8rem',
  textAlign: 'left',
});
