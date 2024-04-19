#sign up 
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel 
from typing import Optional
import mysql.connector
import smtplib

app = FastAPI()

#connect to MySQL database

db = mysql.connector.connect (
    connectionLimit = 10, # maximum number of connections in the pool
    user = "process.env.DB_USER", # MYSQL database username
    password = "process.env_DB_PASSWORD", # MYSQL database password 
    host =  "process.env.DB_HOST", # MYSQL database host 
    port = "process.env.DB_PORT MYSQL", # database port 
    database = "process.env.DB_NAME",  # MYSQL database name
),

cursor = db.cursor()


# define data model for member signup

class MemberSignup(BaseModel):
    firstName: str
    lastName: str 
    email: str 
    password: str 
    
# API endpoint for member signup

@app.post("/api/signup") 

async def signup(member: MemberSignup):
    try:
        query = "INSERT INTO members (first_name, last_name, email, password) VALUES (%s, %s, %s, %s)"
        values = (member.firstName, member.lastName, member.email, member.password)
        cursor.execute(query, values)
        db.commit()
        return {"message": "Signup successful"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to signup:{str(e)}")