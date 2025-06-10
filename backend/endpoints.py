from flask import Blueprint
from utils.db import DB
from utils.response import Response


endpoint = Blueprint('endpoint', __name__)


@endpoint.route('/')
def home():
    return Response.success(msg='Quizzy API v1')


@endpoint.route('/categories')
def fetch_categories():
    categories = DB.categories.find({}, {'_id': 0})
    return Response.success(
        msg="WIP",
        data=list(categories)
    )
