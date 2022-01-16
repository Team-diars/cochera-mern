import { Button } from '@chakra-ui/button'
import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { Input } from '@chakra-ui/input'
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/modal'
import React, { LegacyRef, useState } from 'react'
import { Car } from '../../state/actions/customer'
import { ChromePicker, SketchPicker } from 'react-color';
import reactCSS from 'reactcss'
import { Box } from '@chakra-ui/layout'
var { EditableInput } = require('react-color/lib/components/common');

interface CarProps {
  initialRef: LegacyRef<HTMLInputElement>,
  finalRef: React.RefObject<HTMLHeadingElement>,
  isOpen: boolean,
  onClose: () => void,
}

export const AddCar: React.FC<CarProps> = ({initialRef, finalRef, isOpen, onClose}) => {
  const [formData, setFormData] = useState<Car>({
    image:[],
    brand: "",
    model:"",
    licenceplate:"",
    color: "#000"
  })
  const {image, brand, color, licenceplate, model} = formData;
  const [picker, setPicker] = useState({
    displayColorPicker: false,
    color: "#fff",
  })
  const saveCar = (e: any) => {

  }
  const handleOpenPicker = () => {
    const {displayColorPicker, ...rest} = picker
    setPicker({
      displayColorPicker: !displayColorPicker,
      ...rest
    })
  }
  const handleClosePicker = () => {
    const {displayColorPicker, ...rest} = picker
    setPicker({
      displayColorPicker: false,
      ...rest
    })
  }
  const onChange = (e: any) => {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }
  const handleChangeComplete = (color: any) => {
    console.log("color: ",color.hex);
    const {color:colorFormData, ...rest} = formData;
    setFormData({
      color:color.hex,
      ...rest
    })
  };
  const styles = reactCSS({
    'default': {
      color: {
        width: '36px',
        height: '14px',
        borderRadius: '2px',
        background: `${color}`,
      },
      swatch: {
        padding: '5px',
        background: '#fff',
        borderRadius: '1px',
        boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
        display: 'inline-block',
        cursor: 'pointer',
      },
      popover: {
        position: 'absolute',
        zIndex: '2',
      } as React.CSSProperties,
      cover: {
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
      } as React.CSSProperties,
    },
  });
  return (
    <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose} motionPreset='slideInBottom' size={'md'}>
      <ModalOverlay />
      <ModalContent >
        <ModalHeader size='3xl'>Agregar Carro</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl isRequired>
            <FormLabel>Marca</FormLabel>
            <Input ref={initialRef} placeholder='Marca' name="brand" onChange={(e) => onChange(e)} value={brand}/>
          </FormControl>
          <FormControl isRequired mt={4}>
            <FormLabel>Modelo</FormLabel>
            <Input placeholder='Modelo' name="model" onChange={(e) => onChange(e)} value={model}/>
          </FormControl>
          <FormControl isRequired mt={4}>
            <FormLabel>Placa</FormLabel>
            <Input placeholder='Placa del auto' name="licenceplate" onChange={(e) => onChange(e)} value={licenceplate}/>
          </FormControl>
          <FormControl isRequired mt={4}>
            <FormLabel>Color</FormLabel>
            <Box style={ styles.swatch } onClick={ handleOpenPicker }>
              <Box style={ styles.color } />
            </Box>
            { picker.displayColorPicker ? 
              <Box style={ styles.popover }>
                <Box style={ styles.cover } onClick={ handleClosePicker }/>
                <SketchPicker color={ color } onChange={ handleChangeComplete } />
              </Box> : null }
          </FormControl>
        </ModalBody>  
        <ModalFooter>
          <Button mr={3} onClick={onClose}>
            Cerrar
          </Button>
          <Button colorScheme='blue' onClick={(e) => saveCar(e)}>Guardar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
