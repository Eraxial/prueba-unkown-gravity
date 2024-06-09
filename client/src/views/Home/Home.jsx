import {
  Box,
  Container,
  Flex,
  Grid,
  Heading,
  Image,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { AppCard } from "../../components/Card/AppCard";
import { useSelector } from "react-redux";

export const Home = () => {
  const [books, setBooks] = useState();
  const user = useSelector(state => state.user);
  const homeBg = useColorModeValue("teal.300", "teal.600");
  const headText = useColorModeValue("teal.700", "teal.100");
  const mainText = useColorModeValue("teal.100", "teal.300");
  const boxBg = useColorModeValue(
    "rgba(255, 255, 255, 0.5)",
    "rgba(1, 1, 1, 0.5)"
  );

  useEffect(() => {
    axios
      .get("http://localhost:3000/books")
      .then(res => setBooks(res.data.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <main>
      <Grid
        px={{ base: "25px", md: "75px" }}
        bg={homeBg}
        gap={5}
        alignItems="center"
        gridTemplateColumns={{ base: "1fr", lg: "400px 1fr" }}
        gridTemplateRows="1fr"
        placeItems="center"
        position="relative"
        minH="80vh"
      >
        <Image
          src="/assets/images/land-image.jpg"
          width="100%"
          h="100%"
          filter={{ base: "brightness(1)", lg: "brightness(1)" }}
          objectFit="cover"
        ></Image>
        <Box
          maxW="600px"
          textAlign="center"
          position={{ base: "absolute", lg: "static" }}
          px={{ base: "35px", md: "85px", lg: "0" }}
          bg={{ base: boxBg, lg: "none" }}
          w="80%"
          borderRadius="md"
          p={5}
        >
          <Text
            fontSize={{ base: "xl", md: "3xl", xl: "4xl" }}
            fontWeight="600"
            textStyle="bold"
            color={headText}
          >
            Encuentra una gran variedad de libros nuevos y usados a precios
            increíbles. ¡Fácil, rápido y seguro!
          </Text>
          <Text
            fontSize={{ base: "lg", md: "2xl", xl: "3xl" }}
            color={mainText}
          >
            Únete a nuestra comunidad de lectores y vendedores apasionados.
          </Text>
        </Box>
      </Grid>
      <Container maxW="8xl" pt={{ base: "64px", md: "0" }}>
        {user.user_id !== "" && (
          <Box>
            <ul>
              <li>user_id:{user.user_id}</li>
              <li>email:{user.email}</li>
              <li>name:{user.name}</li>
            </ul>
          </Box>
        )}
        <Grid
          templateColumns={{
            base: "minmax(0, 1fr)",
            md: "repeat(2, minmax(0, 1fr))",
            xl: "repeat(4, minmax(0, 1fr))",
          }}
          gap={5}
          justifyItems="center"
        >
          {books &&
            books.map(book => {
              return <AppCard key={book.book_id} book={book} />;
            })}
        </Grid>
      </Container>
    </main>
  );
};
