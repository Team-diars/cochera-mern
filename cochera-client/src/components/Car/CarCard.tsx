import { Button, IconButton } from '@chakra-ui/button'
import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { useClipboard } from '@chakra-ui/hooks'
import { Image } from '@chakra-ui/image'
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/input'
import { Badge, Box, Divider, Spacer, Text } from '@chakra-ui/layout'
import { Skeleton } from '@chakra-ui/skeleton'
import { Spinner } from '@chakra-ui/spinner'
import { Tag } from '@chakra-ui/tag'
import { Tooltip } from '@chakra-ui/tooltip'
import React, { useEffect, useState } from 'react'
import { AiFillDelete } from 'react-icons/ai'
import { FiDelete, FiEdit, FiImage } from 'react-icons/fi'
import { GiCancel } from 'react-icons/gi'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router'
import { useSelectedContext } from '../../context/PopupContext'
import { deleteCar, getSingleCar } from '../../state/action-creators/car'
import { Car } from '../../state/actions/car'

interface CarProps {
  customerid: string | undefined
}

export const CarCard: React.FC<Car & CarProps> = ({_id,image, color, brand, model, licenceplate, customerid}) => {
  const {contextActions: {setIsOpenEditCar, setIdCarSelected}, contextState: {isOpenEditCar, idCarSelected}} = useSelectedContext();
  const dispatch = useDispatch();
  const updateCar = (id: string | null = null): void => {
    setIdCarSelected(id);
    setIsOpenEditCar(true);
  }
  const removeCar = (id: string | null = null): void => {
    if (!id) return;
    dispatch(deleteCar(id));
  }
  useEffect(() => {
    if(idCarSelected){
      const retrieveSingleCar = (id: string) => (customerid) && dispatch(getSingleCar(id,customerid));
      retrieveSingleCar(idCarSelected);
    }
  },[idCarSelected])
  console.log("image: ",image);
  return (    
      <FormControl borderWidth="1px" p={5} borderRadius="md" background="tail" boxShadow='md' bg="white">
        <Spacer/>
          {
            (image && image.length > 0) ? (
              <Box
                mt="1"
                mb={2}
                textAlign="center"
                style={{ background: "#eee" }}
              >
                <Image
                  maxW="160px"
                  margin="0 auto"
                  src={`/images/${image}`}
                  alt="Imagen"
                />
              </Box>
            ) : ( <Skeleton height="200" mb={2}/> )
          }
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Text fontSize='lg' fontWeight="bold">Marca</Text>
          <Text fontSize='lg'>{brand}</Text>
        </Box>
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Text fontSize='lg' fontWeight="bold">Modelo</Text>
          <Text fontSize='lg'>{model}</Text>
        </Box>
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Text fontSize='lg' fontWeight="bold">Placa</Text>
          <Text fontSize='lg'>{licenceplate}</Text>
        </Box>
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Text fontSize='lg' fontWeight="bold">Color</Text>
          <Tooltip label={color} 
                   bg='gray.300' 
                   color='black'
                   fontSize="md"
                   placement='left' 
                   closeOnClick={false} hasArrow>
            <Tag w="30px" size="md" variant='solid' bgColor={color} borderWidth={(color === "#fff") ? "1px" : "0px"}> 
            </Tag>
          </Tooltip>
        </Box>
        <Divider orientation='horizontal' my={3}/>
        <Box w="100%" display="flex" justifyContent="space-between">
          <Button colorScheme="gray" leftIcon={<FiEdit />} mr={2} w="48%" onClick={() => updateCar(_id)}>
            Editar
          </Button>
          <Button colorScheme="red" leftIcon={<AiFillDelete />} w="48%" onClick={() => removeCar(_id)}>
            Eliminar
          </Button>
        </Box>
      </FormControl>
  )
}
