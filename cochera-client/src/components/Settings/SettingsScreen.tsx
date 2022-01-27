import { Button } from '@chakra-ui/button'
import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { Input, InputGroup, InputLeftAddon, InputLeftElement } from '@chakra-ui/input'
import { Box, Container, Text } from '@chakra-ui/layout'
import React from 'react'
import { FiPhoneIncoming } from 'react-icons/fi'

export const SettingsScreen = () => {
  return (
    <Container paddingY="10" >
      <Text
        fontSize="2xl"
        fontWeight="bold"
        lineHeight="short"
        marginBottom="6"
      >
        Configuracion de Cochera
      </Text>
      <Box p="4" borderWidth="1px" borderRadius="md" bg="#fff">
        <FormControl marginBottom="3">
            <FormLabel>Precio Tarifa</FormLabel>
            <InputGroup>
            <InputLeftElement
              pointerEvents='none'
              color='gray.300'
              fontSize='1.2em'
              children={"S/."}
            />
              <Input
                type="text"
                name="appname"
                placeholder="Ingresar Precio"
              />
            </InputGroup>
        </FormControl>
        <Box
          mt="4"
          display="flex"
          justifyContent="flex-end"
          alignItems="center"
        >
          <Button
            colorScheme="blue"
            type="submit"
          >
            Guardar
          </Button>
        </Box>
      </Box>
    </Container>
  )
}
