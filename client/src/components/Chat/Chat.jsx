/* eslint-disable react/prop-types */
import { ArrowBackIcon, ArrowLeftIcon, ChatIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  CloseButton,
  Flex,
  Stack,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { Fragment, useState } from "react";
import { useSelector } from "react-redux";

const data = [
  {
    conversation: 1,
    messages: [
      {
        message_id: 1,
        user_id: 13,
        receptor_user_id: 2,
        text: "que pasaaaa",
        send: Date.now(),
      },
      {
        message_id: 2,
        user_id: 2,
        receptor_user_id: 13,
        text: "que poaqui",
        send: Date.now() + 1,
      },
    ],
  },
  {
    conversation: 2,
    messages: [
      {
        message_id: 1,
        user_id: 13,
        receptor_user_id: 2,
        text: "Y estos dos?",
        send: Date.now(),
      },
      {
        message_id: 2,
        user_id: 2,
        receptor_user_id: 13,
        text: "yo que se mari",
        send: Date.now() + 1,
      },
    ],
  },
  {
    conversation: 3,
    messages: [
      {
        message_id: 1,
        user_id: 13,
        receptor_user_id: 2,
        text: "conver 3?",
        send: Date.now(),
      },
      {
        message_id: 2,
        user_id: 2,
        receptor_user_id: 13,
        text: "Sah",
        send: Date.now() + 1,
      },
    ],
  },
];
export const Chat = ({ show, onOpen, onClose }) => {
  const chatColors = useColorModeValue("teal.200", "teal.600");
  const [showConversation, setShowConversation] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState();
  const { colorMode } = useColorMode();
  const user = useSelector(state => state.user);

  const selectConversation = conv => {
    setSelectedConversation(conv);
    setShowConversation(true);
  };

  const closeChat = () => {
    setShowConversation(false);
    setSelectedConversation();
  };

  return (
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
      {show && (
        <Box
          position="fixed"
          bottom="5%"
          right="2%"
          w="300px"
          h="400px"
          borderRadius="7px"
          border="1px"
          borderColor={colorMode === "dark" ? "gray.700" : "teal.100"}
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
                {data.map(conv => {
                  return (
                    <Box
                      key={conv.conversation}
                      mx={2}
                      px={2}
                      py={2}
                      borderRadius="md"
                      bg="gray"
                      onClick={() => selectConversation(conv)}
                    >
                      {conv.conversation}
                    </Box>
                  );
                })}
              </Stack>
            )}
            {showConversation && (
              <Stack
                p={2}
                bg={colorMode === "dark" ? "gray.700" : "white"}
                minH="352px"
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
                {selectedConversation?.messages.map(mess => {
                  return (
                    <Flex
                      key={mess.message_id}
                      flexDirection={
                        mess.user_id === user.user_id ? "row-reverse" : "row"
                      }
                      gap={2}
                    >
                      <Avatar size="xs" />
                      <Text>{mess.text}</Text>
                    </Flex>
                  );
                })}
              </Stack>
            )}
          </Box>
        </Box>
      )}
    </Fragment>
  );
};
