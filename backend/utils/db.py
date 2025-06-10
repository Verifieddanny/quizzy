from pymongo import MongoClient
from config import Config
from utils.misc import *


mongo = MongoClient([Config.DATABASE_URL])
db = mongo[Config.DATABASE_NAME]

class DB:
    categories = db.Categories
    users = db.Users

    @staticmethod
    def create_user(wallet_id):
        username = generate_username()
        user = {
            'wallet_id': wallet_id,
            'id': generate_user_id(),
            'created_at': timestamp_tz(),
            'last_quiz_at': None,
            'quiz_taken': 0,
            'username': username,
            'profile_img': set_profile_image(username)
        }
        DB.users.insert_one(user)
        user.pop('_id', None)
        return user
    
    @staticmethod
    def fetch_user(wallet_id):
        user = DB.users.find_one({'wallet_id': wallet_id}, {'_id': 0})
        return user