'use client'
import React from 'react'; 
import ImportBooks from '../../components/ImportBooks';
import '../../styles/globals.css';
import Navbar from '../../components/Navbar';
// import other page components here  



export default function ImportBooksPage(){  
  return (  
    <main>
      <Navbar></Navbar>
      <ImportBooks></ImportBooks>
    </main>
  );
}  