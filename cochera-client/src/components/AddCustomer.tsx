import { Button } from '@chakra-ui/button'
import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { useDisclosure } from '@chakra-ui/hooks'
import { Input } from '@chakra-ui/input'
import { Box, Text } from '@chakra-ui/layout'
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/modal'
import { OmitCommonProps } from '@chakra-ui/system'
import React, {LegacyRef, RefObject} from 'react'
interface IProps {
  initialRef: LegacyRef<HTMLInputElement>,
  finalRef: React.RefObject<HTMLHeadingElement>,
  isOpen: boolean,
  onClose: () => void,
}
export const AddCustomer: React.FC<IProps> = ({initialRef, finalRef, isOpen, onClose}) => {
  return (
    <>
      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Agregar Cliente</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Nombre Completo</FormLabel>
              <Input ref={initialRef} placeholder='Nombre Completo' />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Telefono</FormLabel>
              <Input placeholder='Telefono' />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Direccion</FormLabel>
              <Input placeholder='Direccion' />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Autos</FormLabel>
              <Input placeholder='Autos' />
            </FormControl>

          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Cerrar
            </Button>
            <Button variant='ghost'>Guardar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
