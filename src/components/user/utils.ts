export const getSelectedStyle = (selected: boolean): React.CSSProperties => ({
  boxShadow: selected ? '0 0 0 2px #1c7ed6' : 'none',
}); 