import React, { useState } from 'react';  
import axios from 'axios';  
import styles from '../styles/ImportBooks.module.css'


const ImportBooks = () => {  
  const [title, setTitle] = useState('');  
  const [authors, setAuthors] = useState('');  
  const [publisher, setPublisher] = useState('');  
  const [numberOfBooks, setNumberOfBooks] = useState('');  
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {  
    e.preventDefault();  
  
    try {  
      const response = await axios.post('http://localhost:8080/frappe_library/api/v1/books/import-books/', {  
        title,  
        authors,  
        publisher,  
        number_of_books: numberOfBooks,  
      });  
  
      setMessage(response.data.detail);  
    } catch (error) {  
      console.error('Error while importing books:', error);  
    } 
    
  };
  
  return (  
    <div className={styles.importBooks}>  
    <h1>Import Books</h1>  

    <input  
      type="text"  
      placeholder="Title"  
      value={title}  
      onChange={(e) => setTitle(e.target.value)}  
    />  

    <input  
      type="text"  
      placeholder="Authors"  
      value={authors}  
      onChange={(e) => setAuthors(e.target.value)}  
    />  

    <input  
      type="text"  
      placeholder="Publisher"  
      value={publisher}  
      onChange={(e) => setPublisher(e.target.value)}  
    />  

    <input  
      type="text"  
      placeholder="Number of Books"  
      value={numberOfBooks}  
      onChange={(e) => setNumberOfBooks(e.target.value)}  
    />  

    <button onClick={handleSubmit}>Import Books</button>  
    {message && <p>{message}</p>} 
  </div>  
  );  
};  
  
export default ImportBooks;  
