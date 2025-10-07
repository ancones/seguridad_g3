from fastapi import Depends, HTTPException, status
from typing import List
from middleware.verify_jwt import verify_jwt

# Example roles list
ROLES_LIST = {
    "Admin": 5150,
    "Editor": 1984,
    "User": 2001
}

def verify_roles(*allowed_roles: str):
    def role_checker(user_info=Depends(verify_jwt)):
        user_roles = user_info.get("roles", [])
        print("Roles User:", user_roles)
        print("Roles Resource:", allowed_roles)
        if not any(role in allowed_roles for role in user_roles):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You do not have permission to perform this action"
            )
        return user_info
    return role_checker
