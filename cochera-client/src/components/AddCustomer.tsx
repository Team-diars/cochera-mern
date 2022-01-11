import { Button } from '@chakra-ui/button'
import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { useDisclosure } from '@chakra-ui/hooks'
import { Input } from '@chakra-ui/input'
import { Box, Text } from '@chakra-ui/layout'
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/modal'
import { OmitCommonProps } from '@chakra-ui/system'
import { message, Upload } from 'antd'
import React, {LegacyRef, RefObject, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../state'
import { addCustomer } from '../state/action-creators'
import { CustomerState, Payload } from '../state/actions/customer'
interface IProps {
  initialRef: LegacyRef<HTMLInputElement>,
  finalRef: React.RefObject<HTMLHeadingElement>,
  isOpen: boolean,
  onClose: () => void,
}
const props = {
  headers: {
    authorization: 'authorization-text',
  },
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  name: 'file',
};
export const AddCustomer: React.FC<IProps> = ({initialRef, finalRef, isOpen, onClose}) => {
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

  const saveCustomer = (e: any) => {
    e.preventDefault();
    dispatch(addCustomer(formData));
    onClose();
  }
  console.log("state.customers: ",state.customers);
  return (
    <>
      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Agregar Cliente</ModalHeader>
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
              <Upload {...props}
                onChange={(response) => {
                  if (response.file.status !== 'uploading') {
                    console.log(response.file, response.fileList);
                  }
                  if (response.file.status === 'done') {
                    message.success(`${response.file.name} 
                                    file uploaded successfully`);
                  } else if (response.file.status === 'error') {
                    message.error(`${response.file.name} 
                                  file upload failed.`);
                  }
                }}
              >
                <Button>Upload File</Button>
              </Upload>
            </FormControl>

          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Cerrar
            </Button>
            <Button variant='ghost' onClick={(e) => saveCustomer(e)}>Guardar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
