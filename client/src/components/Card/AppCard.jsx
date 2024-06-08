/* eslint-disable react/prop-types */
import {
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
      <CardBody>
        <Image
          src={`/assets/images/${book.photo}`}
          alt={`Cover of ${book.name}`}
          borderRadius="lg"
        />
        <Stack mt="6" spacing="3">
          <Heading size="sm">{book.name}</Heading>
          <Text color="blue.600" fontSize="2xl">
            100€
          </Text>
        </Stack>
      </CardBody>
      <CardFooter>
        <ButtonGroup spacing="2">
          <Button variant="solid" colorScheme="blue">
            Buy now
          </Button>
          <Button variant="ghost" colorScheme="blue">
            Add to cart
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};
