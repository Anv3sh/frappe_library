import os
from flask import Blueprint, Flask
from flask_cors import CORS
from frappe_library.api.endpoints import *
from frappe_library.api.router import base_bp
from frappe_library.services.constants import DATABASE_URL
from frappe_library.services.custom_commands import create_db_command


class FrappeAppFactory:
    def __init__(self):
        self._app = Flask(__name__)
        self._app.config["SQLALCHEMY_DATABASE_URI"] = DATABASE_URL
        if os.getenv("PROD") != "True":
            self.app.config["DEBUG"] = True
        CORS(self.app)

    def register_utilities(self):
        self._app.cli.add_command(create_db_command)
        self._app.register_blueprint(base_bp)

    @property
    def app(self):
        return self._app


frappe_app_factory = FrappeAppFactory()
frappe_app_factory.register_utilities()
app = frappe_app_factory.app
for rule in app.url_map.iter_rules():
    print(rule)

if __name__ == "__main__":
    app.run(debug=True)
