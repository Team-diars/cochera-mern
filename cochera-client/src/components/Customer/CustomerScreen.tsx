import { Button } from '@chakra-ui/button'
import { useDisclosure, UseDisclosureProps } from '@chakra-ui/hooks';
import Icon from '@chakra-ui/icon';
import { Box, Container, Heading, Text } from '@chakra-ui/layout';
import React, { useEffect, useRef, useState } from 'react'

import { FiPlus } from "react-icons/fi";
import { useSelectedContext } from '../../context/PopupContext';
import { AddCustomer } from './AddCustomer';
import { EditCustomer } from './EditCustomer';
import { CustomerTable } from './Table';
export const CustomerScreen: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = useRef<HTMLInputElement>(null)
  const finalRef = useRef<HTMLHeadingElement>(null)

  const { isOpen:isOpenEdit, onOpen: onOpenEdit, onClose: onCloseEdit } = useDisclosure()
  const initialRefEdit = useRef<HTMLInputElement>(null)
  const finalRefEdit = useRef<HTMLHeadingElement>(null)

  const {contextActions: {setIsOpen}, contextState: {isOpen: isEditPopupOpen}} = useSelectedContext();
  return (
    <Container maxW='container.xl' padding="10">
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={5}>
        <Box >
          <Text fontSize="3xl"
                fontWeight="bold"
                lineHeight="short"
                >
            Clientes
          </Text>
        </Box>
        <Button colorScheme="blue" onClick={onOpen} leftIcon={<Icon as={FiPlus} h={[4, 6]} w={[4, 6]} alignSelf={"center"} />}>
          Nuevo Cliente 
        </Button>
      </Box>
      <CustomerTable/>
      {
        (isOpen) && <AddCustomer initialRef={initialRef} finalRef={finalRef} isOpen={isOpen} onClose={onClose}/>
      }
      {
        (isEditPopupOpen) && <EditCustomer initialRef={initialRefEdit} finalRef={finalRefEdit} isOpen={true} onClose={onCloseEdit}/>
      }
    </Container>
  )
}

export default CustomerScreen;