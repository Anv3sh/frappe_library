import Image from "next/image";  
import Navbar from "./components/Navbar";  
  
export default function Home() {    
  return (    
    <main className="bg-white">    
      <Navbar />   
      <div className="flex flex-col items-center justify-center min-h-screen py-2">  
        <Image src="/frappe_library.png" alt="logo" width={500} height={300} />   
        <h1 className="mt-6 text-3xl font-bold text-gray-800">Welcome to Frappe Library</h1>  
        <p className="mt-2 text-lg text-gray-600">One stop platform to manage your library</p>  
      </div>    
    </main>    
  );    
}  
