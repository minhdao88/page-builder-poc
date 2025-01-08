import React from 'react';
import { Box, Stack } from '@mantine/core';

interface RowProps {
  rows?: number;
  gap?: number | string;
  children?: React.ReactNode;
}

export const Row: React.FC<RowProps> = ({
  rows = 1,
  gap = 'md',
  children
}) => {
  // Convert children to array for easier handling
  const childrenArray = React.Children.toArray(children);
  
  // Create array of specified length to render rows
  const rowsArray = Array.from({ length: rows }, (_, index) => {
    // Get child for this row if it exists
    const child = childrenArray[index];
    
    return (
      <Box key={index}>
        {child}
      </Box>
    );
  });

  return (
    <Stack gap={gap}>
      {rowsArray}
    </Stack>
  );
}; 