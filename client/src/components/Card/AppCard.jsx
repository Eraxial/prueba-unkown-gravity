/* eslint-disable react/prop-types */
import {
  Avatar,
  Box,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

export const AppCard = ({ book }) => {
  const avatarBG = useColorModeValue("teal.300", "teal.500");

  return (
    <Card maxW="300px">
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
            src="/assets/images/me.png"
            position="absolute"
            top="5px"
            right="5px"
            size="lg"
            p={1}
            bg={avatarBG}
          />
        </Box>
        <Stack spacing="3" p="3">
          <Heading size="sm">{book.name}</Heading>
          <Text colorScheme="teal" fontSize="2xl">
            100€
          </Text>
        </Stack>
      </CardBody>
      <CardFooter p="3"></CardFooter>
    </Card>
  );
};
