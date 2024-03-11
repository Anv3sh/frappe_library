from pydantic import BaseModel, Field, EmailStr, validator
from typing import List, Optional  
from uuid import UUID,uuid4  
from datetime import datetime  
from decimal import Decimal

class BookSchema(BaseModel):
    bookID: int
    title: str  
    authors: str  
    isbn: str  
    isbn13: str  
    average_rating: Decimal 
    language_code: str  
    num_pages: int  
    ratings_count: int  
    text_reviews_count: int  
    publication_date: str  
    publisher: str  
    
    
class MemberSchema(BaseModel): 
    first_name: str  
    last_name: str  
    email: EmailStr
  
  
class IssueBookSchema(BaseModel):
    first_name:str
    last_name:str
    email:EmailStr
    bookID:int
    isbn:str
    rent:Decimal


class ReturnBookSchema(BaseModel):
    id:UUID
    
    
class SearchBook(BaseModel):
    title: Optional[str] = None
    author: Optional[str] = None