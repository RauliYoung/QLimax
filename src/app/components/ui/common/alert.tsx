import {Alert, AlertIcon, AlertTitle, AlertDescription} from '@chakra-ui/react';

interface CustomAlertProps {
  status: 'success' | 'error' | 'info' | 'warning';
  title: string;
  description: string;
}

const CustomAlert: React.FC<CustomAlertProps> = ({
  status,
  title,
  description,
}) => {
  return (
    <Alert
      status={status}
      variant="subtle"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
    >
      <AlertIcon />
      <AlertTitle mr={2}>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
};

export default CustomAlert;
