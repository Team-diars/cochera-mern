import { Box } from '@chakra-ui/react';
import React from 'react';

interface ICar {
  image: string,
  brand: string,
  licenceplate: string,
  color: string,
  model: string,
  type: string,
  customer: string,
}

export const CardItem: React.FC<ICar> = ({image, brand, licenceplate, color, model, type, customer}) => {
  return <Box>
    
  </Box>;
};
