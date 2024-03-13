import logging
from pathlib import Path

from alembic import command
from alembic.config import Config
from frappe_library.services.database.models import Book, IssueHistory, Member
from sqlmodel import Session, SQLModel, create_engine

logger = logging.getLogger(__name__)


class DatabaseManager:
    def __init__(self, database_url: str):
        self.database_url = database_url
        backend_dir = Path(__file__).parent.parent.parent
        # self.script_location = backend_dir / "alembic"
        # self.alembic_cfg_path = backend_dir / "alembic.ini"
        self.engine = create_engine(database_url)  # noqa

    def __enter__(self):
        self._session = Session(self.engine)
        return self._session

    def __exit__(self, exc_type, exc_value, traceback):
        if exc_type is not None:  # If an exception has been raised
            print(
                f"Session rollback because of exception: {exc_type.__name__} {exc_value}"  # noqa
            )
            self._session.rollback()
        else:
            self._session.commit()
        self._session.close()

    def get_session(self):
        with Session(self.engine) as session:
            yield session

    def create_db_and_tables(self):
        logger.info("Creating database and tables")
        try:
            SQLModel.metadata.create_all(self.engine)
            # for table in to_be_created_tables:
            #     SQLModel.metadata.tables[table].create(self.engine)
        except Exception as exc:
            print(f"Error creating database and tables: {exc}")
            raise RuntimeError("Error creating database and tables") from exc

        from sqlalchemy import inspect

        inspector = inspect(self.engine)
        required_tables = [
            "book",
            "member",
            "issue_history",
        ]
        for table in inspector.get_table_names():
            if table not in required_tables:
                logger.info("Something went wrong creating the database and tables.")
                logger.info("Please check your database settings.")
                raise RuntimeError(
                    "Something went wrong creating the database and tables."
                )

        else:
            logger.info("Database and tables created successfully")
        logger.info(inspector.get_table_names())
