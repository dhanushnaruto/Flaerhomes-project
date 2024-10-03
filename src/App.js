import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BookList from './components/BookList';
import BookDetail from './components/BookDetail';
import MyLibrary from './components/MyLibrary';
import './App.css';

const App = () => {
  const [library, setLibrary] = useState([]);

  const addToLibrary = (book) => {
    if (!library.find(b => b.id === book.id)) {
      setLibrary([...library, book]);
    }
  };

  const removeFromLibrary = (book) => {
    setLibrary(library.filter(b => b.id !== book.id));
  };

  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<BookList addToLibrary={addToLibrary} />} />
          <Route path="/book/:id" element={<BookDetail addToLibrary={addToLibrary} />} />
          <Route path="/mylibrary" element={<MyLibrary library={library} removeFromLibrary={removeFromLibrary} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
