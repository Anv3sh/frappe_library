import React from 'react'; 
import RegisterMember from '../../components/RegisterMember';
import '../../styles/globals.css';
import Navbar from '../../components/Navbar';

// import other page components here  



export default function Register(){  
  return (  
    <main>
      <Navbar></Navbar>
      <RegisterMember></RegisterMember>
    </main>
  );
}  