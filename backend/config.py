import os
from dotenv import load_dotenv


load_dotenv(override=True)

class Config:
    DATABASE_URL = os.environ.get('DATABASE_URL')
    DATABASE_NAME = os.environ.get('DATABASE_NAME')