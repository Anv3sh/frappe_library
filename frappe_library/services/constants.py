import os

from frappe_library.services.database.connections import get_db_connection_url

FRAPPE_API = "frappe.io/api/method/frappe-library"
DATABASE_URL = get_db_connection_url()
DEFAULT_PAGINATION_OFFSET = 10
DEFAULT_FRAPPE_API_PAGE_OFFSET = 20
BACKEND_BASE_ROUTE = os.getenv("BACKEND_BASE_ROUTE")
