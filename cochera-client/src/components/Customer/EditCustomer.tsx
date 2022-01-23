import { Button } from '@chakra-ui/button'
import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { Input } from '@chakra-ui/input'
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/modal'
import React, {LegacyRef, useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSelectedContext } from '../../context/PopupContext'
import { RootState } from '../../state'
import { addCustomer, updateCustomer } from '../../state/action-creators'
import { CustomerState, Payload } from '../../state/actions/customer'
import { CircularProgress } from '@chakra-ui/progress'

function getBase64(file: Blob | undefined) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    }
  });
}
const convertBase64 = (file:File) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file)
    fileReader.onload = () => {
      resolve(fileReader?.result);
    }
    fileReader.onerror = (error) => {
      reject(error);
    }
  })
}

interface IProps {
  initialRef: LegacyRef<HTMLInputElement>,
  finalRef: React.RefObject<HTMLHeadingElement>,
  isOpen: boolean,
  onClose: () => void,
}
export const EditCustomer: React.FC<IProps> = ({initialRef, finalRef, isOpen, onClose}) => {
  const state: CustomerState = useSelector((state: RootState) => state.customers);
  const [formData, setFormData] = useState<Payload>({
    id: "",
    fullname: "",
    address: "",
    cellphone: "",
    cars: [],
    date: new Date,
  })
  const {fullname, address, cellphone} = formData;
  const onChange = (e: any) => {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }
  const dispatch = useDispatch();
  const {contextActions: {setIsOpen, setIdSelected}, contextState: {isOpen: isEditPopupOpen}} = useSelectedContext();
  const editCustomer = (formData: Payload) => {
    if(!formData.id) return;
    dispatch(updateCustomer(formData));
    onClosePopup();
  }
  const onClosePopup = () => {
    setIsOpen(false);
    setIdSelected(null);    
    onClose();
  }
  useEffect(() => {
    if(!state.loading){
      setFormData({
        id: state.customer?.id || "",
        fullname: state.customer?.fullname || "",
        address: state.customer?.address || "",
        cellphone: state.customer?.cellphone || "",
        cars: state.customer?.cars || [],
        date: state.customer?.date || new Date,
      })
    }
  },[state.customer])
  
  return (
    <Modal finalFocusRef={finalRef} isOpen={true} onClose={onClosePopup}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Editar Cliente</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {
            (state.loading) ? <CircularProgress isIndeterminate color='green.300' /> : (
              <>
                <FormControl>
                  <FormLabel>Nombre Completo</FormLabel>
                  <Input ref={initialRef} placeholder='Nombre Completo' name="fullname" onChange={(e) => onChange(e)} value={fullname}/>
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Telefono</FormLabel>
                  <Input placeholder='Telefono' name="cellphone" onChange={(e) => onChange(e)} value={cellphone}/>
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Direccion</FormLabel>
                  <Input placeholder='Direccion' name="address" onChange={(e) => onChange(e)} value={address}/>
                </FormControl>
              </>
            )
          }

        </ModalBody>
        <ModalFooter>
          <Button mr={3} onClick={onClosePopup}>
            Cerrar
          </Button>
          <Button colorScheme='blue' onClick={(e) => editCustomer(formData)}>Guardar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
