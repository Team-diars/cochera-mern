import { Button } from '@chakra-ui/button'
import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/form-control'
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/input'
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/modal'
import React, { LegacyRef, useRef, useState } from 'react'
import { Car, CarState } from '../../state/actions/car'
import { ChromePicker, SketchPicker } from 'react-color';
import reactCSS from 'reactcss'
import { Box, Stack, Text } from '@chakra-ui/layout'
import axios, { AxiosError } from 'axios'
import { FiImage } from 'react-icons/fi'
import { Image } from '@chakra-ui/image'
import { Spinner } from '@chakra-ui/spinner'
import { useParams } from 'react-router'
import { RootState } from '../../state'
import { useDispatch, useSelector } from 'react-redux'
import { addCar } from '../../state/action-creators/car'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { Switch } from '@chakra-ui/switch'
import { AiOutlineSearch } from 'react-icons/ai'
import {BiTimeFive} from 'react-icons/bi'
import { GarageCar } from '../../state/actions/garage'
import { SearchWrapper } from './SearchWrapper'
import { CarItem } from './CarItem'


interface CarProps {
  initialRef: LegacyRef<HTMLInputElement>,
  finalRef: React.RefObject<HTMLHeadingElement>,
  isOpen: boolean,
  onClose: () => void,
}

export const AddGarageCar: React.FC<CarProps> = ({initialRef, finalRef, isOpen, onClose}) => {
  const dispatch = useDispatch();
  // const [checkin, setCheckIn] = useState<Date>(new Date());
  const [customprice, setCustomPrice] = useState<boolean>(false);
  const [formData, setFormData] = useState<GarageCar>({
    checkin: new Date(),
    car: "",
    hasLeftKeys:false,
    hasPaid: false,
    customprice: 0
  })
  // const {checkin, car, hasLeftKeys, hasPaid} = formData;
  const onChange = (e: any) => {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }
  return (
    <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose} motionPreset='slideInBottom' size={'md'}>
      <ModalOverlay />
      <ModalContent maxW="48rem">
        <style>
          {
          `.react-datepicker-wrapper {            
            width: 100%;
            border-radius: 0.375rem;
            padding:0;
            border: 1px solid;
            border-color: inherit;
          }
          .react-datepicker-ignore-onclickoutside{
            outline: none; 
          }
          .react-datepicker__navigation-icon::before{
            width:12px;
            height:12px;
            top:12px;
          }
          .react-datepicker__input-container{
            border-radius: 0.375rem;
            padding: 0;
          }
          .react-datepicker__input-container, .react-datepicker-wrapper{
            cursor: pointer;
          }
          .react-datepicker__input-container > input{
            width: 100%;
            cursor: pointer;
            height: 2.5rem;
            border: none !important;
            padding: 0 2.5rem;
            border-radius: inherit;
          }`
          }
        </style>
        <ModalHeader size='3xl'>Agregar Carro al Garage</ModalHeader>
        <ModalCloseButton />
        <ModalBody >
            <FormControl isRequired>
              <FormLabel>Horario Entrada</FormLabel>
              <InputGroup mt={4}>
                <InputLeftElement
                  pointerEvents='none'
                  color='gray.300'
                  fontSize='1.2em'
                  children={<BiTimeFive color='gray.300' />}
                />
                <DatePicker
                  wrapperClassName="datepicker-react"
                  selected={formData.checkin}
                  onChange={(date: Date) => {
                    const {checkin, ...rest} = formData;
                    setFormData({
                      checkin: date,
                      ...rest
                    })
                  }}
                  timeInputLabel="Time:"
                  dateFormat="dd/MM/yyyy h:mm aa"
                  showTimeInput 
                  minDate={new Date()}
                />
              </InputGroup>
            </FormControl>
            <FormControl mt={4} isRequired position={"relative"}>
              <FormLabel>Auto</FormLabel>
              <InputGroup mt={4}>
                <InputLeftElement
                  pointerEvents='none'
                  color='gray.300'
                  fontSize='1.2em'
                  children={<AiOutlineSearch color='gray.300' />}
                />
                  <Input
                    type="search"
                    name="car"
                    placeholder="Buscar.."
                    onChange={onChange}
                    value={formData.car}
                    autoComplete='off'
                  />
                </InputGroup>
                {
                  (formData.car.length > 0) && <SearchWrapper>
                    <CarItem image="image-1642978527378.png" 
                             brand="Toyota" 
                             licenceplate='ABC-123' 
                             color='#222'
                             model="Faris"
                             type='Auto'
                             customer='Hector Herreraaaaa' />
                    <CarItem image="image-1642978527378.png" 
                             brand="Toyota" 
                             licenceplate='ABC-123' 
                             color='#222'
                             model="Faris"
                             type='Auto'
                             customer='Hector Herreraaaaa' />                             
                  </SearchWrapper>
                }
            </FormControl>
            <FormControl mt={4}>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Button onClick={() => setCustomPrice(!customprice)}>Tarifa Personalizada</Button>
                <FormControl display='flex' alignItems='center' width="fit-content">
                  <FormLabel htmlFor='email-alerts' mb='0'>
                    ¿Dejo Llaves?
                  </FormLabel>
                  <Switch id='email-alerts' />
                </FormControl>
              </Box>
              {
                (customprice) && <InputGroup mt={4}>
                <InputLeftElement
                  pointerEvents='none'
                  color='gray.300'
                  fontSize='1.2em'
                  children={"S/."}
                />
                  <Input
                    type="text"
                    name="appname"
                    placeholder="Precio Tarifa"
                    autoComplete='off'
                  />
                </InputGroup>
              }
            </FormControl>
        </ModalBody>  
        <ModalFooter>
          <Button mr={3} onClick={onClose}>
            Cerrar
          </Button>
          <Button colorScheme='blue' >Guardar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
