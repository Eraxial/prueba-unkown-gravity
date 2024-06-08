import {
  Flex,
  Heading,
  Input,
  Button,
  FormControl,
  FormLabel,
  useColorModeValue,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const initialState = {
  email: "",
  password: "",
  name: "",
};

const Register = () => {
  const formBackground = useColorModeValue("gray.100", "gray.700");
  const [user, setUser] = useState(initialState);
  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const registerUser = e => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/users/register", user)
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          /* navigate('/login') */
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <Flex h="100vh" alignItems="center" justifyContent="center">
      <Flex
        flexDirection="column"
        bg={formBackground}
        p={12}
        borderRadius={8}
        boxShadow="lg"
      >
        <Heading mb={6}>Register</Heading>
        <Input
          placeholder="Email"
          type="email"
          name="email"
          value={user.email}
          variant="filled"
          mb={3}
          onChange={handleChange}
        />
        <Input
          placeholder="Password"
          type="password"
          name="password"
          value={user.password}
          variant="filled"
          mb={3}
          onChange={handleChange}
        />
        <Input
          placeholder="Name"
          type="text"
          name="name"
          value={user.name}
          variant="filled"
          mb={6}
          onChange={handleChange}
        />
        <Button colorScheme="teal" mb={8} onClick={registerUser}>
          Register
        </Button>
        <FormControl display="flex" alignItems="center">
          <FormLabel htmlFor="dark_mode" mb="0"></FormLabel>
        </FormControl>
      </Flex>
    </Flex>
  );
};

export default Register;
