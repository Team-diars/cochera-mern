import { IconButton } from '@chakra-ui/button'
import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { Image } from '@chakra-ui/image'
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/input'
import { Box, Text } from '@chakra-ui/layout'
import { Spinner } from '@chakra-ui/spinner'
import { Tooltip } from '@chakra-ui/tooltip'
import React from 'react'
import { FiImage } from 'react-icons/fi'
import { GiCancel } from 'react-icons/gi'

interface CardProps {
  uploading: boolean,
  image: string,
  imageRef: React.RefObject<HTMLHeadingElement> | any,
  uploadFileHandler: (e: any) => Promise<void>,
}

export const CarCard: React.FC<CardProps> = ({uploading, image, imageRef, uploadFileHandler}) => {
  return (
    <>
      <FormControl borderWidth="1px" p={5} borderRadius="md" background="tail" boxShadow='base'>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <FormLabel mb="0" fontWeight="bold">Carro 01</FormLabel>
          <Tooltip
            label="Remover Carro"
            placement={"left"}
            color={"gray.200"}
          >
            <IconButton
              colorScheme='gray'
              aria-label='Add Car'
              size="sm"
              icon={<GiCancel />}
            />
          </Tooltip>
        </Box>
        <Box
            mt="1"
            py="5"
            px="5"
            mb={2}
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
                  boxSize="100px"
                  src={`/images/${image}`}
                  alt="Imagen"
                />
              )
            ) : (
              <Spinner label="cargando" speed="0.65s" size="md" />
            )}
          </Box>
        <InputGroup mb={2}>
          <InputLeftElement
            pointerEvents="none"
            children={<FiImage />}
          />
          <Input
            type="file"
            accept="image/*"
            ref={imageRef}
            onChange={uploadFileHandler}
            style={{ display: "none" }}
          ></Input>
          <Input
            onClick={() => imageRef.current.click()}
            value={image}
            isReadOnly
          />
        </InputGroup>
        <Input placeholder='Marca' name="brand" mb={2}/>
        <Input placeholder='Modelo' name="model" mb={2}/>
        <Input placeholder='Placa' name="licenceplate" mb={2}/>
        <Input placeholder='Color' name="color" mb={2}/>
      </FormControl>
    </>
  )
}
