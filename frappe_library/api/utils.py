from datetime import datetime, timezone
from uuid import UUID

from frappe_library.services.database.connections import engine
from frappe_library.services.database.models import IssueHistory
from sqlmodel import Session, select


class IssueHistoryParser:
    def get_instance_objs(list_of_instances: list):
        instance_objs = []
        for instance in list_of_instances:
            issue_history, book, member = instance
            instance_objs.append(
                {
                    "issue_history": issue_history.__dict__,
                    "book": book.__dict__,
                    "member": member.__dict__,
                }
            )

            for obj in instance_objs[-1].values():
                obj.pop("_sa_instance_state", None)

        return instance_objs


class BooksParser:
    def get_instance_objs(list_of_instances: list):
        instance_objs = []
        for instance in list_of_instances:
            instance_obj = instance.__dict__
            instance_obj.pop(
                "_sa_instance_state", None
            )  # remove SQLAlchemy's internal attribute
            instance_objs.append(instance_obj)
        return instance_objs


class MemberParser:
    def get_instance_objs(list_of_instances: list):
        instance_objs = []
        for instance in list_of_instances:
            instance_obj = instance.__dict__
            instance_obj.pop(
                "_sa_instance_state", None
            )  # remove SQLAlchemy's internal attribute
            instance_objs.append(instance_obj)
        return instance_objs
