export const cleanProps = (props: any) => {
  // Remove internal Craft.js props
  const { custom, ...cleanedProps } = props;
  
  // Convert style objects to strings
  if (cleanedProps.style) {
    cleanedProps.style = Object.entries(cleanedProps.style)
      .map(([key, value]) => `${key}: ${value}`)
      .join(';');
  }
  
  return cleanedProps;
}; 