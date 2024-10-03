import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import axios from 'axios';

const BookList = ({ addToLibrary }) => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://openlibrary.org/subjects/love.json?limit=500');
        const bookData = response.data.works.map(book => ({
          id: book.key.split('/').pop(),
          title: book.title,
          author: book.authors[0]?.name || 'Unknown Author',
          genre: 'Fiction', // Dummy data; replace with real data if available
          rating: 4.5, // Dummy data
        }));
        setBooks(bookData);
      } catch (err) {
        setError('Failed to fetch books');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(search.toLowerCase()) ||
    book.author.toLowerCase().includes(search.toLowerCase()) ||
    book.genre.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <div>
      <h1>Book Listing</h1>
      <SearchBar setSearch={setSearch} />
      <div className="book-list">
        {filteredBooks.map(book => (
          <div key={book.id} className="book-item">
            <h2>{book.title}</h2>
            <p>{book.author}</p>
            <p>Genre: {book.genre}</p>
            <p>Rating: {book.rating}</p>
            <Link to={`/book/${book.id}`} className="link">View Details</Link>
            <button onClick={() => addToLibrary(book)} className="button">Add to My Library</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookList;
