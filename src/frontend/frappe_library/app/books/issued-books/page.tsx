import React from 'react'; 
import IssuedBooks from '../../components/IssuedBooks';
import '../../styles/globals.css';
import Navbar from '../../components/Navbar';
// import other page components here  



export default function IssuedBooksPage(){  
  return (  
    <main>
      <Navbar></Navbar>
      <IssuedBooks></IssuedBooks>
    </main>
  );
}  