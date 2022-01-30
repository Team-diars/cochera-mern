import { Button } from '@chakra-ui/button'
import { useDisclosure } from '@chakra-ui/hooks'
import Icon from '@chakra-ui/icon'
import { Box, Container, Text } from '@chakra-ui/layout'
import React, { useRef } from 'react'
import { FiPlus, FiUserPlus } from 'react-icons/fi'
import {GarageTable} from './Table'

export const GarageScreen = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = useRef<HTMLInputElement>(null)
  const finalRef = useRef<HTMLHeadingElement>(null)
  return (
    <Container maxW='container.xl' padding="10">
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={5}>
        <Box >
          <Text fontSize="3xl"
                fontWeight="bold"
                lineHeight="short"
                >
            Cochera - Autos Activos
          </Text>
        </Box>
        <Button colorScheme="blue" onClick={onOpen} leftIcon={<Icon as={FiPlus} h={[4, 6]} w={[4, 6]} alignSelf={"center"} />}>
          Nuevo Auto
        </Button>
      </Box>
      <GarageTable/>
    </Container>
  )
}
