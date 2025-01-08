import React, { Fragment } from 'react';
import { Grid, NumberInput, Select } from '@mantine/core';

type SpanValue = number | Record<string, number>;

interface ColumnProps {
  cols?: number;
  gap?: number | string;
  spans?: SpanValue[];
  children?: React.ReactNode;
}

export const Column: React.FC<ColumnProps> = ({
  cols = 1,
  gap = 'md',
  spans = [],
  children
}) => {
  // Get children from Fragment if present
  const getChildrenArray = (children: React.ReactNode) => {
    const arr = React.Children.toArray(children);
    if (arr.length === 1 && React.isValidElement(arr[0]) && arr[0].type === Fragment) {
      return React.Children.toArray(arr[0].props.children);
    }
    return arr;
  };

  const childrenArray = getChildrenArray(children);
  
  // Create columns based on cols prop
  const columns = Array.from({ length: cols }, (_, colIndex) => {
    const spanValue = spans[colIndex] || { base: 12 };
    const child = childrenArray[colIndex];

    return (
      <Grid.Col 
        key={colIndex} 
        span={spanValue}
      >
        {child}
      </Grid.Col>
    );
  });

  return (
    <Grid gutter={gap}>
      {columns}
    </Grid>
  );
}; 

interface ColumnSettingsProps {
  cols?: number;
  gap?: string;
  onUpdate: (props: Partial<ColumnSettingsProps>) => void;
}

export const ColumnSettings: React.FC<ColumnSettingsProps> = ({
  cols = 1,
  gap = 'md',
  onUpdate
}) => {
  return (
    <div>
      <NumberInput
        label="Columns"
        value={cols}
        onChange={(value) => onUpdate({ cols: value })}
        min={1}
        max={12}
      />
      
      <Select
        label="Gap"
        value={gap}
        onChange={(value) => onUpdate({ gap: value })}
        data={[
          { value: 'xs', label: 'Extra Small' },
          { value: 'sm', label: 'Small' },
          { value: 'md', label: 'Medium' },
          { value: 'lg', label: 'Large' },
          { value: 'xl', label: 'Extra Large' },
        ]}
      />
    </div>
  );
}; 