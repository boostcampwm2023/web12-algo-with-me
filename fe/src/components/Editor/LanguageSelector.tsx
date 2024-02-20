import { css } from '@style/css';

import { useState } from 'react';

import { LangaugeType } from '@/hooks/editor/types';

type Props = {
  language: LangaugeType;
  onChangeLanguage: (langauge: LangaugeType) => void;
  options: LangaugeType[];
};

export function LanguageSelector({ language, onChangeLanguage, options }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: LangaugeType) => {
    onChangeLanguage(option);
    setIsOpen(false);
  };

  return (
    <section className={LanguageSelectorStyle}>
      <button className={ButtonStyle} onClick={toggleMenu}>
        {language} <span className={downArrowStyle}>▼</span>
      </button>

      {isOpen && (
        <ul className={UlStyle}>
          {options.map((option, index) => (
            <li className={LiStyle} key={index} onClick={() => handleOptionClick(option)}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

const LanguageSelectorStyle = css({
  position: 'relative',
});

const ButtonStyle = css({
  cursor: 'pointer',
  padding: '0px 8px',
  fontSize: '14px',
  backgroundColor: 'surface',
  _hover: { backgroundColor: 'surface.alt' },
});

const UlStyle = css({
  padding: '8px 16px',
  position: 'absolute',
  top: '28px',
  right: '0',
  zIndex: 999,
  backgroundColor: 'white',
  borderRadius: '5px',
  color: 'black',
});

const LiStyle = css({
  _hover: { color: 'surface.alt' },
  cursor: 'pointer',
});

const downArrowStyle = css({
  fontSize: '8px',
});
