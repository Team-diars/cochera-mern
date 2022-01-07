import { createContext, useContext, useState } from 'react';

type Props = {
  children: React.ReactNode
}

interface Context {
  contextState: {
    isOpen: boolean | null,
  },
  contextActions: {
    setIsOpen: (arg: boolean | null) => void
  }
}
export const initialContext: Context = {
  contextState: {
    isOpen: false,
  },
  contextActions: {
    setIsOpen: (x: boolean | null) => {}
  },
}
const PopupContext = createContext<Context | undefined>(initialContext);

export const useSelectedContext = () => useContext(PopupContext) as Context

const AppContextProvider = ({ children }: Props): JSX.Element => {
  const [isOpenPopup, setIsOpenPopup] = useState<Context['contextState']['isOpen']>(null);
  const setIsOpen: Context['contextActions']['setIsOpen'] = (value: boolean | null) => setIsOpenPopup(value)
  return (
    <PopupContext.Provider value={{ contextState:{isOpen: isOpenPopup} , contextActions:{setIsOpen: setIsOpen} }}>
      {children}
    </PopupContext.Provider>
  );
};

export { PopupContext, AppContextProvider };
