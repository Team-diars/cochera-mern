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

interface CardProps {
  image: string,
  color: string
}

export const CarCard: React.FC<CardProps> = ({image, color}) => {
  const [value, setValue] = useState<string>('')
  return (    
      <FormControl borderWidth="1px" p={5} borderRadius="md" background="tail" boxShadow='md' bg="white">
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          {/* <FormLabel mb="0" fontWeight="bold">Toyota</FormLabel> */}
          <Spacer/>
          <Badge variant='solid' colorScheme='gray'>Auto</Badge>
        </Box>
          {
            (image) ? (
              <Box
                mt="1"
                mb={2}
                textAlign="center"
                style={{ background: "#eee" }}
              >
                <Image
                  boxSize="100%"
                  src={`/images/${image}`}
                  alt="Imagen"
                />
              </Box>
            ) : ( <Skeleton height="200" mb={2}/> )
          }
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Text fontSize='lg' fontWeight="bold">Marca</Text>
          <Text fontSize='lg'>Toyota</Text>
        </Box>
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Text fontSize='lg' fontWeight="bold">Modelo</Text>
          <Text fontSize='lg'>Hius</Text>
        </Box>
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Text fontSize='lg' fontWeight="bold">Placa</Text>
          <Text fontSize='lg'>ABC-123</Text>
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
