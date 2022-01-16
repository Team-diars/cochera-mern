import { Button } from '@chakra-ui/button';
import { useDisclosure } from '@chakra-ui/hooks';
import Icon from '@chakra-ui/icon';
import { Box, Container, Grid, Text } from '@chakra-ui/layout';
import React from 'react'
import { useNavigate } from "react-router-dom";
import { FiPlus } from 'react-icons/fi';
import { MdArrowBack } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { RootState } from '../../state';
import { CustomerState } from '../../state/actions/customer';
import { CarCard } from './CarCard';

export const CardsScreen: React.FC = () => {
  const {customerid} = useParams();
  const navigate = useNavigate();
  const data: CustomerState = useSelector((state: RootState) => state.customers);
  const { isOpen, onOpen, onClose } = useDisclosure()
  const customer = data.customers.find(customer => customer.id === customerid);
  return (
    <Container maxW='container.xl' padding="10">
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={10}>
        <Box>
          <Text fontSize="3xl"
                fontWeight="bold"
                lineHeight="short"
                >
            Autos de {(customer) && customer.fullname}
          </Text>
        </Box>
        <Box>
          <Button colorScheme="gray" onClick={() => navigate(-1)} mr={3} leftIcon={<Icon as={MdArrowBack} h={[4, 6]} w={[4, 6]} alignSelf={"center"} />}>
            Volver
          </Button>
          <Button colorScheme="blue" onClick={onOpen} leftIcon={<Icon as={FiPlus} h={[4, 6]} w={[4, 6]} alignSelf={"center"} />}>
            Nuevo Carro 
          </Button>
        </Box>
      </Box>
      <Grid templateColumns='repeat(3, 1fr)' gap={6}>
        <CarCard image={""}/>
        <CarCard image={""}/>
        <CarCard image={""}/>
      </Grid>
    </Container>
  )
}
