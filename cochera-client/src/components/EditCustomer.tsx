import { Button } from '@chakra-ui/button'
import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { useDisclosure } from '@chakra-ui/hooks'
import { Input } from '@chakra-ui/input'
import { Box, Text } from '@chakra-ui/layout'
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/modal'
import { OmitCommonProps } from '@chakra-ui/system'
import { stat } from 'fs'
import React, {LegacyRef, RefObject, useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSelectedContext } from '../context/PopupContext'
import { RootState } from '../state'
import { addCustomer, updateCustomer } from '../state/action-creators'
import { CustomerState, Payload } from '../state/actions/customer'
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
    status: 0,
    cars: [],
    date: null,
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
    console.log("state.customer: ",state.customer);
    if(!state.loading){
      setFormData({
        id: state.customer?.id || "",
        fullname: state.customer?.fullname || "",
        address: state.customer?.address || "",
        cellphone: state.customer?.cellphone || "",
        status: state.customer?.status || 0,
        cars: state.customer?.cars || [],
        date: state.customer?.date || null,
      })
    }
  },[state.customer])
  return (
    <>
      <Modal finalFocusRef={finalRef} isOpen={true} onClose={onClosePopup}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editar Cliente</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
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

            <FormControl mt={4}>
              <FormLabel>Autos</FormLabel>
              <Input placeholder='Autos' onChange={(e) => onChange(e)} />
            </FormControl>

          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClosePopup}>
              Cerrar
            </Button>
            <Button variant='ghost' onClick={(e) => editCustomer(formData)}>Guardar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
