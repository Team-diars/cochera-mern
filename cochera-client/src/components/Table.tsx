import React, { useContext, useEffect, useRef, useState } from 'react'
import { Table, TableCaption, Tbody, Td, Tfoot, Th, Thead, Tr } from '@chakra-ui/table';
import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/menu';
import { FiEdit, FiEye, FiMoreVertical, FiXCircle } from 'react-icons/fi';
import { Button, IconButton } from '@chakra-ui/button';
import { Portal, forwardRef, Icon, Popover, PopoverCloseButton, PopoverHeader, PopoverTrigger, Badge, Text, Box, PopoverContent, PopoverArrow, PopoverBody, useDisclosure } from '@chakra-ui/react';
import { CustomerState, Payload } from '../state/actions/customer';
import { deleteCustomer, getCustomers, getSingleCustomer, updateCustomer } from '../state/action-creators';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../state';
import { useSelectedContext } from '../context/PopupContext';

export const ActionsButton = forwardRef(({ label, ...rest }, ref) => {
  return (
    <IconButton
      ref={ref}
      d="inline-flex"
      borderRadius="full"
      variant="ghost"
      color="inherit"
      colorScheme="gray"
      bg="transparent"
      opacity="0.5"
      _hover={{ opacity: 1, bg: "rgba(0, 0, 0, 0.05)" }}
      _focus={{ opacity: 1, boxShadow: "outline" }}
      _active={{ bg: "rgba(0, 0, 0, 0.1)" }}
      icon={<FiMoreVertical />}
      aria-label=""
      {...rest}
    />
  );
});

export const CustomerTable = () => {
  const data: CustomerState = useSelector((state: RootState) => state.customers);
  const dispatch = useDispatch();
  const {contextActions: {setIsOpen, setIdSelected}, contextState: {isOpen: isEditPopupOpen, idSelected}} = useSelectedContext();

  useEffect(() => {
    const retrieveCustomers = () => dispatch(getCustomers());
    retrieveCustomers();
  },[dispatch])
  const removeCustomer = (id: string | null = null): void => {
    if (!id) return;
    dispatch(deleteCustomer(id));
  }
  const updateCustomer = (id: string): void => {
    setIdSelected(id);
    setIsOpen(true);
  }
  useEffect(() => {
    if(idSelected){
      const retrieveSingleCustomer = (id: string) => dispatch(getSingleCustomer(id));
      retrieveSingleCustomer(idSelected);
    }
  },[idSelected])
  console.log("idSelected: ",idSelected);
  return (
    <Table size='sm' mt="10" variant='simple' colorScheme='gray' border='1px' borderColor='gray.200'>
        <Thead>
          <Tr>
            <Th>Nombre</Th>
            <Th>Telefono</Th>
            <Th>Direccion</Th>
            <Th>Registrado</Th>
            <Th>Autos</Th>
            <Th>Acciones</Th>
          </Tr>
        </Thead>
        <Tbody>
          {
           (!data.loading) && data.customers.map((customer) => (
            <Tr key={customer.id}>
              <Td>{customer.fullname}</Td>
              <Td>{customer.cellphone}</Td>
              <Td>{customer.address}</Td>
              <Td>Wednesday, 12 October</Td>
              <Td>
                <Popover>
                  <PopoverTrigger>
                    <Button size="sm">
                      <Icon
                        as={FiEye}
                        h={[4]}
                        w={[4]}
                        aria-label="See Cars"
                      />
                    </Button>
                  </PopoverTrigger>
                  <Portal>
                    <PopoverContent>
                      <PopoverArrow />
                      <PopoverHeader fontWeight="semibold">
                        Autos
                      </PopoverHeader>
                      <PopoverCloseButton />
                        <PopoverBody>
                          <Box
                            display="flex"
                            flexDirection="row"
                            alignItems="center"
                          >
                            <Badge
                              rounded="full"
                              px="2"
                            >
                              DAR-231
                            </Badge>
                            <Text
                              fontSize={["sm", "md"]}
                              fontWeight="medium"
                              ml="2"
                            >
                              KIA
                            </Text>
                          </Box>
                        </PopoverBody>
                    </PopoverContent>
                  </Portal>
                </Popover>
              </Td>
              <Td>
                <Menu isLazy placement="left-start">
                  <MenuButton as={ActionsButton}>
                  </MenuButton>
                  <Portal>
                    <MenuList>
                      <MenuItem
                        icon={<FiEdit />} 
                        onClick={() => updateCustomer(customer.id)}> 
                        Editar
                      </MenuItem>
                      <MenuItem
                        icon={<FiXCircle />} 
                        onClick={() => removeCustomer(customer.id)}>
                        Eliminar
                      </MenuItem>
                    </MenuList>
                  </Portal>
                </Menu>
              </Td>
            </Tr>
           )) 
          }
        </Tbody>
      </Table>
  )
}
