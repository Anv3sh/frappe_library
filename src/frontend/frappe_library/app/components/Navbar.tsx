import React from 'react';    
import Link from 'next/link';  
import Image from 'next/image';   
  
const navItems = [  
  { href: "/books", title: "Available Books" },  
  { href: "/member/register-member", title: "Register Member" },  
  { href: "/books/search-book", title: "Search Books" },  
  { href: "/books/issue-book", title: "Issue Book" },
  { href: "/books/issued-books", title: "Issued Books" },
  { href: "/books/import-books", title: "Import Books" }, 
];  
  
export default function Navbar() {    
  return (    
    <nav className="flex items-center justify-between p-8 bg-blue-500 shadow-2xl">  
        <div className="h-8 w-auto mb-5">    
        <Image src="/frappe_library.png" alt="logo"  width={64} height={32} layout="fixed"/>    
      </div>  
      <ul className="flex space-x-4 justify-center flex-grow">    
        {navItems.map(item => (  
          <li key={item.href}>    
            <Link href={item.href}>    
              <h1 className="text-white hover:text-blue-200 text-lg">{item.title}</h1>  
            </Link>    
          </li>  
        ))}  
      </ul>    
    </nav>    
  );    
}  
