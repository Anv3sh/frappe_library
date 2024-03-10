import json  
import uuid  
from datetime import datetime  

class CustomEncoder(json.JSONEncoder):  
    def default(self, obj):  
        if isinstance(obj, uuid.UUID):  
            return str(obj)  
        if isinstance(obj, datetime):   
            return obj.isoformat()  
        return super().default(obj) 