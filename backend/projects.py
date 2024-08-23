from fastapi import APIRouter, Depends, HTTPException, Request
from bson import ObjectId
from .auth import AuthJWT
from .schemas import ProjectCreate, Project
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import traceback
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()

# MongoDB connection
client = AsyncIOMotorClient(os.getenv("MONGODB_URI"))
db = client.crm_database  # Replace with your database name

@router.post("/", response_model=Project)
async def create_project(request: Request, project: ProjectCreate):
    logging.debug("Received request to create a project.")

    # Get the current user from the request state
    user_identifier = request.state.user
    if not user_identifier:
        raise HTTPException(status_code=401, detail="User not authenticated")

    logging.debug(f"Current user: {user_identifier}")

    new_project = Project(
        id=str(ObjectId()),
        name=project.name,
        category=project.category,
        start_date=project.start_date,
        end_date=project.end_date,
        notification=project.notification,
        task_person=project.task_person,
        budget=project.budget,
        priority=project.priority,
        description=project.description,
        created_by=user_identifier
    )

    await db.projects.insert_one(new_project.dict())
    logging.info(f"Project created successfully by {user_identifier}")
    return new_project

@router.get("/", response_model=list[Project])
async def get_projects(request: Request):
    try:
        # Fetch all projects
        projects = await db.projects.find().to_list(length=None)

        # Convert ObjectId to string for the response
        for project in projects:
            project["id"] = str(project["_id"])  # Convert ObjectId to string
            del project["_id"]  # Remove the original ObjectId field

        logging.info("Projects fetched successfully")
        return projects
    except Exception as e:
        logging.error("Error fetching projects: %s", str(e))
        raise HTTPException(status_code=400, detail=str(e))