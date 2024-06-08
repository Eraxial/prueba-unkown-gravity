import { Box, Container, Grid } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { AppCard } from "../../components/Card/AppCard";
import { useSelector } from "react-redux";

export const Home = () => {
  const [books, setBooks] = useState();
  const user = useSelector(state => state.user);

  useEffect(() => {
    axios
      .get("http://localhost:3000/books")
      .then(res => setBooks(res.data.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <main>
      <Container maxW="8xl">
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
