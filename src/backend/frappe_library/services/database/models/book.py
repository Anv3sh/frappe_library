from frappe_library.services.database.models.base import SQLModelSerializable
from datetime import datetime, timezone, date
from typing import TYPE_CHECKING, List, Optional
from uuid import UUID, uuid4
import sqlalchemy as sa
from pydantic import EmailStr
from sqlmodel import Field, Relationship, SQLModel

if TYPE_CHECKING:
    from frappe_library.services.database.models.member import Member
    from frappe_library.services.database.models.rent_history import RentHistory

class Book(SQLModelSerializable, table=True):
    __tablename__ = "book"
    book_id: UUID = Field(default_factory=uuid4, primary_key=True, unique=True)
    name: str = Field(nullable=False)
    authors: str = Field(nullable=False)
    average_rating: int = Field(nullable=False)
    isbn: str = Field(nullable=False)
    isbn13: str = Field(nullable=False)
    language_code: str = Field(nullable=False)  
    num_pages: int = Field(nullable=False)  
    ratings_count: int = Field(nullable=False)  
    text_reviews_count: int = Field(nullable=False)  
    publication_date: date = Field(nullable=False)  
    publisher: str = Field(nullable=False)
    added_at: Optional[datetime] = Field(
        sa_column=sa.Column(sa.DateTime(timezone=True), nullable=False),
        default_factory=lambda: datetime.utcnow().replace(tzinfo=timezone.utc),
    )
    member: "RentHistory" = Relationship(back_populates="books")