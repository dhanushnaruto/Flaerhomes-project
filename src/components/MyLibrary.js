import React from 'react';
import { Link } from 'react-router-dom';

const MyLibrary = ({ library, removeFromLibrary }) => {
  return (
    <div className="my-library">
      <h1>My Library</h1>
      {library.length === 0 ? (
        <p>Your library is empty. Add some books!</p>
      ) : (
        <ul>
          {library.map(book => (
            <li key={book.id}>
              <span>{book.title} by {book.author}</span>
              <button onClick={() => removeFromLibrary(book)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
      <Link to="/" className="link">Back to Home</Link>
    </div>
  );
};

export default MyLibrary;
