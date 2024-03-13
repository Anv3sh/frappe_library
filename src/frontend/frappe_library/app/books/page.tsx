import React from 'react'; 
import AvailableBooks from '../components/AvailableBooks';
import '../styles/globals.css';
import Navbar from '../components/Navbar';
// import other page components here  



export default function Books(){  
  return (  
    <main>
      <Navbar></Navbar>
      <AvailableBooks></AvailableBooks>
    </main>
  );
}  