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
import { connect } from 'react-redux';
import { CustomerTable } from './Table';
export const CustomerScreen: React.FC = () => {
  return (
    <Container maxW='container.xl' padding="10">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box p='2'>
          <Text fontSize="2xl"
                fontWeight="bold"
                lineHeight="short">
            Clientes
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

export default connect()(CustomerScreen);