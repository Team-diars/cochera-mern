import { Box } from '@chakra-ui/react';
import React, {ReactNode} from 'react';

export const SearchWrapper: React.FC = ({children}: {
  children?: ReactNode;
}) => {
  return <Box borderRadius={5} background={"#fafafa"} mt={2} borderWidth={1} padding={3} position={"absolute"} zIndex={2} pb={0}>
    {children}
  </Box>;
};
