import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  useColorModeValue,
  Button,
} from "@chakra-ui/react";

// Componente que hará la conexión para verificar al usuario y mostrará un mensaje de validación al usuario en caso de ser verificado
export const RegisterSuccess = () => {
  const { token } = useParams();
  const [status, setStatus] = useState("loading"); // 'loading', 'success', 'error'
  const [message, setMessage] = useState("");
  const bgColor = useColorModeValue("gray.100", "gray.700");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .put("http://localhost:3000/users/verify", { token: token })
      .then(res => {
        if (res.status === 200) {
          setStatus("success");
          setMessage("El usuario ha sido verificado correctamente.");
        } else {
          setStatus("error");
          setMessage("Hubo un problema verificando al usuario.");
        }
      })
      .catch(err => {
        console.error(err);
        setStatus("error");
        setMessage("Hubo un problema verificando al usuario.");
      });
  }, [token]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      h="calc(100vh - 64px)"
      bg={bgColor}
      p={4}
    >
      {status === "loading" && <Spinner size="xl" />}
      {status === "success" && (
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
          mb={4}
        >
          <AlertIcon boxSize="40px" mr={0} />
          <AlertTitle mt={4} mb={1} fontSize="lg">
            ¡Éxito!
          </AlertTitle>
          <AlertDescription maxWidth="sm">{message}</AlertDescription>
        </Alert>
      )}
      {status === "error" && (
        <Alert
          status="error"
          variant="subtle"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          height="200px"
          borderRadius="md"
          colorScheme="red"
          mb={4}
        >
          <AlertIcon boxSize="40px" mr={0} />
          <AlertTitle mt={4} mb={1} fontSize="lg">
            ¡Error!
          </AlertTitle>
          <AlertDescription maxWidth="sm">{message}</AlertDescription>
        </Alert>
      )}
      {(status === "success" || status === "error") && (
        <Button mt={4} colorScheme="teal" onClick={() => navigate("/login")}>
          Logueate
        </Button>
      )}
    </Box>
  );
};
