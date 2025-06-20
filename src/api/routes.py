"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""

import os
from flask import Flask, request, jsonify, url_for, Blueprint
from flask_migrate  import Migrate
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity


api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


# Endpoint para crea usuario
@api.route('/signup', methods=['POST'])
def create_users():
    user_exist = User.query.filter_by(email=request.json.get('email')).first()
    if user_exist:
        return jsonify({"message": "User already exists"}), 403
    user = User()
    user.first_name = request.json.get('first_name')
    user.last_name = request.json.get('last_name')
    user.address = request.json.get('address')
    user.email = request.json.get('email')
    user.password = request.json.get('password')
    user.state = request.json.get('state')
    user.country = request.json.get('country')
    user.zip = request.json.get('zip')

    db.session.add(user)
    db.session.commit()
    return jsonify({"message": "User created successfully", "user_id": user.id}), 201


@api.route('/login', methods = ['POST'])
def login():
    email = request.json.get('email')    
    user = User.query.filter_by(email=email).first()    
    if user is None:        
        return jsonify(
            {"message": "Invalid email or password"}
        ), 401
    password = request.json.get('password')    
    if password != user.password:      
        return jsonify(
            {"message": "Invalid email or password"}
        ),  401
    access_token = create_access_token(identity=email)
    return jsonify(
        {"message": "Login successful", "access_token": access_token, 'user': user.serialize()}
    ), 200

@api.route('/private', methods= ['GET'])
@jwt_required()
def validate_user():
    email = get_jwt_identity()
    user = User.query.filter_by(email=email).first()
    if user is None:
        return jsonify(
            {"message": "User not found"}, 404
        )
    return jsonify(user.serialize()), 200