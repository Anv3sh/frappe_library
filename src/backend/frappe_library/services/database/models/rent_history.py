from frappe_library.services.database.models.base import SQLModelSerializable
from datetime import datetime, timezone
from typing import TYPE_CHECKING, List, Optional
from uuid import UUID, uuid4
from sqlalchemy.sql.sqltypes import Date, Integer, Float 
import sqlalchemy as sa

from sqlmodel import Field, Relationship, SQLModel

if TYPE_CHECKING:
    from frappe_library.services.database.models.member import Member
    from frappe_library.services.database.models.book import Book
    

class RentHistory(SQLModelSerializable,table=True):
    __tablename__="rent_history"
    id: UUID = Field(default_factory=uuid4, primary_key=True, unique=True)
    member_id: UUID = Field(default=None, foreign_key="member.member_id")
    book_id: UUID = Field(default=None, foreign_key="book.book_id")
    member: "Member" = Relationship(back_populates="books")
    book: "Book" = Relationship(back_populates="member")
    issued_at: Optional[datetime] = Field(
        sa_column=sa.Column(sa.DateTime(timezone=True), nullable=False),
        default_factory=lambda: datetime.utcnow().replace(tzinfo=timezone.utc),
    )
    due_at: Optional[datetime] = Field(nullable=False)
    charge_per_day_in_inr: int = Field(nullable=False)