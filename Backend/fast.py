#sign up 
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel 
from typing import Optional
from fastapi.staticfiles import StaticFiles
from fastapi.requests import Request
from fastapi.templating import  Jinja2Templates
from fastapi.middleware.cors import CORSMiddleware

#import mysql.connector
import random
import string

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_headers=['*'],
    allow_credentials=False
)

app.mount("/assets", StaticFiles(directory="../dist/assets"), name='static')

templates = Jinja2Templates(directory="templates")

@app.get('/api/health')
async def health():
    print('GFuck ')
    return {'status': 'healthy'}

#connect to MySQL database
'''
db = mysql.connector.connect (
    connectionLimit = 10, # maximum number of connections in the pool
    user = "process.env.DB_USER", # MYSQL database username
    password = "process.env_DB_PASSWORD", # MYSQL database password 
    host =  "process.env.DB_HOST", # MYSQL database host 
    port = "process.env.DB_PORT MYSQL", # database port 
    database = "process.env.DB_NAME",  # MYSQL database name
),

cursor = db.cursor()
'''

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

class MemberLogin(BaseModel):
    name: str
    age: int


# define data model for verification data
class VerificationData(BaseModel):
    email: str
    verificationCode: str 
    
    
# API endpoint for member signup

#@app.post("/api/signup", "/api/verify") 

@app.post("/api/login11") 
async def signup(xx: MemberLogin):    
    return {'message': "Welcome back Mr {}".format(MemberLogin.name)}

@app.get('/api/login/{user}')
def login(user: str, pwd: str):
    return ('Welcome  back Mr. {}'.format(user))