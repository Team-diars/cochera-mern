import { Button, IconButton } from '@chakra-ui/button'
import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { Image } from '@chakra-ui/image'
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/input'
import { Box, Text } from '@chakra-ui/layout'
import { Skeleton } from '@chakra-ui/skeleton'
import { Spinner } from '@chakra-ui/spinner'
import { Tooltip } from '@chakra-ui/tooltip'
import React from 'react'
import { AiFillDelete } from 'react-icons/ai'
import { FiDelete, FiEdit, FiImage } from 'react-icons/fi'
import { GiCancel } from 'react-icons/gi'

interface CardProps {
  image: string,
}

export const CarCard: React.FC<CardProps> = ({image}) => {
  return (    
      <FormControl borderWidth="1px" p={5} borderRadius="md" background="tail" boxShadow='md' bg="white">
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <FormLabel mb="0" fontWeight="bold">Toyota</FormLabel>
        </Box>
          {
            (image) ? (
              <Box
                mt="1"
                py="5"
                px="5"
                mb={2}
                textAlign="center"
                style={{ background: "#eee" }}
              >
                <Image
                  boxSize="100px"
                  src={`/images/${image}`}
                  alt="Imagen"
                />
              </Box>
            ) : ( <Skeleton height="100" mb={2}/> )
          }
        <Input placeholder='Marca' name="brand" mb={2}/>
        <Input placeholder='Modelo' name="model" mb={2}/>
        <Input placeholder='Placa' name="licenceplate" mb={2}/>
        <Input placeholder='Color' name="color" mb={2}/>
        <Box w="100%" display="flex" justifyContent="space-between">
          <Button colorScheme="gray" leftIcon={<FiEdit />} mr={2} w="48%">
            Editar
          </Button>
          <Button colorScheme="red" leftIcon={<AiFillDelete />} w="48%">
            Eliminar
          </Button>
        </Box>
      </FormControl>
  )
}
