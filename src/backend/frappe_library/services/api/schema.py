from pydantic import BaseModel, Field, EmailStr, validator
from typing import List, Optional  
from uuid import UUID,uuid4  
from datetime import datetime  


class BookSchema(BaseModel):
    bookID: int
    title: str  
    authors: str  
    isbn: str  
    isbn13: str  
    average_rating: float  
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
    charge_per_day:int
    return_before: datetime
    
    @validator('return_before', pre=True)  
    def convert_epoch_to_datetime(cls, value):  
        return datetime.fromtimestamp(value) 

class ReturnBookSchema(BaseModel):
    id:UUID