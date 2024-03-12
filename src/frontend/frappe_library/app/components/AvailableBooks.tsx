'use client';  
import React, { useEffect, useState, useCallback } from 'react';    
import api from '../api';    
import ReactPaginate from 'react-paginate';  
import styles from '../styles/AvailableBooks.module.css';
import { Book } from '../types';
  
const AvailableBooks = () => {    
  const [books, setBooks] = useState<Book[]>([]);       
  const [totalPages, setTotalPages] = useState(0); // new state for totalPages  
  const [currentPage, setCurrentPage] = useState(0); // new state for currentPage  

  const booksPerPage = 10;  
  
  const getAvailableBooks = useCallback(async (page = 1) => {      
    try {      
      const response = await api.get(`/books/available-books/?page=${page}`);      
      setBooks(response.data.data); // adjust this according to your api response  
      setTotalPages(response.data.total_pages); // set total pages  
      setCurrentPage(response.data.current_page); // set current page  
    } catch (error) {      
      console.error('Error while fetching books:', error);      
    }      
  }, []); // include pageNumber in the useCallback dependencies  

  useEffect(() => {    
      getAvailableBooks();    
  }, [getAvailableBooks]); // include getAvailableBooks in the useEffect dependencies // add pageNumber to the dependency array  
  
  const changePage = ({ selected }: { selected: number }) => {      
    getAvailableBooks(selected + 1);  
  };
    
  const displayBooks = (  
    <div className={styles.booksGrid}>  
      {books.map((book: Book) => (  
        <div key={book.bookID} className={styles.card}>
          {book.is_available ? 
          <button className={styles.availableButton}>Available</button> :   
          <button className={styles.notAvailableButton}>Not Available</button>
          } 
          <h2 className={styles.detailBox}><b>Title: </b>{book.title}</h2>  
          <p className={styles.detailBox}><b>Authors: </b>{book.authors}</p>  
          <p className={styles.detailBox}><b>Reviews Count: </b>{book.ratings_count}</p>  
          <p className={styles.detailBox}><b>Number of pages: </b>{book.num_pages}</p>  
          <p className={styles.detailBox}><b>Average rating: </b>{book.average_rating}</p>  
          <p className={styles.detailBox}><b>Publisher: </b>{book.publisher}</p>  
          <p className={styles.detailBox}><b>Reviews count: </b>{book.text_reviews_count}</p>
          
        </div>  
      ))}  
    </div>  
  );      
  
  return (      
    <div>      
        <h1 className={styles.title}>Available Books</h1>    
        {displayBooks}    
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
      
export default AvailableBooks;  
