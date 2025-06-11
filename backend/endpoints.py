from flask import Blueprint, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from utils.db import DB
from utils.response import Response
from utils.misc import get_access_token


endpoint = Blueprint('endpoint', __name__)


@endpoint.route('/')
def home():
    return Response.success(msg='Quizzy API v1')


@endpoint.route('/categories')
def fetch_categories():
    categories = DB.fetch_categories()
    if not len(categories):
        return Response.error(
            msg="No categories found on this server! This shouldnt be",
            code=500            
        )
    return Response.success(
        msg="Categories fetched successfully",
        data=categories
    )


@endpoint.route('/wallet/connect', methods=['POST'])
def connect_wallet():
    wallet_id = request.json.get('wallet_id')
    if not wallet_id:
        return Response.error(msg="'wallet_id' is a required field")
    
    user = DB.fetch_user(wallet_id)
    if user:
        user['access_token'] = get_access_token(user['id'])
        return Response.success(
            msg="Wallet connected successfully",
            data=user
        )
    
    user = DB.create_user(wallet_id)
    user['access_token'] = get_access_token(user['id'])
    return Response.success(
        msg="Wallet connected successfully",
        data=user
    )


@endpoint.route('/leaderboard')
@jwt_required()
def fetch_leaderboard_data():
    user_id = get_jwt_identity()
    return Response.success(
        msg='This is a protected route',
        data=DB.get_leaderboard_data(user_id)
    )


@endpoint.route('/quiz/questions/<string:category_id>')
def fetch_questions_by_category_id(category_id):
    if not DB.fetch_category(category_id):
        return Response.error(
            msg='Category not found',
            code=404
        )
        
    questions = DB.fetch_questions_by_category(category_id)    
    return Response.success(
        msg=f'Questions fetched for category <{category_id}> fetched successfully',
        data=questions
    )


@endpoint.route('/quiz/record', methods=['POST'])
@jwt_required()
def record_quiz_results():
    score = request.json.get('score')
    if not score:
        return Response.error(msg="'score' is a required field")
    else:
        try:
            score = int(score)
        except:
            return Response.error(msg="The value for 'score' should be an integer")
        
    DB.record_quiz_result(get_jwt_identity(), score)
    return Response.success(
        msg="Quiz results recorded"
    )