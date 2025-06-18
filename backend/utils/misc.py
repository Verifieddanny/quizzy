"""
Misc -- short for miscellaneous

This file just contains stand alone utility functions that I 
couldnt justify putting in a stand alone file
"""

from uuid import uuid4 
from flask_jwt_extended import create_access_token
from datetime import datetime, timezone
from random_username.generate import generate_username as gen_username


def generate_user_id():
    """
    Generate a uuid hex used as the user's id
    """
    return uuid4().hex


def timestamp_tz():
    """
    Returns a timezone aware timestamp
    """
    return datetime.now(timezone.utc)


def generate_username():
    """
    Generates a random username for a user
    """
    return gen_username()[0]


def set_profile_image(username):
    """
    Uses the avatar placeholder api to get a unique profile 
    image for a user
    """
    return f"https://avatar.iran.liara.run/username?username={username}"


def get_access_token(user_id):
    return create_access_token(identity=user_id)