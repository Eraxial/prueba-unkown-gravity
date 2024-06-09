import { Box, Grid, Image, Text, useColorModeValue } from "@chakra-ui/react";

export const Land = () => {
  const homeBg = useColorModeValue("teal.300", "teal.600");
  const headText = useColorModeValue("teal.700", "teal.100");
  const mainText = useColorModeValue("teal.100", "teal.300");
  const boxBg = useColorModeValue(
    "rgba(255, 255, 255, 0.5)",
    "rgba(1, 1, 1, 0.5)"
  );

  // Componente que muestra el land page de la web
  return (
    <Grid
      px={{ base: "25px", md: "75px" }}
      bg={homeBg}
      gap={5}
      alignItems="center"
      gridTemplateColumns={{ base: "1fr", lg: "400px 1fr" }}
      gridTemplateRows="1fr"
      placeItems="center"
      position="relative"
      minH="540px"
    >
      {/* Imagen de mujer leyendo tranquilamente */}
      <Image
        src="/assets/images/land-image.jpg"
        width="100%"
        h="100%"
        filter={{ base: "brightness(1)", lg: "brightness(1)" }}
        objectFit="cover"
      ></Image>

      {/* Elemento que envuelve dos textos ordenados por importancia */}
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
        <Text fontSize={{ base: "lg", md: "2xl", xl: "3xl" }} color={mainText}>
          Únete a nuestra comunidad de lectores y vendedores apasionados.
        </Text>
      </Box>
    </Grid>
  );
};
