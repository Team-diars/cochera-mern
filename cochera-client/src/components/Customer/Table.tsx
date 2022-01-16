import React, { useContext, useEffect, useRef, useState } from 'react'
import { Table, TableCaption, Tbody, Td, Tfoot, Th, Thead, Tr } from '@chakra-ui/table';
import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/menu';
import { FiEdit, FiEye, FiMoreVertical, FiXCircle } from 'react-icons/fi';
import { AiFillCar } from 'react-icons/ai';
import { Button, IconButton } from '@chakra-ui/button';
import { Portal, forwardRef, Icon, Popover, PopoverCloseButton, PopoverHeader, PopoverTrigger, Badge, Text, Box, PopoverContent, PopoverArrow, PopoverBody, useDisclosure, Tooltip, Tag } from '@chakra-ui/react';
import { CustomerState, Payload } from '../../state/actions/customer';
import { deleteCustomer, getCustomers, getSingleCustomer, updateCustomer } from '../../state/action-creators';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../state';
import { useSelectedContext } from '../../context/PopupContext';
import { DateFormat } from '../../utils/Date';
import MaterialTable from '@material-table/core'
import { localizationTable, optionsTable, headerStyle, cellStyle } from '../../utils/Table';
import { Link } from 'react-router-dom';


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

export const CustomerTable: React.FC = () => {
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
    <MaterialTable 
        options={optionsTable}
        localization={localizationTable}
        columns={[
        { title: 'Nombre', field: 'fullname', headerStyle, cellStyle},
        { title: 'Telefono', field: 'cellphone', type: 'numeric', headerStyle, cellStyle},
        { title: 'Direccion', field: 'address', headerStyle, cellStyle},
        { title: 'Registrado', field: 'date', render: (rowData: Payload) => {
          return <DateFormat position="relative" date={rowData.date}/>
        }, headerStyle, cellStyle},
        { title: 'Carros', field: 'cars', render: (rowData: Payload) => {
          return <Tooltip label='Ver Carros' bg='gray.300' color='black' hasArrow>
            <Link to={`/cars/${rowData.id}`}>
              <Button size="sm" colorScheme="gray">
                <Icon
                  as={AiFillCar}
                  h={[4]}
                  w={[4]}
                />
              </Button>
            </Link>
          </Tooltip>
        }, headerStyle, cellStyle },
        { title: 'Acciones', field: 'actions', render: (rowData: Payload) => {
            return <Menu isLazy placement="left-start">
              <MenuButton as={ActionsButton}>
              </MenuButton>
              <Portal>
                <MenuList>
                  <MenuItem
                    icon={<FiEdit />} 
                    onClick={() => updateCustomer(rowData.id)}> 
                    Editar
                  </MenuItem>
                  <MenuItem
                    icon={<FiXCircle />} 
                    onClick={() => removeCustomer(rowData.id)}>
                    Eliminar
                  </MenuItem>
                </MenuList>
              </Portal>
            </Menu>
        }, headerStyle, cellStyle},
        ]}
        data={data.customers}
    />    
  )
}
