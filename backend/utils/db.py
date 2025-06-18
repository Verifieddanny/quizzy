from pymongo import MongoClient
from config import Config
from utils.misc import *


mongo = MongoClient([Config.DATABASE_URL])
db = mongo[Config.DATABASE_NAME]

class DB:
    categories = db.Categories
    users = db.Users
    questions = db.Questions

    @staticmethod
    def fetch_categories():
        return list(DB.categories.find({}, {'_id': 0}))

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
            'profile_img': set_profile_image(username),
            'score': 0
        }
        DB.users.insert_one(user)
        user.pop('_id', None)
        return user
    
    @staticmethod
    def fetch_user(wallet_id):
        return DB.users.find_one({'wallet_id': wallet_id}, {'_id': 0})
    
    @staticmethod
    def fetch_category(category_id):
        try:
            return DB.categories.find_one({'id': int(category_id)}, {'_id': 0})
        except ValueError:
            return None
        
    @staticmethod
    def fetch_questions_by_category(category_id, noq=5):
        """
        - category_id: The id of the category to fetch questions from
        - noq: Number of questions to return
        """
        try:
            return list(DB.questions.aggregate([
                {"$match": {'category_id': int(category_id)}},
                {"$sample": {'size': noq}},
                {"$project": {"_id": 0}}
            ]))
        except ValueError:
            return None
        
    @staticmethod
    def record_quiz_result(user_id, score):
        DB.users.update_one(
            {'id': user_id},
            {
                "$set": {
                    "last_quiz_at": timestamp_tz()
                },
                "$inc": {
                    "quiz_taken": 1,
                    "score": score
                }
            }
        )

    @staticmethod
    def get_leaderboard_data(user_id):
        total = DB.users.count_documents({})
        top_5 = DB.users.find(
            {}, {
                "_id": 0,
                'score': 1,
                'quiz_taken': 1,
                'username': 1,
                'profile_img': 1,
                'id': 1
            }
        ).sort({"score": -1}).limit(5)
        user_rank = DB.users.aggregate([
            {'$setWindowFields': {
                'sortBy': {'score': -1},
                'output': {'rank': {'$rank': {}}}
            }},
            {'$match': {"id": user_id}},
            {'$project': {
                'rank': 1,
                '_id': 0
            }}
        ])
        user = DB.users.find_one(
            {"id": user_id},
            {
                "score": 1,
                "last_quiz_at": 1,
                "quiz_taken": 1,
                "_id": 0
            }
        )
        return {
            "total": total,
            "top_5_users": list(top_5),
            "rank": list(user_rank)[0]['rank'] if user_rank else None,
            "user_quiz_data": user
        }