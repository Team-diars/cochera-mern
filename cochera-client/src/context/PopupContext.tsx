import { createContext, useContext, useState } from 'react';

type Props = {
  children: React.ReactNode
}

interface Context {
  contextState: {
    isOpen: boolean | null,
    idSelected: string | null,
    isOpenEditCar: boolean | null,
    idCarSelected: string | null,
  },
  contextActions: {
    setIsOpen: (arg: boolean | null) => void,
    setIdSelected: (arg: string | null) => void,
    setIsOpenEditCar: (arg: boolean | null) => void,
    setIdCarSelected: (arg: string | null) => void,
  }
}
export const initialContext: Context = {
  contextState: {
    isOpen: false,
    idSelected: null,
    isOpenEditCar: false,
    idCarSelected: null,
  },
  contextActions: {
    setIsOpen: (x: boolean | null) => {},
    setIdSelected: (id: string | null) => {},
    setIsOpenEditCar: (x: boolean | null) => {},
    setIdCarSelected: (id: string | null) => {}
  },
}
const PopupContext = createContext<Context | undefined>(initialContext);

export const useSelectedContext = () => useContext(PopupContext) as Context

const AppContextProvider = ({ children }: Props): JSX.Element => {
  /* Customer Edit Popup */
  const [isOpen, setIsOpenPopup] = useState<Context['contextState']['isOpen']>(null);
  const [idSelected, setIdSelected] = useState<Context['contextState']['idSelected']>(null);
  
  /* Car Edit Popup */
  const [isOpenEditCar, setIsOpenEditCar] = useState<Context['contextState']['isOpenEditCar']>(null);
  const [idCarSelected, setIdCarSelected] = useState<Context['contextState']['idCarSelected']>(null);
  const setIsOpen: Context['contextActions']['setIsOpen'] = (value: boolean | null) => setIsOpenPopup(value)
  return (
    <PopupContext.Provider value={{ contextState:{
                                      isOpen, 
                                      idSelected,
                                      isOpenEditCar,
                                      idCarSelected
                                    }, 
                                    contextActions:{
                                      setIsOpen, 
                                      setIdSelected,
                                      setIsOpenEditCar,
                                      setIdCarSelected
                                    }}}>
      {children}
    </PopupContext.Provider>
  );
};

export { PopupContext, AppContextProvider };
