import { Button, IconButton } from '@chakra-ui/button'
import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { useDisclosure } from '@chakra-ui/hooks'
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/input'
import { Box, Text } from '@chakra-ui/layout'
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useModal } from '@chakra-ui/modal'
import React, {LegacyRef, RefObject, useRef, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../state/index'
import { addCustomer } from '../../state/action-creators'
import { CustomerState, Payload, Car } from '../../state/actions/customer'
import axios, { AxiosError } from "axios";


interface IProps {
  initialRef: LegacyRef<HTMLInputElement>,
  finalRef: React.RefObject<HTMLHeadingElement>,
  isOpen: boolean,
  onClose: () => void,
}

export const AddCustomer: React.FC<IProps> = ({initialRef, finalRef, isOpen, onClose}) => {
  const state: CustomerState = useSelector((state: RootState) => state.customers);
  const [carsCounter, setCarsCounter] = useState(1);
  const [cars, setCars] = useState<Array<Car>>([]);
  const [formData, setFormData] = useState<Payload>({
    id: "",
    fullname: "",
    address: "",
    cellphone: "",
    cars: [],
    date: new Date,
  })
  const {fullname, address, cellphone} = formData;
  const imageRef = useRef<any>(null);
  const [uploading, setUploading] = useState(false);
  const [image, setImage] = useState("");

  const uploadFileHandler = async (e: any) => {
    // console.log("Imagen:", e.currentTarget.files[0]);
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      setUploading(true);
      try {
        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };
        const { data } = await axios.post("http://localhost:8000/api/upload", formData, config);
        console.log("data: ",data);
        setImage(data);
        setUploading(false);
      } catch (error) {
        let err = error as AxiosError;
        if (err.response){
          console.error(err.response);
        }
        setUploading(false);
      }
    }
  };

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
      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose} motionPreset='slideInBottom' size={'md'}>
        <ModalOverlay />
        <ModalContent >
          <ModalHeader size='3xl'>Agregar Cliente</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired>
              <FormLabel>Nombre Completo</FormLabel>
              <Input ref={initialRef} placeholder='Nombre Completo' name="fullname" onChange={(e) => onChange(e)} value={fullname}/>
            </FormControl>
            <FormControl isRequired mt={4}>
              <FormLabel>Telefono</FormLabel>
              <Input placeholder='Telefono' name="cellphone" onChange={(e) => onChange(e)} value={cellphone}/>
            </FormControl>
            <FormControl isRequired mt={4}>
              <FormLabel>Direccion</FormLabel>
              <Input placeholder='Direccion' name="address" onChange={(e) => onChange(e)} value={address}/>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Cerrar
            </Button>
            <Button colorScheme='blue' onClick={(e) => saveCustomer(e)}>Guardar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
