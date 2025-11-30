"""
Pydantic schemas for todos
"""

from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
from enum import Enum


class TodoCategory(str, Enum):
    """Todo category enum"""
    work = "work"
    personal = "personal"
    study = "study"
    shopping = "shopping"
    other = "other"


class TodoPriority(str, Enum):
    """Todo priority enum"""
    low = "low"
    medium = "medium"
    high = "high"


class TodoBase(BaseModel):
    """Base todo schema"""
    title: str = Field(..., min_length=1, max_length=200)
    description: Optional[str] = Field(None, max_length=1000)
    category: TodoCategory
    priority: TodoPriority
    due_date: Optional[datetime] = None


class TodoCreate(TodoBase):
    """Schema for creating a todo"""
    pass


class TodoUpdate(BaseModel):
    """Schema for updating a todo"""
    title: Optional[str] = Field(None, min_length=1, max_length=200)
    description: Optional[str] = Field(None, max_length=1000)
    completed: Optional[bool] = None
    category: Optional[TodoCategory] = None
    priority: Optional[TodoPriority] = None
    due_date: Optional[datetime] = None


class TodoResponse(TodoBase):
    """Schema for todo response"""
    id: str
    completed: bool
    user_id: str
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True


class TodosResponse(BaseModel):
    """Schema for paginated todos response"""
    todos: list[TodoResponse]
    total: int
    skip: int
    limit: int
