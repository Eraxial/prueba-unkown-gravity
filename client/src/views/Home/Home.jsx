import { useEffect, useState } from "react";
import axios from "axios";
import { Land } from "../../components/Land/Land";
import { BookList } from "../../components/BookList/BookList";
import { Searcher } from "../../components/Searcher/Searcher";

export const Home = () => {
  const [books, setBooks] = useState();
  const [filteredBooks, setFilteredBooks] = useState();
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/books")
      .then(res => {
        setBooks(res.data.data);
        setFilteredBooks(res.data.data);
      })
      .catch(err => console.log(err));
  }, []);

  const handleWrite = event => {
    setFilter(event.target.value);
    if (!event.target.value) {
      setFilteredBooks(books);
    }
  };

  const searchBooks = event => {
    if (event.key === "Enter") {
      setFilteredBooks(
        filteredBooks.filter(book =>
          book.name.toLowerCase().includes(filter.toLowerCase())
        )
      );
    }
  };

  return (
    <main>
      <Land />
      <Searcher filter={filter} onChange={handleWrite} search={searchBooks} />
      <BookList books={filteredBooks} />
    </main>
  );
};
