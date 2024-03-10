from frappe_library.services.database.models.base import SQLModelSerializable
from datetime import datetime, timezone, date
from typing import TYPE_CHECKING, List, Optional
from uuid import UUID, uuid4
import sqlalchemy as sa
from pydantic import EmailStr
from sqlmodel import Field, Relationship, SQLModel

if TYPE_CHECKING:
    from frappe_library.services.database.models.member import Member
    from frappe_library.services.database.models.issue_history import IssueHistory

class Book(SQLModelSerializable, table=True):
    __tablename__ = "book"
    id: UUID = Field(default_factory=uuid4, primary_key=True, unique=True)
    bookID: int = Field(nullable=False)
    title: str = Field(nullable=False)
    authors: str = Field(nullable=False)
    average_rating: int = Field(nullable=False)
    isbn: str = Field(nullable=False)
    isbn13: str = Field(nullable=False)
    language_code: str = Field(nullable=False)  
    num_pages: int = Field(nullable=False)  
    ratings_count: int = Field(nullable=False)  
    text_reviews_count: int = Field(nullable=False)  
    publication_date: str = Field(nullable=False)  
    publisher: str = Field(nullable=False)
    is_available: bool = Field(default=True)
    added_at: Optional[datetime] = Field(
        sa_column=sa.Column(sa.DateTime(timezone=True), nullable=False),
        default_factory=lambda: datetime.utcnow().replace(tzinfo=timezone.utc),
    )
    issue_history: List["IssueHistory"] = Relationship(back_populates="book")  