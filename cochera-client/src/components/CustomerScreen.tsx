import { Button } from '@chakra-ui/button'
import { useDisclosure } from '@chakra-ui/hooks';
import Icon from '@chakra-ui/icon';
import { Box, Container, Heading, Text } from '@chakra-ui/layout';
import React, { useEffect, useRef, useState } from 'react'
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
import { connect, useSelector } from 'react-redux';
import { AddCustomer } from './AddCustomer';
import { CustomerTable } from './Table';
export const CustomerScreen: React.FC = () => {
  // const [isOpen, setIsOpen] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = useRef<HTMLInputElement>(null)
  const finalRef = useRef<HTMLHeadingElement>(null)

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
        <Button colorScheme="blue" onClick={onOpen}>
          <Icon as={FiPlus} h={[4, 6]} w={[4, 6]} alignSelf={"center"} />
          Create Customer 
        </Button>
      </Box>
      <CustomerTable/>
      {
        (isOpen) && <AddCustomer initialRef={initialRef} finalRef={finalRef} isOpen={isOpen} onClose={onClose}/>
      }
    </Container>
  )
}

export default connect()(CustomerScreen);