const colors = [
  '#FF6633',
  '#FFB399',
  '#FF33FF',
  '#00B3E6',
  '#E6B333',
  '#3366E6',
  '#999966',
  '#99FF99',
  '#B34D4D',
  '#80B300',
  '#809900',
  '#E6B3B3',
  '#6680B3',
  '#66991A',
  '#FF99E6',
  '#CCFF1A',
  '#FF1A66',
  '#E6331A',
  '#33FFCC',
];

export const randomColor = () => {
  return colors[Math.floor(Math.random() * colors.length)];
};
