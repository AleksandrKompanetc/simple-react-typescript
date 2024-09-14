import {createContext} from 'react';

interface IModalContext {
  modal: boolean
  open: () => void
  close: () => void
}

export const ModalContext = createContext<IModalContext>({
  modal: false,
  open: () => {},
  close: () => {}
})