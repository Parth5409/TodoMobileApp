"""
Configuration and settings for the FastAPI application
"""

from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    # MongoDB
    mongodb_url: str = "mongodb://localhost:27017"
    database_name: str = "todo_app"
    
    # JWT
    secret_key: str = "dev-secret-key-change-in-production-min-32-characters-long"
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 30
    
    # CORS - Allow all origins for development (change in production!)
    allowed_origins: str = "*"
    
    class Config:
        env_file = ".env"
        case_sensitive = False
    
    @property
    def origins_list(self) -> List[str]:
        """Convert comma-separated origins to list"""
        if self.allowed_origins == "*":
            return ["*"]
        return [origin.strip() for origin in self.allowed_origins.split(",")]


settings = Settings()
