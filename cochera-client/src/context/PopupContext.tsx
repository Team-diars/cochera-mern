import { createContext, useContext, useState } from 'react';

type Props = {
  children: React.ReactNode
}

interface Context {
  contextState: {
    isOpen: boolean | null,
    idSelected: string | null,
  },
  contextActions: {
    setIsOpen: (arg: boolean | null) => void,
    setIdSelected: (arg: string | null) => void,
  }
}
export const initialContext: Context = {
  contextState: {
    isOpen: false,
    idSelected: null,
  },
  contextActions: {
    setIsOpen: (x: boolean | null) => {},
    setIdSelected: (id: string | null) => {}
  },
}
const PopupContext = createContext<Context | undefined>(initialContext);

export const useSelectedContext = () => useContext(PopupContext) as Context

const AppContextProvider = ({ children }: Props): JSX.Element => {
  const [isOpenPopup, setIsOpenPopup] = useState<Context['contextState']['isOpen']>(null);
  const [idSelected, setIdSelected] = useState<Context['contextState']['idSelected']>(null);
  const setIsOpen: Context['contextActions']['setIsOpen'] = (value: boolean | null) => setIsOpenPopup(value)
  return (
    <PopupContext.Provider value={{ contextState:{isOpen: isOpenPopup, idSelected: idSelected}, 
                                    contextActions:{setIsOpen: setIsOpen, setIdSelected: setIdSelected} }}>
      {children}
    </PopupContext.Provider>
  );
};

export { PopupContext, AppContextProvider };
