import { Button } from '@chakra-ui/button'
import Icon from '@chakra-ui/icon';
import { Box, Container, Heading, Text } from '@chakra-ui/layout';
import React from 'react'
import {
  FiCheck,
  FiEdit,
  FiFile,
  FiMoreVertical,
  FiPlus,
  FiTrash2,
  FiX,
  FiXCircle,
} from "react-icons/fi";
import { CustomerTable } from './Table';
export const CustomerScreen = () => {
  return (
    <Container maxW='container.xl' padding="10">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box p='2'>
          <Text fontSize="2xl"
                fontWeight="bold"
                lineHeight="short">
            Garage Customers
          </Text>
        </Box>
        <Button colorScheme="blue">
          <Icon as={FiPlus} h={[4, 6]} w={[4, 6]} alignSelf={"center"} />
          Create Customer 
        </Button>
      </Box>
      <CustomerTable/>
    </Container>
  )
}
export default CustomerScreen;