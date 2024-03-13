import React from 'react'; 
import SearchBook from '../../components/SearchBook';
import '../../styles/globals.css';
import Navbar from '../../components/Navbar';
// import other page components here  



export default function SearchBooksPage(){  
  return (  
    <main>
      <Navbar></Navbar>
      <SearchBook></SearchBook>
    </main>
  );
}  