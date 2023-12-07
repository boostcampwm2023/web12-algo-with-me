import { createContext } from 'react';

interface ModalContextProps {
  isOpen: boolean;
  close: () => void;
  open: () => void;
}

export const ModalContext = createContext<ModalContextProps>({
  isOpen: false,
  close: () => {},
  open: () => {},
});
