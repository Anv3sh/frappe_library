import React from 'react'; 
import MembersList from '../components/MembersList';
import '../styles/globals.css';
import Navbar from '../components/Navbar';
// import other page components here  



export default function Members(){  
  return (  
    <main>
      <Navbar></Navbar>
      <MembersList></MembersList>
    </main>
  );
}  