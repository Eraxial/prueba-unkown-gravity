/* eslint-disable react/prop-types */
import {
  ArrowBackIcon,
  ArrowRightIcon,
  ChatIcon,
  Search2Icon,
} from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  CloseButton,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import axios from "axios";
import { Fragment, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { format, parse } from "@formkit/tempo";

export const Chat = ({ show, onOpen, onClose, selectedUser }) => {
  const chatColors = useColorModeValue("teal.200", "teal.600");
  const [showConversation, setShowConversation] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState();
  const [chat, setChat] = useState();
  const [message, setMessage] = useState("");
  const { colorMode } = useColorMode();
  const user = useSelector(state => state.user);

  console.log(selectedConversation);

  const messageContainerRef = useRef();

  const selectConversation = conv => {
    setSelectedConversation(conv);
    setShowConversation(true);
  };

  const closeChat = () => {
    setShowConversation(false);
    setSelectedConversation();
  };

  const handleChange = event => {
    setMessage(event.target.value);
  };

  const sendMessage = event => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }

    if (event.key === "Enter" && message !== "") {
      const l = "en";
      const t = new Date();
      const now = format(t, "YYYY-MM-DDTHH:mm:ss", l);

      console.log(selectedConversation);

      //TODO
      //Tengo que hacer que cuando se elija una foto, se abra el chat con una conversación nueva o la que ya tenía abierta
      //Que recepto_user_id no sea siempre 4 y sea el id de la persona que elijo

      const msg = {
        conversation_id: selectedConversation.conversation_id,
        message_id: selectedConversation.messages.length + 1,
        receptor_user_id: selectedConversation.receptor_user_id,
        send_date: now,
        text: message,
        user_id: user.user_id,
      };

      setSelectedConversation({
        ...selectedConversation,
        messages: [...selectedConversation.messages, msg],
      });

      axios
        .post("http://localhost:3000/chat/sendMessage", msg)
        .then(res => console.log(res))
        .catch(err => console.log(err));

      setMessage("");
    }
  };

  //Traemos las conversaciones desde la base de datos
  useEffect(() => {
    axios
      .get(`http://localhost:3000/chat/${user.user_id}`)
      .then(res => {
        setChat(res.data);
        if (selectedUser) {
          const openConv = chat.filter(
            conv => conv.receptor_user_id === selectedUser
          );
          if (openConv.length > 0) {
            setSelectedConversation(openConv[0]);
            setShowConversation(true);
          } else {
            const newConv = {
              conversation_id: chat.length + 1,
              user_id: user.user_id,
              receptor_user_id: selectedUser,
              messages: [],
            };
            setSelectedConversation(newConv);
            setShowConversation(true);

            axios
              .post("http://localhost:3000/chat/addConversation", newConv)
              .then(res => console.log(res))
              .catch(err => console.log(err));

            console.log(newConv);
            setChat([...chat, newConv]);
          }
        }
      })
      .catch(err => console.log(err));
  }, [selectedUser]);

  console.log("CHAAAAAT", chat);

  return (
    // Esto muestra un icono que ponemos fixed en la parte de abajo de la web de facil acceso
    <Fragment>
      {!show && (
        <Box
          p={3}
          bg="teal.400"
          position="fixed"
          bottom="5%"
          right="2%"
          borderRadius="50%"
          cursor="pointer"
          onClick={onOpen}
        >
          <ChatIcon boxSize="2em" color="white" />
        </Box>
      )}

      {/* Al pulsar en el botón nos muestra una ventanita con el chat */}
      {show && (
        <Box
          position="fixed"
          bottom="5%"
          right="2%"
          w="300px"
          h="400px"
          borderRadius="7px"
        >
          <Box>
            <Flex
              p={2}
              justifyContent="space-between"
              bg={chatColors}
              borderRadius="7px 7px 0 0"
            >
              <Text placeContent="center" colorScheme="teal">
                Mensajes
              </Text>
              <CloseButton onClick={onClose} />
            </Flex>
            {/* Si no tenemos conversaciones seleccionadas nos aparece en la ventana las conversaciones que tenemos abiertas hasta el momento */}
            {!showConversation && (
              <Stack
                py={2}
                h="352px"
                overflowY="auto"
                bottom="0"
                bg={colorMode === "dark" ? "gray.700" : "white"}
                minH="351px"
                borderRadius="0 0 8px 8px"
              >
                {chat?.map(conv => {
                  return (
                    <Box
                      key={conv.conversation_id}
                      mx={2}
                      px={2}
                      py={2}
                      borderRadius="md"
                      bg="gray"
                      onClick={() => selectConversation(conv)}
                    >
                      {conv.conversation_id}
                    </Box>
                  );
                })}
              </Stack>
            )}

            {/* Al seleccionar una conversación, se nos abre dicha conversación con el historial de chats */}
            {showConversation && (
              <Stack
                ref={messageContainerRef}
                p={2}
                bg={colorMode === "dark" ? "gray.700" : "white"}
                h="352px"
                overflowY="auto"
                gap={2}
                position="relative"
                borderRadius="0 0 8px 8px"
              >
                <Box
                  _hover={{ bg: "tomato" }}
                  w="fit-content"
                  p={1}
                  borderRadius="50%"
                  aspectRatio="1"
                  placeContent="center"
                >
                  <ArrowBackIcon
                    boxSize={5}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    onClick={closeChat}
                  />
                </Box>
                {/* Aquí listamos todos los mensajes del usuario  */}
                {selectedConversation?.messages.map(mess => {
                  return (
                    <Flex
                      key={mess.message_id}
                      justifyContent="flex-start"
                      alignItems="center"
                      flexDirection={
                        mess.user_id === user.user_id ? "row-reverse" : "row"
                      }
                      gap={3}
                      p={2}
                      bg="teal.500"
                      borderRadius="3xl"
                    >
                      <Avatar size="xs" />
                      <Text textAlign="end">{mess.text}</Text>
                    </Flex>
                  );
                })}
                <InputGroup position="sticky" bottom={0} w="100%">
                  <InputRightElement pointerEvents="none">
                    <ArrowRightIcon color="gray.300" />
                  </InputRightElement>
                  <Input
                    name="message"
                    value={message}
                    onChange={handleChange}
                    onKeyUp={sendMessage}
                    bg={colorMode === "dark" ? "gray.700" : "white"}
                  />
                </InputGroup>
              </Stack>
            )}
          </Box>
        </Box>
      )}
    </Fragment>
  );
};
