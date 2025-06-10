from pymongo import MongoClient
from config import Config


mongo = MongoClient([Config.DATABASE_URL])
db = mongo[Config.DATABASE_NAME]

class DB:
    categories = db.Categories