'use client';
import React, { useState, useEffect, useRef } from 'react';    
import axios from 'axios';    
import { Book } from '../types';  
import styles from '../styles/SearchBook.module.css'  



const SearchBook = () => {    
  const [title, setTitle] = useState('');    
  const [author, setAuthor] = useState('');    
  const [books, setBooks] = useState<Book[]>([]);    
  const [searchTerm, setSearchTerm] = useState<{title: string, author: string} | null>(null);  


  useEffect(() => {    
    const fetchData = async () => {    
      try {    
        const result = await axios.get(`http://localhost:8080/frappe_library/api/v1/books/search-book/?title=${searchTerm?.title}&author=${searchTerm?.author}`);  
        setBooks(result.data);    
      } catch (error) {    
        console.error('Error fetching data', error);    
      }    
    };    
    
    if (searchTerm) { // only fetch data if searchTerm is not null  
        fetchData();      
      }  
    }, [searchTerm]);   
    
  const handleSearchClick = () => {  
    setSearchTerm({title, author});  
  }  

  const handleKeyDown = (event: React.KeyboardEvent) => {  
    if(event.key === 'Enter'){  
      handleSearchClick();  
    }  
  }
  
  return ( 
    <div key={books.length}> 
      <h1 className={styles.title}>Search Books</h1>
        <div className={styles.searchBar}>
      <input className={styles.searchInput} type="text" value={title} onChange={e => setTitle(e.target.value)} onKeyDown={handleKeyDown} placeholder="Search by title" />    
      <input className={styles.searchInput} type="text" value={author} onChange={e => setAuthor(e.target.value)} onKeyDown={handleKeyDown} placeholder="Search by author" />    
      <button className={styles.searchButton} onClick={handleSearchClick}>Search</button> 
      </div> 
      <div className={styles.booksGrid}> 
      {books.map((book: Book) => (    
        <div key={book.bookID} className={styles.card}>
            {book.is_available ?   
            <button className={styles.availableButton}>Available</button> :     
            <button className={styles.notAvailableButton}>Not Available</button>  
            }  
          <h2 className={styles.detailBox}><b>Title: </b>{book.title}</h2>    
          <p className={styles.detailBox}><b>Authors: </b>{book.authors}</p>    
          <p className={styles.detailBox}><b>Ratings Count: </b>{book.ratings_count}</p>    
          <p className={styles.detailBox}><b>Number of pages: </b>{book.num_pages}</p>    
          <p className={styles.detailBox}><b>Average rating: </b>{book.average_rating}</p>    
          <p className={styles.detailBox}><b>Publisher: </b>{book.publisher}</p>    
          <p className={styles.detailBox}><b>Reviews count: </b>{book.text_reviews_count}</p>  
          
        </div>    
      ))}  
    </div>  
    </div>   
  );    
};    
    
export default SearchBook;    
