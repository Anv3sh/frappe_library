'use client';
import React, { useState } from 'react';  
import axios, {AxiosError} from 'axios';  
import styles from '../styles/RegisterMember.module.css'

interface ErrorResponse {  
    detail: string;  
}

const RegisterMember = () => {  
    const [firstName, setFirstName] = useState("");  
    const [lastName, setLastName] = useState("");  
    const [email, setEmail] = useState("");  
    const [message, setMessage] = useState("");

    const registerMember = async () => {  
        try {  
            const response = await axios.post('http://localhost:8080/frappe_library/api/v1/member/register-member/', {  
                first_name: firstName,  
                last_name: lastName,  
                email: email  
            });  
  
            if (response.status === 200) {  
                setMessage(response.data.detail);  
            }  
        } catch (error: unknown) {  
            if (axios.isAxiosError(error)) {  
                const serverError = error as AxiosError<ErrorResponse>;  
                if (serverError.response) {  
                    setMessage(serverError.response.data.detail);  
                }  
            } else {  
                setMessage("Registration failed. Please try again.");  
            }  
        }  
    };   
  
    return (  
        <div className={styles.registermember}>  
            <h1>Register Member</h1>  
  
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
  
            <button onClick={registerMember}>Register</button>  
            {message && <p>{message}</p>}
        </div>  
    );  
};  
  
export default RegisterMember;  
