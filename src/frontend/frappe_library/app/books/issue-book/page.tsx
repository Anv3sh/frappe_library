'use client';
import React from 'react'; 
import IssueBook from '../../components/IssueBook';
import '../../styles/globals.css';
import Navbar from '../../components/Navbar';
// import other page components here  



export default function IssueBookPage(){  
  return (  
    <main>
      <Navbar></Navbar>
      <IssueBook></IssueBook>
    </main>
  );
}  