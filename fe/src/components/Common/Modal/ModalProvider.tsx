import type { ReactNode } from 'react';
import { useState } from 'react';

import { ModalContext } from './ModalContext';

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const close = () => {
    setIsOpen(false);
  };
  const open = () => {
    setIsOpen(true);
  };

  return (
    <ModalContext.Provider
      value={{
        isOpen,
        close,
        open,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}
