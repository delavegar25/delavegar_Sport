#sign up 
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel 
from typing import Optional
import mysql.connector
import random
import string

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

# function to generate a random 6 digit code 
def generate_verification_code():
    return 
''.join(random.choices(string.digits, k=6))

verification_codes = {}
verification_email = {}

# define data model for member signup

class MemberSignup(BaseModel):
    firstName: str
    lastName: str 
    email: str 
    password: str 
    
# define data model for verification data
class VerificationData(BaseModel):
    email: str
    verificationCode: str 
    
    
# API endpoint for member signup

@app.post("/api/signup") 

async def signup(member: MemberSignup):
    try:
        verification_code = generate_verification_code
        
        #store the verification code with the users mail
        verification_codes[member.email] = verification_code
        
        # send the verification code to the users mail
        verification_email[member.email] = verification_code
        
        query = "INSERT INTO members (first_name, last_name, email, password) VALUES (%s, %s, %s, %s)"
        values = (member.firstName, member.lastName, member.email, member.password)
        cursor.execute(query, values)
        db.commit()
        return {"message": "Signup successful"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to signup:{str(e)}")

