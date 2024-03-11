from frappe_library.services.database.models.base import SQLModelSerializable
from datetime import datetime, timezone
from typing import TYPE_CHECKING, List, Optional
from uuid import UUID, uuid4
from decimal import Decimal
import sqlalchemy as sa

from sqlmodel import Field, Relationship, SQLModel

if TYPE_CHECKING:
    from frappe_library.services.database.models.member import Member
    from frappe_library.services.database.models.book import Book
    

class IssueHistory(SQLModelSerializable,table=True):
    __tablename__="issue_history"
    id: UUID = Field(default_factory=uuid4, primary_key=True, unique=True)
    member_id: UUID = Field(default=None, foreign_key="member.member_id")
    book_id: UUID = Field(default=None, foreign_key="book.id")
    member: "Member" = Relationship(back_populates="issue_history")  
    book: "Book" = Relationship(back_populates="issue_history")  
    issued_on: Optional[datetime] = Field(
        sa_column=sa.Column(sa.DateTime(timezone=True), nullable=False),
        default_factory=lambda: datetime.utcnow().replace(tzinfo=timezone.utc),
    )
    is_returned: bool = Field(default=False)
    rent: Decimal = Field(nullable=False)