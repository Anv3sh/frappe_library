'use client';
import React, { useState } from 'react';      
import Link from 'next/link';    
import Image from 'next/image';   
  
const bookItems = [  
  { href: "/books", title: "Available Books" },  
  { href: "/books/search-book", title: "Search Books" },    
  { href: "/books/issue-book", title: "Issue Book" },  
  { href: "/books/issued-books", title: "Issued Books" },  
  { href: "/books/import-books", title: "Import Books" }  
];    
  
const memberItems = [  
  { href: "/member/register-member", title: "Register Member" }  
];    
  
export default function Navbar() {      
  const [bookOpen, setBookOpen] = useState(false);  
  const [memberOpen, setMemberOpen] = useState(false);  
  
  const toggleBookOpen = () => {  
    setBookOpen(!bookOpen);  
    if (memberOpen) setMemberOpen(false);  
  };  
  
  const toggleMemberOpen = () => {  
    setMemberOpen(!memberOpen);  
    if (bookOpen) setBookOpen(false);  
  };  
  
  return (      
    <nav className="flex items-center justify-between p-8 bg-blue-500 shadow-2xl">    
      <div className="h-8 w-auto mb-5"> 
      <Link href="/">   
        <Image src="/frappe_library.png" alt="logo"  width={64} height={32} layout="fixed"/>
        </Link>        
      </div>    
      <ul className="flex space-x-4 justify-center flex-grow items-center">      
        <li className="group relative">  
          <button onClick={toggleBookOpen} className="text-white hover:text-blue-200 text-lg cursor-pointer flex items-center">  
            Books {bookOpen ? <span>&#9650;</span> : <span>&#9660;</span>}  
          </button>  
          {bookOpen && (  
            <ul className="absolute left-0 mt-2 p-2 space-y-2 bg-white text-black rounded shadow-lg transition ease-out duration-500">  
              {bookItems.map(item => (  
                <li key={item.href}>  
                  <Link href={item.href}>  
                    <h1 className="block py-1 px-3 text-black hover:bg-blue-500 hover:text-white rounded">{item.title}</h1>  
                  </Link>  
                </li>  
              ))}  
            </ul>  
          )}  
        </li>  
        <li className="group relative">  
          <button onClick={toggleMemberOpen} className="text-white hover:text-blue-200 text-lg cursor-pointer flex items-center">  
            Members {memberOpen ? <span>&#9650;</span> : <span>&#9660;</span>}  
          </button>  
          {memberOpen && (  
            <ul className="absolute left-0 mt-2 p-2 space-y-2 bg-white text-black rounded shadow-lg transition ease-out duration-500">  
              {memberItems.map(item => (  
                <li key={item.href}>  
                  <Link href={item.href}>  
                    <h1 className="block py-1 px-3 text-black hover:bg-blue-500 hover:text-white rounded">{item.title}</h1>  
                  </Link>  
                </li>  
              ))}  
            </ul>  
          )}  
        </li>  
      </ul>      
    </nav>      
  );      
}    
