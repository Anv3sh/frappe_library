export type Book = {      
    bookID: number;      
    title: string;      
    authors: string;    
    isbn: string;    
    language_code: string;    
    ratings_count: number;    
    publication_date: string;    
    is_available: boolean;    
    average_rating: string;    
    isbn13: string;    
    num_pages: number;    
    text_reviews_count: number;    
    publisher: string;    
    added_at: string;    
  }; 

  export type IssueHistory = {  
    book_id: string;  
    id: string;  
    is_returned: boolean;  
    member_id: string;  
    issued_on: string;  
    rent: string;  
  }; 
    
export type Member = {  
    last_name: string;  
    first_name: string;  
    created_at: string;  
    member_id: string;  
    email: string;  
    updated_at: string;
    on_debt: boolean;
  };
    
export type IssuedBook = {  
    issue_history: IssueHistory;  
    book: Book;  
    member: Member;  
  };
  