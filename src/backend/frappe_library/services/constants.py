from frappe_library.services.database.connections import get_db_connection_url

FRAPPE_API="https://frappe.io/api/method/frappe-library"
DATABASE_URL = get_db_connection_url()
DEFAULT_PAGINATION_OFFSET=10