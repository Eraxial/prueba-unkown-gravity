/* eslint-disable react/prop-types */
import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";

export const AppCard = ({ book }) => {
  return (
    <Card maxW="300px">
      <CardBody p={0}>
        <Box position="relative" role="group" transition="filter 0.5s">
          <Image
            src={`/assets/images/${book.photo}`}
            alt={`Cover of ${book.name}`}
            borderRadius="5px 5px 0 0"
            aspectRatio="16/9"
            objectFit="cover"
            transition="filter 0.3s ease" // Añade la transición
            _groupHover={{ filter: "brightness(0.4)" }} // Hace que la imagen se vea más oscura al hacer hover
          />
          <Text
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            opacity={0}
            visibility="hidden"
            transition="opacity 0.3s ease, visibility 0.3s ease" // Añade la transición
            _groupHover={{ opacity: 1, visibility: "visible" }} // Cambia la opacidad y visibilidad al hacer hover
          >
            {book.name}
          </Text>
        </Box>
        <Stack spacing="3" p="3">
          <Heading size="sm">{book.name}</Heading>
          <Text color="blue.600" fontSize="2xl">
            100€
          </Text>
        </Stack>
      </CardBody>
      <CardFooter p="3">
        <ButtonGroup spacing="2">
          <Button variant="solid" colorScheme="blue">
            Buy now
          </Button>
          <Button variant="ghost" colorScheme="blue">
            Add to cart
          </Button>
          <Avatar src="/assets/images/me.png" />
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};
