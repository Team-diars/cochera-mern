import { Button } from '@chakra-ui/button'
import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/form-control'
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/input'
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/modal'
import React, { LegacyRef, useRef, useState } from 'react'
import { Car, CarState } from '../../state/actions/car'
import { ChromePicker, SketchPicker } from 'react-color';
import reactCSS from 'reactcss'
import { Box, Text } from '@chakra-ui/layout'
import axios, { AxiosError } from 'axios'
import { FiImage } from 'react-icons/fi'
import { Image } from '@chakra-ui/image'
import { Spinner } from '@chakra-ui/spinner'
import { useParams } from 'react-router'
import { RootState } from '../../state'
import { useDispatch, useSelector } from 'react-redux'
import { addCar } from '../../state/action-creators/car'
var { EditableInput } = require('react-color/lib/components/common');

interface CarProps {
  initialRef: LegacyRef<HTMLInputElement>,
  finalRef: React.RefObject<HTMLHeadingElement>,
  isOpen: boolean,
  onClose: () => void,
}

export const AddCar: React.FC<CarProps> = ({initialRef, finalRef, isOpen, onClose}) => {
  const {customerid} = useParams<string>();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<Car>({
    image:"",
    brand: "",
    model:"",
    licenceplate:"",
    color: "#000"
  })
  const imageRef = useRef<any>(null);
  const [uploading, setUploading] = useState(false);
  // const [image, setImage] = useState("");
  const {image, brand, color, licenceplate, model} = formData;
  const [picker, setPicker] = useState({
    displayColorPicker: false,
  })
  const saveCar = (e: any) => {
    e.preventDefault();
    const {_id, ...rest} = formData;
    if(customerid) {
      dispatch(addCar({
        ...rest
      }))
      onClose();
    }
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
        width: '100%',
        height: '40px',
        borderRadius: '2px',
        background: `${color}`,
      },
      swatch: {
        padding: '5px',
        background: '#fff',
        boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
        display: 'inline-block',
        cursor: 'pointer',
        border: "1px solid #ccc",
        borderRadius: '5px',
        width:"100%"
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
  const uploadFileHandler = async (e: any) => {
    // console.log("Imagen:", e.currentTarget.files[0]);
    e.preventDefault();
    const file = e.target.files[0];
    if (file) {
      const form = new FormData();
      form.append("image", file);
      setUploading(true);
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      try {
        const { data } = await axios.post("http://localhost:8000/api/upload",form,config);
        console.log(data);
        const {image:CarImage, ...rest} = formData;
        setFormData({
          image: data,
          ...rest
        })
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
  return (
    <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose} motionPreset='slideInBottom' size={'md'}>
      <ModalOverlay />
      <ModalContent maxW="56rem">
        <ModalHeader size='3xl'>Agregar Carro</ModalHeader>
        <ModalCloseButton />
        <ModalBody display="flex" justifyContent="space-between">
          <Box w="50%" mr={3}>
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
            <FormControl mt={4}>
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
          </Box>
          <Box w="50%">
            <FormControl>
              <FormLabel>Imagen</FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<FiImage />}
                />
                <Input
                  type="file"
                  accept="image/*"
                  // name="image"
                  ref={imageRef}
                  // {...register("image")}
                  // {...register("image", {
                    //   onChange: (e) => uploadFileHandler,
                    // })}
                    onChange={uploadFileHandler}
                    style={{ display: "none" }}
                    multiple
                ></Input>
                <Input
                  onClick={() => imageRef.current.click()}
                  value={image}
                  isReadOnly
                />
              </InputGroup>
              <Box
                mt="1"
                py="1"
                px="2"
                textAlign="center"
                style={{ background: "#eee" }}
                minH="260px"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Text
                  fontWeight="semibold"
                  style={{ display: (uploading || image) && "none" }}
                >
                  No hay imagen previa
                </Text>
                {!uploading ? (
                  image && 
                    <Image
                      marginX="auto"
                      src={`/images/${image}`}
                      alt="Imagen"
                      h={260}
                    />
                ) : (
                  <Spinner label="cargando" speed="0.65s" size="md" />
                )}
              </Box>
            </FormControl>
          </Box>
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
