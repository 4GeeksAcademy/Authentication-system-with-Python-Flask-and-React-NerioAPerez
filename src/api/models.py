from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean, Integer, Column, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'user' 
    id: Mapped[int] = mapped_column(Integer, primary_key=True) 
    first_name: Mapped[str] = mapped_column(String(120), nullable=False)
    last_name: Mapped[str] = mapped_column(String(120), nullable=False)
    address: Mapped[str] = mapped_column(String(120), nullable=False)    
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False) 
    password: Mapped[str] = mapped_column(String(120), nullable=False) 
    country: Mapped[str] = mapped_column(String(120), nullable=False)    
    state: Mapped[str] = mapped_column(String(120), nullable=False)        
    zip: Mapped[int] = mapped_column(Integer, nullable=False)    
    
    def serialize(self):
        return {
            "id": self.id,            
            "first_name": self.first_name,
            "last_name": self.last_name,
            "address": self.address,
            "email": self.email,
            "country": self.country,
            "state": self.state,
            "zip": self.zip,
            # do not serialize the password, its a security breach
        }