import { css, cx } from '@style/css';

import type { HTMLAttributes, MouseEvent } from 'react';
import { useContext, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

import { ModalContext } from './ModalContext';

interface Props extends HTMLAttributes<HTMLDialogElement> {}

export function Modal({ children, ...props }: Props) {
  const modal = useContext(ModalContext);
  const $dialog = useRef<HTMLDialogElement>(null);

  const handleClickBackdrop = (e: MouseEvent<HTMLDialogElement>) => {
    const $target = e.target as HTMLDialogElement;

    if ($target.nodeName !== 'DIALOG') return;

    modal.close();
  };

  useEffect(() => {
    if (modal.isOpen) {
      $dialog.current?.showModal();
    } else {
      $dialog.current?.close();
    }
  }, [modal.isOpen]);

  return ReactDOM.createPortal(
    <dialog
      ref={$dialog}
      className={cx(style, dialogStyle)}
      aria-modal="true"
      aria-labelledby="dialog-title"
      onClick={handleClickBackdrop}
      {...props}
    >
      <div className={contentStyle}>{children}</div>
    </dialog>,
    document.body,
  );
}

const style = css({
  borderRadius: '0.5rem',
});

const dialogStyle = css({
  position: 'fixed',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%,-50%)',
  width: '500px',
  height: '400px',
  _backdrop: {
    background: 'rgba(00,00,00,0.5)',
    backdropFilter: 'blur(1rem)',
  },
});

const contentStyle = css({
  width: '100%',
  height: '100%',
});
