import { Box, Flex, Image, Tag, Text, Tooltip } from '@chakra-ui/react';
import React, { Dispatch } from 'react';
import { GarageCar } from '../../state/actions/garage';

interface ICar {
  image: Array<string>,
  brand: string,
  licenceplate: string,
  color: string,
  model: string,
  type: string,
  customer: string,
  formData: GarageCar,
  setFormData: Dispatch<React.SetStateAction<GarageCar>>
}

export const CarItem: React.FC<ICar> = ({image, brand, licenceplate, color, model, type, customer, formData, setFormData}) => {
  return <Flex borderRadius={6} 
               background={'#fff'} 
               borderWidth={1} 
               borderColor={'#ccc'} 
               mb={3} 
               cursor={"pointer"} 
               _hover={{
                  filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
                  transition:"0.3s",
                  transformOrigin: "bottom"
               }}
               onClick={() => {
                  const {car, ...rest} = formData;
                  setFormData({
                  car: licenceplate,
                  ...rest
                  })
               }}>
    <Image src={`/images/${image[0]}`} width={"30%"} height={"100px"} p={"0.5rem"}/>
    <Box display={'flex'} flexDirection={'column'} justifyContent={'space-between'} p={"1rem"} minW={"30%"}>
      <Flex>
        <Text fontWeight={'bold'} minW="100px">Marca: </Text>
        <Text>{brand}</Text>
      </Flex>
      <Flex>
        <Text fontWeight={'bold'} minW="100px">Placa: </Text>
        <Text>{licenceplate}</Text>
      </Flex>
      <Flex>
        <Text fontWeight={'bold'} minW="100px">Color: </Text>
        <Tooltip label={color} 
                   bg='gray.300' 
                   color='black'
                   fontSize="md"
                   placement='left' 
                   closeOnClick={false} hasArrow>
            <Tag w="30px" size="md" variant='solid' bgColor={color} borderWidth={(color === "#fff") ? "1px" : "0px"}> 
            </Tag>
        </Tooltip>
      </Flex>
    </Box>
    <Box display={'flex'} flexDirection={'column'} justifyContent={'space-between'} p={"1rem"} width={"100%"}>
      <Flex>
        <Text fontWeight={'bold'} minW="100px">Modelo: </Text>
        <Text>{model}</Text>
      </Flex>
      <Flex>
        <Text fontWeight={'bold'} minW="100px">Tipo: </Text>
        <Text>{type}</Text>
      </Flex>
      <Flex>
        <Text fontWeight={'bold'} minW="100px">Cliente: </Text>
        <Text>{(customer.length > 14) ? customer.substring(0,11)+"..." : customer}</Text>
      </Flex>
    </Box>
  </Flex>;
};
