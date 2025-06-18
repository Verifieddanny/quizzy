from flask import Blueprint, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from utils.db import DB
from utils.response import Response
from utils.misc import get_access_token


endpoint = Blueprint('endpoint', __name__)


@endpoint.route('/')
def home():
    """
    Root endpoint
    ---
    responses:
        200:
            description: Example success response
            examples:
                application/json: {
                    "data": null,
                    "msg": "Quizzy API v1",
                    "success": true
                }
    """
    return Response.success(msg='Quizzy API v1')


@endpoint.route('/categories')
def fetch_categories():
    """
    Fetch quiz categories
    ---
    responses:
        200:
            description: Successfully returned categories
            examples:
                application/json: { 
                    "msg": "Categories fetched successfully",
                    "success": True,
                    "data": [
                        {
                            "id": 1,
                            "name": "Blockchain Basics"
                        },...
                    ]
                }
        500:
            description: Error that occurs when no categories have been set in the db
            examples:
                application/json: {
                    "msg": "No categories found on this server! This shouldnt be",
                    "success": False
                }
    """
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
    """
    Connect a wallet to the server
    ---
    parameters:
        - in: body
          name: wallet
          description: Wallet ID to connect
          required: true
          schema:
              type: object
              properties:
                  wallet_id:
                      type: string
                      example: "0xabc123..."
    responses:
        200:
            description: Wallet connected successfully, either existing user or new user created
            examples:
                application/json: {
                    "msg": "Wallet connected successfully",
                    "success": True,
                     "data": {
                        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9....",
                        "created_at": "Wed, 18 Jun 2025 07:47:29 GMT",
                        "id": "c466d315808746d9aeeda81d2bef8ce0",
                        "last_quiz_at": null,
                        "profile_img": "https://avatar.iran.liara.run/username?username=jumpySheep7",
                        "quiz_taken": 0,
                        "score": 0,
                        "username": "jumpySheep7",
                        "wallet_id": "0xabc123..."
                    }
                }
        400:
            description: Missing required `wallet_id` field in request
            examples:
                application/json: {
                    "msg": "'wallet_id' is a required field",
                    "success": False
                }
    """    
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
    """
    Fetch leaderboard data for the authenticated user
    ---
    security:
        - Bearer: []
    responses:
        200:
            description: Leaderboard data fetched successfully
            examples:
                application/json: {
                    "msg": "Leaderboard data fetched successfully",
                    "success": True,
                    "data": {
                        "rank": 2,
                        "top_5_users": [
                            {
                                "id": "ab45125c728041a28bca290e78a39c44",
                                "profile_img": "https://avatar.iran.liara.run/username?username=mildCamel9",
                                "quiz_taken": 2,
                                "score": 8,
                                "username": "mildCamel9"
                            },...
                        ],
                        "total": 4,
                        "user_quiz_data": {
                            "last_quiz_at": "Wed, 11 Jun 2025 12:31:11 GMT",
                            "quiz_taken": 2,
                            "score": 6
                        }
                    }
                }
    """
    user_id = get_jwt_identity()
    return Response.success(
        msg='Leaderboard data fetched successfully',
        data=DB.get_leaderboard_data(user_id)
    )


@endpoint.route('/quiz/questions/<string:category_id>')
def fetch_questions_by_category_id(category_id):
    """
    Fetch quiz questions by category ID
    ---
    parameters:
        - name: category_id
          in: path
          type: string
          required: true
          description: The ID of the quiz category
    responses:
        200:
            description: Questions fetched successfully for the specified category
            examples:
                application/json: {
                    "msg": "Questions fetched for category <category_id> fetched successfully",
                    "success": True,
                    "data": [
                        {
                            "category_id": 2,
                            "options": [
                                {
                                    "is_correct": false,
                                    "option": "Digital Finance"
                                },
                                {
                                    "is_correct": true,
                                    "option": "Decentralized Finance"
                                },
                                {
                                    "is_correct": false,
                                    "option": "Defensive Finance"
                                }
                            ],
                            "question": "What does DeFi stand for?"
                        },
                        ...
                    ]
                }
        404:
            description: The specified category does not exist
            examples:
                application/json: {
                    "msg": "Category not found",
                    "success": False
                }
    """
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
    """
    Record quiz results for the authenticated user
    ---
    security:
        - Bearer: []
    parameters:
        - in: body
          name: result
          required: true
          description: Quiz score to record
          schema:
              type: object
              properties:
                  score:
                      type: integer
                      example: 7
    responses:
        200:
            description: Quiz results recorded successfully
            examples:
                application/json: {
                    "msg": "Quiz results recorded",
                    "success": True
                }
        400:
            description: Invalid or missing score
            examples:
                application/json: {
                    "msg": "'score' is a required field",
                    "success": False
                }
        422:
            description: Score provided is not an integer
            examples:
                application/json: {
                    "msg": "The value for 'score' should be an integer",
                    "success": False
                }
    """
    score = request.json.get('score')
    if score is None:
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