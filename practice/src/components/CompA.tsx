import Box from './Box';

const CompA = ({ count }: { count: number }) => {
  return (
    <Box
      borderWidth='2px'
      borderColor='yellow'
      borderStyle='solid'
      padding='4px'
      margin='2px'
    >
      CompA({count})
    </Box>
  );
};
export default CompA;
