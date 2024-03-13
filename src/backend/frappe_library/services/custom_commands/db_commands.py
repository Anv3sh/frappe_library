import click
from flask.cli import with_appcontext
from frappe_library.services.constants import DATABASE_URL
from frappe_library.services.database.connections import get_db_connection_url
from frappe_library.services.database.manager import DatabaseManager


def initialize_database():
    db_manager = DatabaseManager(DATABASE_URL)
    db_manager.create_db_and_tables()


@click.command("create-db")
@with_appcontext
def create_db_command():
    initialize_database()
    click.echo("Database initialized.")
