import os
from fastapi import Request, HTTPException, status, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import jwt

security = HTTPBearer()

async def verify_jwt(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    print(token)
    
    try:
        decoded = jwt.decode(token, 'to97ke21ns21e3214cret', algorithms=["HS256"])
        user = decoded['UserInfo']['username']
        roles = decoded['UserInfo']['roles']
        id = decoded['UserInfo']['id']
        print(id)
        return {"user": user, "roles": roles, "id": id}
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Invalid token")
