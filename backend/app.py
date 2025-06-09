from flask import Flask
from pymongo import MongoClient
from config import Config
from utils.response import Response


app = Flask(__name__)
mongo = MongoClient([Config.DATABASE_URL])
db = mongo[Config.DATABASE_NAME]

# Database collections
test_collection = db.tests


@app.route('/')
def home():
    test_collection.insert_one({'name': 'John Doe'})
    return Response.success(msg='Quizzy API v1')


if __name__ == '__main__':
    app.run(debug=True)