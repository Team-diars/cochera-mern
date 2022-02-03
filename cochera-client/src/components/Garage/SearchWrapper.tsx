import { Box } from '@chakra-ui/react';
import React, {ReactNode} from 'react';

export const SearchWrapper: React.FC = ({children}: {
  children?: ReactNode;
}) => {
  return <Box borderRadius={6} 
              background={"#fafafa"} 
              mt={2} 
              borderWidth={1} 
              padding={3} 
              position={"absolute"} 
              zIndex={2} 
              p="0.5rem"
              pb={0}
              boxShadow='xl'>
    {children}
  </Box>;
};
