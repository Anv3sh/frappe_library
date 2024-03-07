from flask import Flask, Blueprint
from frappe_library.services.api.router import base_bp, test_bp
import frappe_library.services.api.endpoints
from frappe_library.services.database.connections import get_db_connection_url
from frappe_library.services.database.manager import DatabaseManager
  
DATABASE_URL = get_db_connection_url()  
  
def initialize_database(app):  
    db_manager = DatabaseManager(DATABASE_URL)
    db_manager.run_migrations()  
    db_manager.create_db_and_tables()  
  
def create_app():  
    app = Flask(__name__)  
    app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URL  
  
    initialize_database(app)  
   
    app.register_blueprint(base_bp)  
  
    return app  
  
app = create_app()  
  
if __name__ == "__main__":  
    app.run(debug=True)  
