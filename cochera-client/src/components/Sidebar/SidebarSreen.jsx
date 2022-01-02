import { Button } from '@chakra-ui/button'
import { Box, Container, Heading } from '@chakra-ui/layout'
import React from 'react'

export const SidebarSreen = () => {
  return (
    <Container maxW='container.xl' padding="10">
      <Box display="flex" justifyContent="space-between">
        <Box p='2'>
          <Heading size='md'>Garage App</Heading>
        </Box>
        <Box>
          <Button colorScheme='teal' mr='4'>
            Sign Up
          </Button>
          <Button colorScheme='teal'>Log in</Button>
        </Box>
      </Box>
    </Container>
  )
}
