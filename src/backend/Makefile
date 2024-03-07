install_backend:
	poetry lock
	poetry install

backend:	install_backend
	gunicorn -w 4 -b 127.0.0.1:8080 frappe_library.main:app