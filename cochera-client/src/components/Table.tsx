import React, { useEffect, useState } from 'react'
import { Table, TableCaption, Tbody, Td, Tfoot, Th, Thead, Tr } from '@chakra-ui/table';
import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/menu';
import { FiEdit, FiEye, FiMoreVertical, FiXCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Button, IconButton } from '@chakra-ui/button';
import { Portal, forwardRef, Icon, Popover, PopoverCloseButton, PopoverHeader, PopoverTrigger, Badge, Text, Box, PopoverContent, PopoverArrow, PopoverBody } from '@chakra-ui/react';
import { CustomerState } from '../state/actions/customer';
import { getCustomers } from '../state/action-creators';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../state';

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
  useEffect(() => {
    const retrieveCustomers = () => dispatch(getCustomers());
    retrieveCustomers();
  },[dispatch])
  
  return (
    <Table size='md' mt="10">
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
                        icon={<FiEdit />} >
                        Editar
                      </MenuItem>
                      <MenuItem
                        icon={<FiXCircle />} >
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
