'use client';
import React, { useState } from 'react';        
import Link from 'next/link';      
import Image from 'next/image';     
  
const bookItems = [        
  { href: "/books", title: "Search Books" },      
  { href: "/books/issue-book", title: "Issue Book" },    
  { href: "/books/issued-books", title: "Issued Books" },    
  { href: "/books/import-books", title: "Import Books" }    
];      
  
const memberItems = [  
  { href: "/members", title: "Members List" },  
  { href: "/members/register-member", title: "Register Member" }    
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
    <nav className="flex items-center justify-between p-6 bg-blue-500 text-white shadow-lg">      
      <div className="flex items-center">   
        <Link href="/">     
          <Image src="/frappe_library.png" alt="logo"  width={64} height={32} layout="fixed"/>  
        </Link>          
        <h1 className="ml-3 text-2xl font-bold">Frappe Library</h1>  
      </div>      
      <ul className="flex space-x-4 items-center text-lg">        
        <li className="group relative">    
          <button onClick={toggleBookOpen} className="flex items-center space-x-1 hover:text-blue-200 cursor-pointer">    
            <span>Books</span> {bookOpen ? <span>&#9650;</span> : <span>&#9660;</span>}    
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
          <button onClick={toggleMemberOpen} className="flex items-center space-x-1 hover:text-blue-200 cursor-pointer">    
            <span>Members</span> {memberOpen ? <span>&#9650;</span> : <span>&#9660;</span>}    
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
    
