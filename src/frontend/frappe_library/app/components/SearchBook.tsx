'use client';
import React, { useState, useEffect, useRef, useCallback} from 'react';    
import axios from 'axios';    
import { Book } from '../types';  
import styles from '../styles/SearchBook.module.css'  
import ReactPaginate from 'react-paginate'; 


const SearchBook = () => {    
  const [title, setTitle] = useState('');    
  const [author, setAuthor] = useState('');    
  const [books, setBooks] = useState<Book[]>([]);    
  const [searchTerm, setSearchTerm] = useState<{title: string, author: string}>({title: '', author: ''});  
  const [currentPage, setCurrentPage] = useState(0);    
  const [totalPages, setTotalPages] = useState(0); 


  const fetchBooks = useCallback(async (page = 1) => {        
    try {        
      const result = await axios.get(`http://localhost:8080/frappe_library/api/v1/books/search-book/?title=${searchTerm.title}&author=${searchTerm.author}&page=${page}`);      
      setBooks(result.data.data);    
      setTotalPages(result.data.total_pages);  
      setCurrentPage(result.data.current_page);  
    } catch (error) {        
      console.error('Error fetching data', error);        
    }        
  }, [searchTerm]); // Adding searchTerm as a dependency  
  

  useEffect(() => {        
    fetchBooks();       
  }, [fetchBooks]);
      
    
    
  const handleSearchClick = () => {  
    setSearchTerm({title, author});  
  }  

  const handleKeyDown = (event: React.KeyboardEvent) => {  
    if(event.key === 'Enter'){  
      handleSearchClick();  
    }  
  }

  const handleButtonClick = (book: Book) => {  
    window.location.href = `/books/issue-book?bookID=${book.bookID}&isbn=${book.isbn}`;  
  };
  
  const changePage = ({ selected }: { selected: number }) => {        
    fetchBooks(selected + 1);    
  };

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
          <button className={styles.availableButton} onClick={() => handleButtonClick(book)}>Issue Book</button> :   
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
    <ReactPaginate       
            previousLabel={"Previous"}      
            nextLabel={"Next"}      
            pageCount={totalPages}      
            onPageChange={changePage}      
            containerClassName={styles.paginationButtons}      
            previousClassName={styles.previousButton}      
            nextClassName={styles.nextButton}      
            disabledClassName={styles.paginationDisabled}      
            activeClassName={styles.paginationActive}      
      />    
    </div>   
  );    
};    
    
export default SearchBook;    
