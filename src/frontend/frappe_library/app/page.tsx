import Image from "next/image";
import Navbar from "./components/Navbar";

export default function Home() {  
  return (  
    <main>  
      <Navbar /> 
      <div className="flex flex-col items-center justify-center min-h-screen">
      <Image src="/frappe_library.png" alt="logo" width={500} height={300} /> 
      </div>  
    </main>  
  );  
}  

    