import json
import math
import os
from datetime import datetime, timezone

import requests
from flask import Response, request
from frappe_library.services.api.router import books_bp, members_bp, test_bp
from frappe_library.services.api.schema import (
    BookSchema,
    ImportBookSchema,
    IssueBookSchema,
    MemberSchema,
    ReturnBookSchema,
    SearchBook,
)
from frappe_library.services.api.utils import (
    BooksParser,
    IssueHistoryParser,
)
from frappe_library.services.constants import (
    BACKEND_BASE_ROUTE,
    DEFAULT_FRAPPE_API_PAGE_OFFSET,
    DEFAULT_PAGINATION_OFFSET,
    FRAPPE_API,
)
from frappe_library.services.custom_json_encoder import CustomEncoder
from frappe_library.services.database.connections import engine
from frappe_library.services.database.models import Book, IssueHistory, Member
from frappe_library.services.logger import frappe_logger
from pydantic import ValidationError
from sqlalchemy import func
from sqlalchemy.exc import IntegrityError
from sqlmodel import Session, select


@books_bp.route("/import-books/", methods=["POST"])
def import_books():
    try:
        validated_data = ImportBookSchema(**request.get_json())
    except ValidationError as e:
        frappe_logger.error(str(e))
        return Response(str(e), status=400, mimetype="application/json")

    try:
        payload_json = {
            "title": validated_data.title,
            "authors": validated_data.authors,
            "publisher": validated_data.publisher,
        }
        number_of_books = validated_data.number_of_books
        pages = number_of_books // DEFAULT_FRAPPE_API_PAGE_OFFSET
        remaining = number_of_books % DEFAULT_FRAPPE_API_PAGE_OFFSET
        book_objects = []
        for page in range(1, pages + 1):
            payload_json.update({"page": page})
            resp = requests.get(f"https://{FRAPPE_API}", params={**payload_json})
            book_objects.extend(resp.json().get("message"))
        if remaining:
            payload_json.update({"page": pages + 1})
            resp = requests.get(f"https://{FRAPPE_API}", params={**payload_json})
            if resp:
                book_objects.extend(resp.json().get("message")[0:remaining])
        for book in book_objects:
            if "  num_pages" in book:
                book["num_pages"] = book.pop("  num_pages")
        with Session(engine) as session:
            for book in book_objects:
                validated_data = BookSchema(**book)
                book_instance = Book(**validated_data.model_dump())
                session.add(book_instance)
            session.commit()

        return Response(
            json.dumps({"detail": "Books imported"}),
            status=201,
            mimetype="application/json",
        )

    except Exception as e:
        frappe_logger.error(f"Exception occurred while importing books: {e}")
        return Response(
            json.dumps({"detail": f"A server error occurred while importing books."}),
            status=500,
            mimetype="application/json",
        )


@members_bp.route("/register-member/", methods=["POST"])
def register_member():
    try:
        validated_member = MemberSchema(**request.get_json())
    except ValidationError as e:
        frappe_logger.error(str(e))
        return Response(
            json.dumps({"detail": "Wrong email entered!"}),
            status=400,
            mimetype="application/json",
        )
    try:
        with Session(engine) as session:
            if session.exec(
                select(Member).where(Member.email == validated_member.email)
            ).first():
                return Response(
                    json.dumps({"detail": "Email already registered"}),
                    status=400,
                    mimetype="application/json",
                )
            member = Member(**validated_member.model_dump())
            session.add(member)
            session.commit()
    except Exception as e:
        frappe_logger.error(f"Exception occurred while registering member: {e}")
        return Response(
            json.dumps({"detail": "Member registration failed"}),
            status=400,
            mimetype="application/json",
        )
    return Response(
        json.dumps({"detail": "Member registered successfully."}),
        status=200,
        mimetype="application/json",
    )


@books_bp.route("/issue-book/", methods=["POST"])
def issue_book_to_member():
    try:
        validated_data = IssueBookSchema(**request.get_json())
    except ValidationError as e:
        frappe_logger.error(e)
        return Response(e, status=400, mimetype="application/json")
    try:
        with Session(engine) as session:
            if (
                member := session.exec(
                    select(Member).where(Member.email == validated_data.email)
                ).first()
            ) and (
                book := session.exec(
                    select(Book).where(
                        Book.bookID == validated_data.bookID, Book.is_available == True
                    )
                ).first()
            ):
                if member.calculate_debt(session) >= 500:
                    return Response(
                        json.dumps({"detail": "Member debt greater than 500."}),
                        status=400,
                        mimetype="application/json",
                    )
                issuehistory = IssueHistory(
                    member_id=member.member_id,
                    book_id=book.id,
                    rent=validated_data.rent,
                )
                book.is_available = False
                session.add(issuehistory)
                session.add(book)
                session.commit()
            else:
                return Response(
                    json.dumps({"detail": "Wrong member email or book id."}),
                    status=400,
                    mimetype="application/json",
                )
        return Response(
            json.dumps({"detail": "Book Issued successfully."}),
            status=200,
            mimetype="application/json",
        )
    except Exception as e:
        frappe_logger.error(f"Exception occurred while issuing book: {e}")
        return Response(
            json.dumps({"detail": "Book was not able to be issued."}),
            status=400,
            mimetype="application/json",
        )


@books_bp.route("/issued-books/", methods=["GET"])
def issue_history():
    try:
        page = request.args.get("page", 1, type=int)
        with Session(engine) as session:
            total_books_count = session.exec(
                select(
                    func.count(IssueHistory.id).filter(
                        IssueHistory.is_returned == False
                    )
                )
            ).one()

            total_pages = math.ceil(total_books_count / DEFAULT_PAGINATION_OFFSET)

            stmt = (
                select(IssueHistory, Book, Member)
                .join(Book, Book.id == IssueHistory.book_id)
                .join(Member, Member.member_id == IssueHistory.member_id)
                .where(IssueHistory.is_returned == False)
                .offset((page - 1) * DEFAULT_PAGINATION_OFFSET)
                .limit(DEFAULT_PAGINATION_OFFSET)
            )
            issued_books = session.exec(stmt).fetchall()
            issued_books_objs = IssueHistoryParser.get_instance_objs(issued_books)

            next_page_url = None
            if page < total_pages:
                next_page_url = (
                    f"{BACKEND_BASE_ROUTE}/books/issued-books/?page={page + 1}"
                )

        response_data = {
            "data": issued_books_objs,
            "total_pages": total_pages,
            "current_page": page,
            "next_page_url": next_page_url,
        }
        return Response(
            json.dumps(response_data, cls=CustomEncoder),
            status=200,
            mimetype="application/json",
        )
    except Exception as e:
        frappe_logger.error(f"Exception occurred due to: {e}")
        return Response(
            json.dumps({"detail": "Unable to get issued books list."}),
            status=400,
            mimetype="application/json",
        )


@books_bp.route("/available-books/", methods=["GET"])
def available_books():
    try:
        page = request.args.get("page", 1, type=int)
        with Session(engine) as session:
            total_books_count = session.exec(
                select(func.count(Book.id)).filter(Book.is_available == True)
            ).one()

            total_pages = math.ceil(total_books_count / DEFAULT_PAGINATION_OFFSET)

            stmt = (
                select(Book)
                .where(Book.is_available == True)
                .offset((page - 1) * DEFAULT_PAGINATION_OFFSET)
                .limit(DEFAULT_PAGINATION_OFFSET)
            )
            available_books = session.exec(stmt).fetchall()
            available_books_objs = BooksParser.get_instance_objs(available_books)
            next_page_url = None
            if page < total_pages:
                next_page_url = (
                    f"{BACKEND_BASE_ROUTE}/books/available-books/?page={page + 1}"
                )
        response_data = {
            "data": available_books_objs,
            "total_pages": total_pages,
            "current_page": page,
            "next_page_url": next_page_url,
        }
        return Response(
            json.dumps(response_data, cls=CustomEncoder),
            status=200,
            mimetype="application/json",
        )
    except Exception as e:
        frappe_logger.error(f"Exception occurred due to: {e}")
        return Response(
            json.dumps({"detail": "Unable to get available books list."}),
            status=400,
            mimetype="application/json",
        )


@books_bp.route("/return-book/", methods=["PATCH"])
def return_book():
    try:
        validated_data = ReturnBookSchema(**request.get_json())
    except ValidationError as e:
        frappe_logger.error(e)
        return Response(e, status=400, mimetype="application/json")
    try:
        rent = 0
        with Session(engine) as session:
            issue_history = session.exec(
                select(IssueHistory).where(IssueHistory.id == validated_data.id)
            ).first()
            if issue_history.is_returned == True:
                return Response(
                    json.dumps({"detail": "Book already returned.", "rent": str(rent)}),
                    status=200,
                    mimetype="application/json",
                )
            issue_history.is_returned = True
            book = issue_history.book
            book.is_available = True
            rent = issue_history.rent
            session.add(issue_history)
            session.add(book)
            session.commit()
        return Response(
            json.dumps({"detail": "Book return successfully.", "rent": str(rent)}),
            status=200,
            mimetype="application/json",
        )
    except Exception as e:
        frappe_logger.error(f"Exception occurred due to: {e}")
        return Response(
            json.dumps({"detail": "Unable to return book."}),
            status=400,
            mimetype="application/json",
        )


@books_bp.route("/search-book/", methods=["GET"])
def search_book():
    try:
        title = request.args.get("title")
        author = request.args.get("author")
        validated_data = SearchBook(title=title, author=author)
    except ValidationError as e:
        frappe_logger.error(e)
        return Response(e, status=400, mimetype="application/json")

    try:
        with Session(engine) as session:
            statement = select(Book)
            if validated_data.title:
                statement = statement.filter(
                    Book.title.ilike(f"%{validated_data.title}%")
                )
            if validated_data.author:
                statement = statement.filter(
                    Book.authors.ilike(f"%{validated_data.author}%")
                )
            book = session.exec(statement).all()
            book_objs = BooksParser.get_instance_objs(book)
        return Response(
            json.dumps(book_objs, cls=CustomEncoder),
            status=200,
            mimetype="application/json",
        )
    except Exception as e:
        frappe_logger.error(f"Exception occurred due to: {e}")
        return Response(
            json.dumps({"detail": "Unable to search book."}),
            status=400,
            mimetype="application/json",
        )
