"""
Todo router with CRUD operations and pagination
"""

from fastapi import APIRouter, HTTPException, status, Depends, Query
from datetime import datetime
from bson import ObjectId
from typing import Optional

from app.core import get_database
from app.schemas import TodoCreate, TodoUpdate, TodoResponse, TodosResponse, TodoCategory, TodoPriority
from app.routers.auth import get_current_user

router = APIRouter(prefix="/todos", tags=["Todos"])


@router.get("", response_model=TodosResponse)
async def get_todos(
    skip: int = Query(0, ge=0),
    limit: int = Query(10, ge=1, le=100),
    category: Optional[TodoCategory] = None,
    priority: Optional[TodoPriority] = None,
    completed: Optional[bool] = None,
    current_user: dict = Depends(get_current_user),
):
    """Get todos with pagination and optional filters"""
    db = get_database()
    
    # Build filter query
    query = {"user_id": str(current_user["_id"])}
    
    if category:
        query["category"] = category
    if priority:
        query["priority"] = priority
    if completed is not None:
        query["completed"] = completed
    
    # Get total count
    total = await db.todos.count_documents(query)
    
    # Get todos with pagination
    cursor = db.todos.find(query).sort("created_at", -1).skip(skip).limit(limit)
    todos = await cursor.to_list(length=limit)
    
    # Convert to response models
    todo_responses = [
        TodoResponse(
            id=str(todo["_id"]),
            title=todo["title"],
            description=todo.get("description"),
            completed=todo["completed"],
            category=todo["category"],
            priority=todo["priority"],
            due_date=todo.get("due_date"),
            user_id=todo["user_id"],
            created_at=todo["created_at"],
            updated_at=todo["updated_at"],
        )
        for todo in todos
    ]
    
    return TodosResponse(
        todos=todo_responses,
        total=total,
        skip=skip,
        limit=limit,
    )


@router.post("", response_model=TodoResponse, status_code=status.HTTP_201_CREATED)
async def create_todo(
    todo_data: TodoCreate,
    current_user: dict = Depends(get_current_user),
):
    """Create a new todo"""
    db = get_database()
    
    # Create todo document
    todo_doc = {
        "title": todo_data.title,
        "description": todo_data.description,
        "completed": False,
        "category": todo_data.category,
        "priority": todo_data.priority,
        "due_date": todo_data.due_date,
        "user_id": str(current_user["_id"]),
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow(),
    }
    
    # Insert todo
    result = await db.todos.insert_one(todo_doc)
    todo_doc["_id"] = result.inserted_id
    
    return TodoResponse(
        id=str(todo_doc["_id"]),
        title=todo_doc["title"],
        description=todo_doc["description"],
        completed=todo_doc["completed"],
        category=todo_doc["category"],
        priority=todo_doc["priority"],
        due_date=todo_doc["due_date"],
        user_id=todo_doc["user_id"],
        created_at=todo_doc["created_at"],
        updated_at=todo_doc["updated_at"],
    )


@router.get("/{todo_id}", response_model=TodoResponse)
async def get_todo(
    todo_id: str,
    current_user: dict = Depends(get_current_user),
):
    """Get a specific todo by ID"""
    db = get_database()
    
    # Validate ObjectId
    if not ObjectId.is_valid(todo_id):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid todo ID",
        )
    
    # Find todo
    todo = await db.todos.find_one({
        "_id": ObjectId(todo_id),
        "user_id": str(current_user["_id"]),
    })
    
    if not todo:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Todo not found",
        )
    
    return TodoResponse(
        id=str(todo["_id"]),
        title=todo["title"],
        description=todo.get("description"),
        completed=todo["completed"],
        category=todo["category"],
        priority=todo["priority"],
        due_date=todo.get("due_date"),
        user_id=todo["user_id"],
        created_at=todo["created_at"],
        updated_at=todo["updated_at"],
    )


@router.put("/{todo_id}", response_model=TodoResponse)
async def update_todo(
    todo_id: str,
    todo_data: TodoUpdate,
    current_user: dict = Depends(get_current_user),
):
    """Update a todo"""
    db = get_database()
    
    # Validate ObjectId
    if not ObjectId.is_valid(todo_id):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid todo ID",
        )
    
    # Find todo
    todo = await db.todos.find_one({
        "_id": ObjectId(todo_id),
        "user_id": str(current_user["_id"]),
    })
    
    if not todo:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Todo not found",
        )
    
    # Build update data
    update_data = {
        "updated_at": datetime.utcnow(),
    }
    
    if todo_data.title is not None:
        update_data["title"] = todo_data.title
    if todo_data.description is not None:
        update_data["description"] = todo_data.description
    if todo_data.completed is not None:
        update_data["completed"] = todo_data.completed
    if todo_data.category is not None:
        update_data["category"] = todo_data.category
    if todo_data.priority is not None:
        update_data["priority"] = todo_data.priority
    if todo_data.due_date is not None:
        update_data["due_date"] = todo_data.due_date
    
    # Update todo
    await db.todos.update_one(
        {"_id": ObjectId(todo_id)},
        {"$set": update_data},
    )
    
    # Get updated todo
    updated_todo = await db.todos.find_one({"_id": ObjectId(todo_id)})
    
    return TodoResponse(
        id=str(updated_todo["_id"]),
        title=updated_todo["title"],
        description=updated_todo.get("description"),
        completed=updated_todo["completed"],
        category=updated_todo["category"],
        priority=updated_todo["priority"],
        due_date=updated_todo.get("due_date"),
        user_id=updated_todo["user_id"],
        created_at=updated_todo["created_at"],
        updated_at=updated_todo["updated_at"],
    )


@router.delete("/{todo_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_todo(
    todo_id: str,
    current_user: dict = Depends(get_current_user),
):
    """Delete a todo"""
    db = get_database()
    
    # Validate ObjectId
    if not ObjectId.is_valid(todo_id):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid todo ID",
        )
    
    # Delete todo
    result = await db.todos.delete_one({
        "_id": ObjectId(todo_id),
        "user_id": str(current_user["_id"]),
    })
    
    if result.deleted_count == 0:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Todo not found",
        )
    
    return None
