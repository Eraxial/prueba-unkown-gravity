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
import { jwtDecode } from "jwt-decode";
import { useDispatch } from 'react-redux';
import { addUser } from '../../store/userSlice';
import { useNavigate } from 'react-router-dom'

const initialState = {
  email: "",
  password: ""
}

const Login = () => {
  const { toggleColorMode } = useColorMode();
  const formBackground = useColorModeValue('gray.100', 'gray.700');
  const [user, setUser] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleChange = (e) => {
    const {name, value} = e.target;
    setUser({...user, [name]:value})
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:3000/users/login', user)
      .then(res => 
        {
          const { token } = res.data;
          
          if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            const user_id = jwtDecode(token)
            console.log(token)
            axios
              .get(`http://localhost:3000/users/${user_id.user_id}`)
              .then(res => 
                {
                  console.log(res.data)
                  dispatch(addUser(res.data));
                  localStorage.setItem('token', token)
                  navigate('/')
                })

          }
        })
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
