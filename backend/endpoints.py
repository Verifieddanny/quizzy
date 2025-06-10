from flask import Blueprint, request
from utils.db import DB
from utils.response import Response
from utils.misc import get_access_token


endpoint = Blueprint('endpoint', __name__)


@endpoint.route('/')
def home():
    return Response.success(msg='Quizzy API v1')


@endpoint.route('/categories')
def fetch_categories():
    categories = list(DB.categories.find({}, {'_id': 0}))
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
