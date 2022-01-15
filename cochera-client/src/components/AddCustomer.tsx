import { Button } from '@chakra-ui/button'
import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { useDisclosure } from '@chakra-ui/hooks'
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/input'
import { Box, Text } from '@chakra-ui/layout'
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/modal'
import { OmitCommonProps } from '@chakra-ui/system'
import { message, Upload } from 'antd'
import React, {LegacyRef, RefObject, useRef, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../state'
import { addCustomer } from '../state/action-creators'
import { CustomerState, Payload } from '../state/actions/customer'
import axios, { AxiosError, AxiosResponse } from "axios";
import { FiFile } from 'react-icons/fi'
import { Spinner } from '@chakra-ui/spinner'
import { Image } from '@chakra-ui/image'

interface IProps {
  initialRef: LegacyRef<HTMLInputElement>,
  finalRef: React.RefObject<HTMLHeadingElement>,
  isOpen: boolean,
  onClose: () => void,
}

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
  const imageRef = useRef<any>(null);
  const [uploading, setUploading] = useState(false);
  const [image, setImage] = useState("");

  const uploadFileHandler = async (e: any) => {
    e.preventDefault();
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
              <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<FiFile />}
                  />
                  <Input
                    type="file"
                    accept="image/*"
                    // ref={imageRef}
                    onChange={uploadFileHandler}
                    // style={{ display: "none" }}
                  ></Input>
                  {/* <Input
                    onClick={() => imageRef.current.click()}
                    value={image}
                    isReadOnly
                  /> */}
                </InputGroup>
                <Box
                  mt="1"
                  py="1"
                  px="2"
                  textAlign="center"
                  style={{ background: "#eee" }}
                >
                  <Text
                    fontWeight="semibold"
                    style={{ display: (uploading || image) && "none" }}
                  >
                    No hay imagen previa
                  </Text>
                  {!uploading ? (
                    image && (
                      <Image
                        marginX="auto"
                        borderRadius="full"
                        boxSize="50px"
                        src={`/images/${image}`}
                        alt="Imagen"
                      />
                    )
                  ) : (
                    <Spinner label="cargando" speed="0.65s" size="md" />
                  )}
                </Box>
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
