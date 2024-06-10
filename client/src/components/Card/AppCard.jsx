/* eslint-disable react/prop-types */
import { ChatIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Card,
  CardBody,
  Flex,
  Image,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";

export const AppCard = ({ book, onClick }) => {
  const avatarBG = useColorModeValue("teal.300", "teal.500");
  const user = useSelector(state => state.user);
  return (
    <Card
      maxW="200px"
      bg="none"
      shadow="none"
      transition={"transform 0.3s"}
      _hover={{ transform: "scale(1.05)" }}
    >
      <CardBody p={0}>
        <Box position="relative" role="group" transition="filter 0.5s">
          <Image
            src={`/assets/images/${book.photo}`}
            alt={`Cover of ${book.name}`}
            borderRadius="5px 5px 0 0"
            aspectRatio="10/16"
            objectFit="cover"
            transition="filter 0.3s ease"
            _groupHover={{ filter: "brightness(0.4)" }}
          />
          <Text
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            opacity={0}
            visibility="hidden"
            transition="opacity 0.3s ease, visibility 0.3s ease"
            _groupHover={{ opacity: 1, visibility: "visible" }}
            color="white"
          >
            {book.name}
          </Text>
          <Avatar
            src={`/assets/images/${book.user.photo}`}
            position="absolute"
            top="5px"
            right="5px"
            size="lg"
            p={1}
            bg={avatarBG}
          ></Avatar>
        </Box>
        <Flex justifyContent="space-between" alignItems="center" gap={4} px={2}>
          <Stack gap={2} pt="2">
            <Text colorScheme="teal" fontSize="2xl">
              {book.price}€
            </Text>
            <Text colorScheme="teal" fontSize="lg">
              {book.name}
            </Text>
          </Stack>
          {book.user_id !== user.user_id && user.user_id !== "" && (
            <ChatIcon
              _hover={{ transform: "scale(1.2)" }}
              _active={{ transform: "scale(1)" }}
              cursor="pointer"
              transition={"transform 0.2s"}
              onClick={() => onClick(book.user_id)}
              boxSize={5}
            />
          )}
        </Flex>
      </CardBody>
    </Card>
  );
};
