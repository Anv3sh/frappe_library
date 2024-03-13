import React, { useState, useEffect } from 'react';  
import axios, {AxiosError} from 'axios';  
import styles from '../styles/RegisterMember.module.css';  
  
interface ErrorResponse {  
    detail: string;  
}  
  
const IssueBook = () => {  
    const [firstName, setFirstName] = useState("");  
    const [lastName, setLastName] = useState("");  
    const [email, setEmail] = useState("");  
    const [bookID, setBookID] = useState("");  
    const [isbn, setIsbn] = useState("");  
    const [rent, setRent] = useState("");  
    const [message, setMessage] = useState("");  
    useEffect(() => {  
        const params = new URLSearchParams(window.location.search);  
        const bookID = params.get('bookID');  
        const isbn = params.get('isbn');  
        setBookID(bookID || '');  
        setIsbn(isbn || '');  
      }, []);  
      
      const issueBook = async () => {  
        if (!firstName) {  
            setMessage("First Name is required!");  
            return;  
        }  
        if (!lastName) {  
            setMessage("Last Name is required!");  
            return;  
        }  
        if (!email) {  
            setMessage("Email is required!");  
            return;  
        }  
        if (!bookID) {  
            setMessage("Book ID is required!");  
            return;  
        }  
        if (!isbn) {  
            setMessage("ISBN is required!");  
            return;  
        }  
        if (!rent) {  
            setMessage("Rent is required!");  
            return;  
        }  
          
        try {    
            const response = await axios.post('http://localhost:8080/frappe_library/api/v1/books/issue-book/', {    
                first_name: firstName,    
                last_name: lastName,    
                email: email,    
                bookID: Number(bookID),    
                isbn: isbn,    
                rent: Number(rent)    
            });    
      
            if (response.status === 200) {    
                setMessage(response.data.detail);    
            }    
        } catch (error: unknown) {    
            if (axios.isAxiosError(error)) {    
                const serverError = error as AxiosError<ErrorResponse>;    
                if (serverError && serverError.response) {    
                    setMessage(serverError.response.data.detail);    
                }    
            } else {    
                setMessage("Issue book operation failed. Please try again.");    
            }    
        }    
    };  
  
    return (  
        <div className={styles.registermember}>  
            <h1>Issue Book</h1>  
  
            <input  
                type="text"  
                placeholder="First Name"  
                value={firstName}  
                onChange={e => setFirstName(e.target.value)}  
            />  
            <input  
                type="text"  
                placeholder="Last Name"  
                value={lastName}  
                onChange={e => setLastName(e.target.value)}  
            />  
            <input  
                type="email"  
                placeholder="Email"  
                value={email}  
                onChange={e => setEmail(e.target.value)}  
            />  
            <input  
                type="text"  
                placeholder="Book ID"  
                value={bookID}  
                onChange={e => setBookID(e.target.value)}  
            />  
            <input  
                type="text"  
                placeholder="ISBN"  
                value={isbn}  
                onChange={e => setIsbn(e.target.value)}  
            />  
            <input  
                type="text"  
                placeholder="Rent"  
                value={rent}  
                onChange={e => setRent(e.target.value)}  
            />  
  
            <button onClick={issueBook}>Issue Book</button>  
            {message && <div className={styles.message}>{message}</div>}  
        </div>  
    );  
};  
  
export default IssueBook;  
