import os
import logging
from bson import ObjectId
from fastapi import FastAPI, HTTPException, Depends, Response
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
from .middleware import JWTMiddleware
from .schemas import UserCreate, Token, RefreshTokenRequest
from .models import User
from .auth import AuthJWT, verify_password, hash_password
from .projects import router as projects_router

# Load environment variables
load_dotenv()

app = FastAPI()

# Configure logging
logging.basicConfig(level=logging.DEBUG)

# CORS middleware configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3001"],  # Replace with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize AuthJWT
auth_jwt = AuthJWT()

# Add JWT middleware
app.add_middleware(JWTMiddleware, auth_jwt=auth_jwt)

# Setup authentication scheme
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

# MongoDB connection
client = AsyncIOMotorClient(os.getenv("MONGODB_URI"))
db = client.crm_database  # Replace with your database name

# Include the projects router
app.include_router(projects_router, prefix="/projects")

@app.post("/signup", response_model=User)
async def signup(user: UserCreate):
    logging.debug(f"Signup attempt for email: {user.email}")

    # Validate password confirmation
    if user.password != user.confirm_password:
        logging.warning("Passwords do not match for email: %s", user.email)
        raise HTTPException(status_code=400, detail="Passwords do not match")

    # Check if the email is already registered
    existing_user = await db.users.find_one({"email": user.email})
    if existing_user:
        logging.warning("Email already registered: %s", user.email)
        raise HTTPException(status_code=400, detail="Email already registered")

    # Hash the password and create a new user
    hashed_password = hash_password(user.password)
    new_user = User(
        id=str(ObjectId()),
        username=user.username,
        email=user.email,
        password=hashed_password
    )

    await db.users.insert_one(new_user.dict())
    logging.info("User created successfully: %s", user.email)
    return new_user

@app.post("/login", response_model=Token)
async def login(form_data: OAuth2PasswordRequestForm = Depends(), response: Response = None, Authorize: AuthJWT = Depends()):
    logging.debug(f"Login attempt for email: {form_data.username}")

    # Verify user credentials
    db_user = await db.users.find_one({"email": form_data.username})
    if not db_user or not verify_password(form_data.password, db_user["password"]):
        logging.warning("Invalid credentials for email: %s", form_data.username)
        raise HTTPException(status_code=401, detail="Invalid credentials")

    # Create access and refresh tokens
    access_token = Authorize.create_access_token(subject=db_user["email"])
    refresh_token = Authorize.create_refresh_token(subject=db_user["email"])

    # Set tokens in cookies
    response.set_cookie(key="access_token", value=access_token, httponly=True, max_age=86400)  # 1 day
    response.set_cookie(key="refresh_token", value=refresh_token, httponly=True, max_age=604800)  # 7 days

    logging.info("User logged in successfully: %s", form_data.username)
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "refresh_token": refresh_token
    }

@app.post("/refresh", response_model=Token)
async def refresh_token(request: RefreshTokenRequest, Authorize: AuthJWT = Depends()):
    logging.debug("Token refresh request received")

    try:
        # Validate the refresh token
        Authorize.jwt_required(refresh_token=request.refresh_token)
        current_user = Authorize.get_jwt_subject()
        new_access_token = Authorize.create_access_token(subject=current_user)

        logging.info("Token refreshed successfully for user: %s", current_user)
        return {"access_token": new_access_token, "token_type": "bearer"}

    except Exception as e:
        logging.error("Error during token refresh: %s", str(e))
        raise HTTPException(status_code=401, detail="Invalid refresh token or token expired.")

# Run the application
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True, debug=True)
