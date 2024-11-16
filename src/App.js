// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:8000/books';

function App() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const[error,setError]=useState('')
  
  useEffect(() => {
    fetchBooks();
  }, []);
  
  const fetchBooks = async () => {
    const response = await axios.get(API_URL);
    setBooks(response.data);
  };

  const addBook = async () => {
    if (!title.trim() || !author.trim() || !description.trim()) {
      setError('fields is required!');
      return;
    }
  
    setError('');
    const newBook = { title, author, description };
  
    try {
      await axios.post(API_URL, newBook);
      fetchBooks();
      setTitle('');
      setAuthor('');
      setDescription('');
    } catch (error) {
      console.error('Error adding book:', error);
      setError('Failed to add the book. Please try again.');
    }
  };
  

  const deleteBook = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchBooks();
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Book Manager</h1>

        {/* Add Book Section */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Add a New Book</h2>
        <div className="space-y-4 mb-8">
          <input
            className="border p-3 w-full rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <input
            className="border p-3 w-full rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <textarea
            className="border p-3 w-full rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            onClick={addBook}
            className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-200 shadow-md"
          >
            Add Book
          </button>
        </div>

        {/* Book List Section */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Book List</h2>
      {books.length === 0 ? (
        <p className="text-center text-gray-600">No books found. Add a new book to get started!</p>
      ) : (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {books.map((book) => (
            <div key={book._id} className="p-4 bg-white border rounded-lg shadow-sm hover:shadow-md transition duration-200">
              <h2 className="text-lg font-bold text-gray-800">{book.title}</h2>
              <p className="text-sm text-gray-500 mb-2">by {book.author}</p>
              <p className="text-gray-600 mb-4">{book.description}</p>
              <button
                onClick={() => deleteBook(book._id)}
                className="text-red-500 hover:text-red-700 inline-flex items-center"
              >
                <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm12-15h-3.5l-1-1h-5l-1 1H6v2h12V4z"></path>
                </svg>
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
      </div>
    </div>
  );
}

export default App;
