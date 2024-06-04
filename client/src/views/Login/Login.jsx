import React, { useState } from 'react';
import {
  Flex,
  Heading,
  Input,
  Button,
  FormControl,
  FormLabel,
  Switch,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import axios from 'axios';

const initialState = {
  email: "",
  password: "",
  name: "",
}

const Login = () => {
  const { toggleColorMode } = useColorMode();
  const formBackground = useColorModeValue('gray.100', 'gray.700');
  const [user, setUser] = useState(initialState);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setUser({...user, [name]:value})
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:3000/users/login', user)
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }

  return (
    <Flex h="100vh" alignItems="center" justifyContent="center">
      <Flex
        flexDirection="column"
        bg={formBackground}
        p={12}
        borderRadius={8}
        boxShadow="lg"
      >
        <Heading mb={6}>Log In</Heading>
        <Input
          placeholder="Email"
          type="email"
          name='email'
          value={user.email}
          variant="filled"
          mb={3}
          onChange={handleChange}
        />
        <Input
          placeholder="Password"
          type="password"
          name='password'
          value={user.password}
          variant="filled"
          mb={3}
          onChange={handleChange}
        />
        <Button colorScheme="teal" mb={8} onClick={handleSubmit}>
          Log In
        </Button>
        <FormControl display="flex" alignItems="center">
          <FormLabel htmlFor="dark_mode" mb="0">
            Enable Dark Mode?
          </FormLabel>
          <Switch
            id="dark_mode"
            colorScheme="teal"
            size="lg"
            onChange={toggleColorMode}
          />
        </FormControl>
      </Flex>
    </Flex>
  );
};

export default Login;
