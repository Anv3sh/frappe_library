'use client';
import React, { useState, useEffect, useCallback } from 'react';  
import axios from 'axios';  
import {Book, IssueHistory,IssuedBook, Member} from '../types' 
import styles from '../styles/IssuedBooks.module.css'
import ReactPaginate from 'react-paginate';

const IssuedBooks = () => {  
    const [issuedBooks, setIssuedBooks] = useState<IssuedBook[]>([]);  
    const [totalPages, setTotalPages] = useState(0);  
    const [currentPage, setCurrentPage] = useState(0);  
    
    const getIssuedBooks = useCallback(async (page = 1) => {  
      try {  
        const response = await axios.get(`http://localhost:8080/frappe_library/api/v1/books/issued-books/?page=${page}`);  
        setIssuedBooks(response.data.data);  
        setTotalPages(response.data.total_pages);  
        setCurrentPage(response.data.current_page);  
      } catch (error) {  
        console.error('Error while fetching books:', error);  
      }  
    }, []);  
    
    useEffect(() => {  
      getIssuedBooks();  
    }, [getIssuedBooks]);  
    
    const changePage = ({ selected }: { selected: number }) => {  
      getIssuedBooks(selected + 1);  
    };

    const handleReturnClick = async (id: string) => {  
        if (window.confirm('Are you sure you want to return this book?')) {  
            try {  
                const response = await axios.patch('http://localhost:8080/frappe_library/api/v1/books/return-book/', {  
                    id: id,  
                });  
                window.alert(response.data.detail + ' Rent: ' + response.data.rent);  
                getIssuedBooks(currentPage);  
            } catch (error) {  
                console.error('Error while returning book:', error);  
            }  
        }  
    };

  return (  
    <div>  
      <h1 className={styles.title}>Issued Books</h1>  
      <div className={styles.booksGrid}>  
        {issuedBooks.map((issue:IssuedBook, index) => (  
          <div key={index} className={styles.card}>  
          <button className={styles.returnButton} onClick={() => handleReturnClick(issue.issue_history.id)}>Return</button>
            <h2 className={styles.detailBox}><b>Title: </b>{issue.book.title}</h2> 
              <p className={styles.detailBox}><b>Issued to: </b>{issue.member.first_name} {issue.member.last_name}</p>  
              <p className={styles.detailBox}><b>Issue Date: </b>{issue.issue_history.issued_on}</p>    
              <p className={styles.detailBox}><b>Rent: </b>{issue.issue_history.rent}</p>   
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
        ></ReactPaginate>  
    </div>  
  );  
};  
  
export default IssuedBooks;  
