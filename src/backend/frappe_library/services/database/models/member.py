from frappe_library.services.database.models.base import SQLModelSerializable
from datetime import datetime, timezone
from typing import TYPE_CHECKING, List, Optional
from uuid import UUID, uuid4
from sqlalchemy.sql.sqltypes import Date, Integer, Float 
import sqlalchemy as sa
from pydantic import EmailStr
from sqlmodel import Field, Relationship, SQLModel

if TYPE_CHECKING:
    from frappe_library.services.database.models.book import Book
    from frappe_library.services.database.models.issue_history import IssueHistory

class Member(SQLModelSerializable, table=True):
    __tablename__="member"
    member_id: UUID = Field(default_factory=uuid4, primary_key=True, unique=True)
    first_name: str
    last_name: str
    email: str = Field(unique=True)
    created_at: Optional[datetime] = Field(
        sa_column=sa.Column(sa.DateTime(timezone=True), nullable=False),
        default_factory=lambda: datetime.utcnow().replace(tzinfo=timezone.utc),
    )
    updated_at: Optional[datetime] = Field(
        sa_column=sa.Column(sa.DateTime(timezone=True), nullable=False),
        default_factory=lambda: datetime.utcnow().replace(tzinfo=timezone.utc),
    )
    issue_history: List["IssueHistory"] = Relationship(back_populates="member")