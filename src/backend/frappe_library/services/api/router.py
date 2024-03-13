from flask import Blueprint, url_for

base_bp = Blueprint("base", __name__, url_prefix="/frappe_library/api/v1/")

test_bp = Blueprint("test", __name__, url_prefix="/test")
books_bp = Blueprint("books", __name__, url_prefix="/books")
members_bp = Blueprint("members", __name__, url_prefix="/member")

base_bp.register_blueprint(test_bp)
base_bp.register_blueprint(books_bp)
base_bp.register_blueprint(members_bp)
