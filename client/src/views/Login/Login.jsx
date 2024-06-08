import React, { useState } from "react";
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
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { addUser } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";
import VerifyLogin from "../../components/VerifyLogin/VerifyLogin";
import Utils from "../../../utils/js/utils";

const initialState = {
  email: "",
  password: "",
};

const codeInitialState = {
  number1: "",
  number2: "",
  number3: "",
  number4: "",
};

const generate4DigitsCode = () => {
  let codigo = Math.floor(Math.random() * 10000);
  return codigo.toString().padStart(4, "0");
};

const Login = () => {
  const { toggleColorMode } = useColorMode();
  const formBackground = useColorModeValue("gray.100", "gray.700");
  const [user, setUser] = useState(initialState);
  const [errorMsg, setErrorMsg] = useState();
  const [showLogin, setShowLogin] = useState(true);
  const [verificationCode, setVerificationCode] = useState();
  const [code, setCode] = useState(codeInitialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Recoge los datos traidos del formulario de Login
  const handleChange = e => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  console.log(code);

  const handleSubmit = e => {
    // setShowLogin(true);
    if (
      code.number1 === verificationCode[0] &&
      code.number2 === verificationCode[1] &&
      code.number3 === verificationCode[2] &&
      code.number4 === verificationCode[3]
    ) {
      //Conexión con la base de datos
      axios
        .post("http://localhost:3000/users/login", user)
        .then(res => {
          const { token } = res.data;

          //Verificamos que hay token
          if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            const user_id = jwtDecode(token);
            console.log(token);

            //Decodificamos el token y nos traemos de la base de datos los datos del usuario cuyo user_id estaba encriptado en el token
            axios
              .get(`http://localhost:3000/users/${user_id.user_id}`)
              .then(res => {
                setErrorMsg();
                console.log(res.data);

                //Añadimos el usuario al estado global de usuario a través de un dispatch
                dispatch(addUser(res.data));

                //Metemos el token en el localStorage para que si salimos de la web sigamos conectados.
                localStorage.setItem("token", token);
                navigate("/");
              });
          }
        })
        .catch(err => {
          console.log(err);
          setErrorMsg(err.response.data);
        });
    }
  };

  const sendVerificationMail = () => {
    setShowLogin(false);
    const verification = generate4DigitsCode();
    setVerificationCode(verification);
    axios
      .post("http://localhost:3000/users/verifyLogin", {
        code: verification,
        email: user.email,
      })
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  return (
    <Flex h="100vh" alignItems="center" justifyContent="center">
      {showLogin && (
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
          {errorMsg && (
            <Text mb={3} color="tomato">
              {errorMsg}
            </Text>
          )}
          <Button colorScheme="teal" mb={8} onClick={sendVerificationMail}>
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
      )}
      {!showLogin && (
        <VerifyLogin
          email={user.email}
          handleSubmit={handleSubmit}
          code={code}
          setCode={setCode}
        />
      )}
    </Flex>
  );
};

export default Login;
