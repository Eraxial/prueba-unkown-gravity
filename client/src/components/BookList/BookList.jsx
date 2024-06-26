/* eslint-disable react/prop-types */
import { Container, Grid } from "@chakra-ui/react";
import { AppCard } from "../Card/AppCard";

// Componente que muestra la lista de todos los libros que hay en la web
export const BookList = ({ books, onClick }) => {
  return (
    <Container maxW="8xl" pt={{ base: "64px", md: "0" }}>
      <Grid
        templateColumns={{
          base: "repeat(2, minmax(0, 1fr))",
          md: "repeat(3, minmax(0, 1fr))",
          lg: "repeat(4, minmax(0, 1fr))",
          xl: "repeat(6, minmax(0, 1fr))",
        }}
        gap={5}
        justifyItems="center"
        py={10}
      >
        {books &&
          books.map(book => {
            return <AppCard key={book.book_id} book={book} onClick={onClick} />;
          })}
      </Grid>
    </Container>
  );
};
