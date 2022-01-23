import { Button } from '@chakra-ui/button';
import { useDisclosure } from '@chakra-ui/hooks';
import Icon from '@chakra-ui/icon';
import { Box, Container, Grid, Text } from '@chakra-ui/layout';
import React, { useRef } from 'react'
import { useNavigate } from "react-router-dom";
import { FiPlus } from 'react-icons/fi';
import { MdArrowBack } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { RootState } from '../../state';
import { CustomerState, Payload } from '../../state/actions/customer';
import { CarCard } from './CarCard';
import { AddCar } from './AddCar';
import { useEffect } from 'react';
import { Car, CarState } from '../../state/actions/car';
import { getCars } from '../../state/action-creators/car';
import { getSingleCustomer } from '../../state/action-creators';
import { useSelectedContext } from '../../context/PopupContext';
import { EditCar } from './EditCar';

export const CardsScreen: React.FC = () => {
  const {customerid} = useParams();
  const navigate = useNavigate();
  const data_cars: CarState = useSelector((state: RootState) => state.cars);
  const data_customer: CustomerState = useSelector((state: RootState) => state.customers);
  const dispatch = useDispatch();
  const initialRef = useRef<HTMLInputElement>(null)
  const finalRef = useRef<HTMLHeadingElement>(null)
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {contextActions: {setIsOpenEditCar, setIdCarSelected}, contextState: {isOpenEditCar, idCarSelected}} = useSelectedContext();
  
  useEffect(() => {
    if(customerid){
      const retrieveSingleCustomer = (id: string) => dispatch(getSingleCustomer(id));
      retrieveSingleCustomer(customerid);
    }
  },[customerid])
  useEffect(() => {
    const retrieveCars = () => customerid && dispatch(getCars(customerid));
    retrieveCars();
  },[dispatch])
  return (
    <Container maxW='container.xl' padding="10">
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={10}>
        <Box>
          <Text fontSize="3xl"
                fontWeight="bold"
                lineHeight="short"
                >
            Autos de {(data_customer.customer) && data_customer.customer.fullname}
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
        {
          (data_cars.cars) && data_cars.cars.map((car: Car) => (
            <CarCard key={car._id} customerid={customerid} {...car}/>    
          ))
        }
      </Grid>
      {
        (isOpen) && <AddCar initialRef={initialRef} finalRef={finalRef} isOpen={isOpen} onClose={onClose}/>
      }
      {
        (isOpenEditCar) && <EditCar initialRef={initialRef} finalRef={finalRef} isOpen={true} onClose={onClose}/>
      }
    </Container>
  )
}
