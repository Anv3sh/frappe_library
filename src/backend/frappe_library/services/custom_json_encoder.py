import json  
import uuid  
from datetime import datetime  
from decimal import Decimal
class CustomEncoder(json.JSONEncoder):  
    def default(self, obj):  
        if isinstance(obj, uuid.UUID):  
            return str(obj)  
        if isinstance(obj, datetime):   
            return obj.isoformat()
        if isinstance(obj, Decimal):
            return str(obj)
        return super().default(obj) 