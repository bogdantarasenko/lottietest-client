import React from 'react';
import { SimpleGrid } from '@chakra-ui/react';

interface GridListProps {
  children: React.ReactNode;
}

export const GridList: React.FC<GridListProps> = ({ children }) => {
  return (
    <SimpleGrid columns={[1, 2, 3, 4]} spacing={8} px={10} py={10}>
      {children}
    </SimpleGrid>
  );
};
