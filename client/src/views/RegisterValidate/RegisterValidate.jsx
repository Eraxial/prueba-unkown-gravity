import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const RegisterValidate = () => {
  const bgColor = useColorModeValue("gray.100", "gray.700");
  const navigate = useNavigate();

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      h="calc(100vh - 64px)"
      bg={bgColor}
    >
      <Alert
        status="success"
        variant="subtle"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        height="200px"
        borderRadius="md"
        colorScheme="teal"
      >
        <AlertIcon boxSize="40px" mr={0} />
        <AlertTitle mt={4} mb={1} fontSize="lg">
          ¡Éxito!
        </AlertTitle>
        <AlertDescription maxWidth="sm">
          Te has registrado correctamente. En breves recibirás un correo
          electrónico para verificar tu usuario. Gracias por confiar en
          WallaBook
        </AlertDescription>
      </Alert>
    </Box>
  );
};
