import { Box } from '@chakra-ui/react';
import React, {ReactNode} from 'react';

export const SearchWrapper: React.FC = ({children}: {
  children?: ReactNode;
}) => {
  return <Box borderRadius={5} background={"#fafafa"}>
    {children}
  </Box>;
};
