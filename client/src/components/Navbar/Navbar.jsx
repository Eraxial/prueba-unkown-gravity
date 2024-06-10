/* eslint-disable react/prop-types */
"use client";

import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Container,
  ButtonGroup,
  useColorMode,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, SunIcon, MoonIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";

const Links = ["Dashboard", "Projects", "Team"];

const NavLink = ({ children }) => {
  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
      href={"#"}
    >
      {children}
    </Box>
  );
};

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log(user);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
  };

  return (
    <>
      <Box
        bg={useColorModeValue("gray.100", "gray.900")}
        px={4}
        position={{ base: "fixed", md: "static" }}
        w="100%"
        zIndex="100"
      >
        <Container maxW="8xl">
          <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
            <IconButton
              size={"md"}
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              aria-label={"Open Menu"}
              display={{ md: "none" }}
              onClick={isOpen ? onClose : onOpen}
            />
            <HStack spacing={8} alignItems={"center"}>
              <Box onClick={() => navigate("/")}>Logo</Box>
              <HStack
                as={"nav"}
                spacing={4}
                display={{ base: "none", md: "flex" }}
              >
                {Links.map(link => (
                  <NavLink key={link}>{link}</NavLink>
                ))}
              </HStack>
            </HStack>
            <Flex alignItems={"center"} gap={5}>
              {colorMode === "dark" ? (
                <SunIcon
                  onClick={toggleColorMode}
                  cursor="pointer"
                  p={1.5}
                  w="30px"
                  h="30px"
                  borderRadius="50%"
                  transition={"background-color 0.3s ease, color 0.8s ease"}
                  _hover={{ bg: "teal.200", color: "black" }}
                />
              ) : (
                <MoonIcon
                  onClick={toggleColorMode}
                  cursor="pointer"
                  p={1.5}
                  w="30px"
                  h="30px"
                  borderRadius="50%"
                  transition={"background-color 0.3s ease, color 0.8s ease"}
                  _hover={{ bg: "teal.500", color: "white" }}
                />
              )}
              {user.user_id !== "" && (
                <Menu>
                  <MenuButton
                    as={Button}
                    rounded={"full"}
                    variant={"link"}
                    cursor={"pointer"}
                    minW={0}
                  >
                    <Avatar
                      size={"md"}
                      src={`/assets/images/${user?.photo}`}
                      colorScheme="teal"
                    />
                  </MenuButton>
                  <MenuList>
                    <MenuItem>Link 1</MenuItem>
                    <MenuItem>Link 2</MenuItem>
                    <MenuDivider />
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </MenuList>
                </Menu>
              )}

              {user.user_id === "" && (
                <ButtonGroup alignItems="center">
                  <Button
                    colorScheme="teal"
                    variant="ghost"
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </Button>
                  <Button
                    colorScheme="teal"
                    variant="solid"
                    onClick={() => navigate("/register")}
                  >
                    Register
                  </Button>
                </ButtonGroup>
              )}
            </Flex>
          </Flex>
        </Container>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map(link => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>

      <Container maxW="8xl">
        <Box></Box>
      </Container>
    </>
  );
}
