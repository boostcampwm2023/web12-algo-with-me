import { css, cx } from '@style/css';

import type { HTMLAttributes, MouseEvent } from 'react';
import { useContext, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

import { ModalContext } from './ModalContext';
import { ModalProvider } from './ModalProvider';

export interface Props extends HTMLAttributes<HTMLDialogElement> {
  onBackdropPressed?: () => void;
}

export function Modal({ onBackdropPressed, children, className, ...props }: Props) {
  const modal = useContext(ModalContext);
  const $dialog = useRef<HTMLDialogElement>(null);

  const handleClickBackdrop = (e: MouseEvent<HTMLDialogElement>) => {
    const $target = e.target as HTMLDialogElement;

    if ($target.nodeName !== 'DIALOG') return;

    if (onBackdropPressed instanceof Function) {
      onBackdropPressed();
    }
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
      className={cx(className, style, dialogStyle)}
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

Modal.Context = ModalContext;
Modal.Provider = ModalProvider;

const style = css({
  borderRadius: '0.5rem',
  padding: '2rem',
  background: 'background',
  color: 'text',
});

const dialogStyle = css({
  position: 'fixed',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%,-50%)',
  _backdrop: {
    background: 'rgba(00,00,00,0.2)',
    backdropFilter: 'blur(0.1rem)',
  },
});

const contentStyle = css({
  width: '100%',
  height: '100%',
});
