import config
from config import db
from model import User, UserSchema
from flask import Flask, request, jsonify, make_response
import uuid
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
import datetime
from functools import wraps

app = config.connex_app.app

def token_required(f):
    '''
    decoratore to check if API has access
    token or not.
    '''
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if 'x-access-token' in request.headers:
            token = request.headers['x-access-token']
        if not token:
            return jsonify({'message' : 'Token is missing!'}), 401

        try: 
            data = jwt.decode(token, app.config['SECRET_KEY'])
            current_user = User.query.filter_by(public_id=data['public_id']).first()
        except:
            return jsonify({'message' : 'Token is invalid!'}), 401

        return f(current_user, *args, **kwargs)
    return decorated


def createUser():
    """
    This function responds to a request for /user
    to create new user
    """
    data = request.get_json()
    hashed_password = generate_password_hash(data['password'], method='sha256')

    new_user = User(public_id=str(uuid.uuid4()), name=data['name'], email=data['email'], password=hashed_password, reviews="")
    db.session.add(new_user)
    db.session.commit()

@token_required
def getUsers(current_user):
    """
    This function responds to a request for /users
    to get all users
    """    
    users = User.query.all()
    output = []

    for user in users:
        user_data = {}
        user_data['public_id'] = user.public_id
        user_data['name'] = user.name
        user_data['email'] = user.email
        user_data['password'] = user.password
        user_data['reviews'] = user.reviews
        output.append(user_data)
    return output

@token_required
def deleteUser(current_user, public_id):
    """
    This function responds to a request for /user/<public_id>'
    to delete a user
    param: public id
    """    
    user = User.query.filter_by(public_id=public_id).first()

    if not user:
        return jsonify({'message' : 'No user found!'})

    db.session.delete(user)
    db.session.commit()
    return jsonify({'message' : 'The user has been deleted!'})


def login():
    """
    This function responds to a request for /login'
    to login and verify user
    return: access token
    """        
    data = request.get_json()
    if not data or not data['email'] or not data['password']:
        return make_response('Could not verify', 401, {'WWW-Authenticate' : 'Basic realm="Login required!"'})

    user = User.query.filter_by(email=data['email']).first()

    if not user:
        return make_response('No user found', 401, {'WWW-Authenticate' : 'Basic realm="Login required!"'})

    if check_password_hash(user.password, data['password']):
        token = jwt.encode({'public_id' : user.public_id, 'exp' : datetime.datetime.utcnow() + datetime.timedelta(minutes=30)}, app.config['SECRET_KEY'])
        return jsonify({'token' : token.decode('UTF-8'), 'user': {'name': user.name, 'id': user.public_id}})

    return make_response('Could not verify', 401, {'WWW-Authenticate' : 'Basic realm="Login required!"'})


@token_required
def addReviews(current_user):
    """
    This function responds to a request for /addreview'
    to add a review from user to database
    """        
    data = request.get_json()
    user = User.query.filter_by(public_id=data['id']).first()
    user.reviews = data["review"]
    db.session.commit()
    return jsonify({'message' : 'Your review is added, thanks'})


