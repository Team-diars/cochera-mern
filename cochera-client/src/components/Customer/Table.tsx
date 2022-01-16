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
import { default as dayjs } from 'dayjs';
import { DateFormat } from '../../utils/Date';
import MaterialTable, { Icons } from 'material-table'


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
    <>
      <MaterialTable 
          options={{
            search: false,
            selection: false,
            showTitle: false,
            toolbar: false,
            paging: true,
            headerStyle:{
              fontFamily: 'inherit',
              fontSize:14,
              paddingTop:5,
              paddingBottom:5,
              textAlign:"left",
              fontWeight:"bold"
            },
            rowStyle: {
              fontFamily: 'inherit',
              textAlign:"left",
              padding:0,
            },
          }}
          
          localization={{
            pagination: {
              labelRowsSelect: 'filas',
              labelDisplayedRows: '{count} de {from}-{to}',
              firstTooltip: 'Primera Pagina',
              previousTooltip: 'Pagina Anterior',
              nextTooltip: 'Siguiente Pagina',
              lastTooltip: 'Ultima Pagina'
            },
            toolbar: {
                nRowsSelected: '{0} filas seleccionadas',
                searchPlaceholder: "Buscar"
            },
            header: {
                actions: 'Acciones'
            },
            body: {
                emptyDataSourceMessage: 'No hay clientes',
                filterRow: {
                    filterTooltip: 'Filtrar'
                }
            }
          }}
          columns={[
          { title: 'Nombre', field: 'fullname', headerStyle: {
            backgroundColor: '#edf2f7',
            color: '#4d7ca1',
            height: 10,
          }, cellStyle:{
            textAlign:"left",
            padding: "8px 12px"
          }},
          { title: 'Telefono', field: 'cellphone', type: 'numeric', headerStyle: {
            backgroundColor: '#edf2f7',
            color: '#4d7ca1',
            height: 10
          }, cellStyle:{
            textAlign:"left",
            padding: "8px 12px"
          } },
          { title: 'Direccion', field: 'address', headerStyle: {
            backgroundColor: '#edf2f7',
            color: '#4d7ca1',
            height: 10
          }, cellStyle:{
            textAlign:"left",
            padding: "8px 12px"
          } },
          { title: 'Registrado', field: 'date', render: (rowData: Payload) => {
            return <DateFormat position="relative" date={rowData.date}/>
          } , headerStyle: {
            backgroundColor: '#edf2f7',
            color: '#4d7ca1',
            height: 10
          }, cellStyle:{
            textAlign:"left",
            padding: "8px 12px"
          }},
          { title: 'Carros', field: 'cars', render: () => {
            return <Tooltip label='Ver Carros' bg='gray.300' color='black'>
              <Button size="sm" colorScheme="gray">
                <Icon
                  as={AiFillCar}
                  h={[4]}
                  w={[4]}
                />
              </Button>
            </Tooltip>
          }, headerStyle: {
            backgroundColor: '#edf2f7',
            color: '#4d7ca1',
            height: 10
          }, cellStyle:{
            textAlign:"left",
            padding: "8px 12px"
          } },
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
          }, headerStyle: {
            backgroundColor: '#edf2f7',
            color: '#4d7ca1',
            height: 10
          }, cellStyle:{
            textAlign:"left",
            padding: "8px 12px"
          } },
          ]}
          data={data.customers}
          />
          
    {/* <Table size='sm' mt="10" variant='simple' colorScheme='gray' border='1px' borderColor='gray.200'>
        <Thead>
          <Tr>
            <Th>Nombre</Th>
            <Th>Telefono</Th>
            <Th>Direccion</Th>
            <Th>Registrado</Th>
            <Th>Carros</Th>
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
              <Td>
                <DateFormat position="relative" date={customer.date}/>
              </Td>
              <Td>
              <Tooltip label='Ver Carros' bg='gray.300' color='black'>
                  <Button size="sm" colorScheme="gray">
                    <Icon
                      as={AiFillCar}
                      h={[4]}
                      w={[4]}
                    />
                  </Button>
              </Tooltip>
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
      </Table> */}
    </>
  )
}
