from flask import Flask, Blueprint
from frappe_library.services.api.router import base_bp, test_bp
import frappe_library.services.api.endpoints
from frappe_library.services.database.connections import get_db_connection_url
from frappe_library.services.database.manager import DatabaseManager
from flask.cli import with_appcontext  
import click
from frappe_library.services.custom_commands import create_db_command
from frappe_library.services.constants import DATABASE_URL
from flask_cors import CORS
  
class FrappeAppFactory:

    def __init__(self):  
        self._app = Flask(__name__)  
        self._app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URL 
        self.app.config['DEBUG'] = True
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
  
if __name__ == "__main__":  
    app.run(debug=True)
