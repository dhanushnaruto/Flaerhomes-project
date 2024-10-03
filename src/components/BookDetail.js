import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const BookDetail = ({ addToLibrary }) => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookDetail = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://openlibrary.org/works/OL${id}W.json`);
        const bookDetail = {
          id: response.data.key.split('/').pop(),
          title: response.data.title,
          author: response.data.authors[0]?.name || 'Unknown Author',
          description: response.data.description?.value || 'No description available.',
          genre: 'Fiction', // Dummy data
          rating: 4.5, // Dummy data
        };
        setBook(bookDetail);
      } catch (error) {
        setError('Failed to fetch book details');
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetail();
  }, [id]);

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>{error}</h2>;
  if (!book) return <h2>Book not found</h2>;

  return (
    <div>
      <h1>{book.title}</h1>
      <p>Author: {book.author}</p>
      <p>Genre: {book.genre}</p>
      <p>Rating: {book.rating}</p>
      <p>Description: {book.description}</p>
      <button onClick={() => addToLibrary(book)} className="button">Add to My Library</button>
      <Link to="/" className="link">Back to Home</Link>
    </div>
  );
};

export default BookDetail;
