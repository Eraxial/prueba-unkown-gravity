import { useEffect, useState } from "react";
import axios from "axios";
import { Land } from "../../components/Land/Land";
import { BookList } from "../../components/BookList/BookList";
import { Searcher } from "../../components/Searcher/Searcher";
import { Chat } from "../../components/Chat/Chat";
import { useSelector } from "react-redux";

export const Home = () => {
  const [books, setBooks] = useState();
  const [filteredBooks, setFilteredBooks] = useState();
  const [filter, setFilter] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [selectedUser, setSelectedUser] = useState();
  const user = useSelector(state => state.user);

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
    axios
      .get(`http://localhost:3000/users/${user}`)
      .then(res => setSelectedUser(res.data))
      .catch(err => console.log(err));

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
      {user.user_id !== "" && (
        <Chat
          show={showChat}
          onOpen={openChat}
          onClose={closeChat}
          selectedUser={selectedUser}
        />
      )}
    </main>
  );
};
