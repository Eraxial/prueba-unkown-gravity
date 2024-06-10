import { useEffect, useState } from "react";
import axios from "axios";
import { Land } from "../../components/Land/Land";
import { BookList } from "../../components/BookList/BookList";
import { Searcher } from "../../components/Searcher/Searcher";
import { Chat } from "../../components/Chat/Chat";

export const Home = () => {
  const [books, setBooks] = useState();
  const [filteredBooks, setFilteredBooks] = useState();
  const [filter, setFilter] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [selectedUser, setSelectedUser] = useState();

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

  const selectUser = user => {
    setSelectedUser(user);
    setShowChat(true);
  };

  const openChat = () => {
    setShowChat(true);
  };

  const closeChat = () => {
    setShowChat(false);
    setSelectedUser();
  };

  console.log(selectedUser);

  return (
    <main>
      <Land />
      <Searcher filter={filter} onChange={handleWrite} search={searchBooks} />
      <BookList books={filteredBooks} onClick={selectUser} />
      <Chat
        show={showChat}
        onOpen={openChat}
        onClose={closeChat}
        selectedUser={selectedUser}
      />
    </main>
  );
};
