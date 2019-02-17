from flask import Blueprint, jsonify, request
from api.helpers.auth import encode_token, admin_required, token_required
from api.helpers.validators import verify_login_data, verify_signup_data
from api.models.database_model import DatabaseConnection
from api.helpers.auth import admin_required,non_admin_required
from api.controllers.user_controller import get_all_users,get_profile_user,get_one_user,signup_user,store_token,login_user,logout_user
from werkzeug.security import check_password_hash


user_bp = Blueprint("user_bp", __name__, url_prefix="/api/v3")


db =DatabaseConnection()

@user_bp.route("/users", methods=["GET"])
@token_required
@admin_required
def get_the_users():
    users=get_all_users()
    if users:
        return jsonify({"status": 200, "data": users[0:]}), 200
    return not_found()



@user_bp.route("/users/<int:user_Id>", methods=["GET"])
@token_required
@admin_required
def get_a_user(user_Id):
    user=get_one_user(user_Id)
    if user:
        return jsonify({"status": 200, "data": user}), 200
    return not_found()



@user_bp.route("/profile", methods=["GET"])
@token_required
@non_admin_required
def get_user():
    user=get_profile_user()
    if user:
        return jsonify({"status": 200, "data": user}), 200
    return not_found()


@user_bp.route("/auth/signup", methods=["POST"])
@verify_signup_data
def user_signup():
    detail = signup_user()
    if detail:
        return jsonify({"status": 201,"message": "Successfully registered"}), 201
    return bad_request()


@user_bp.route("/auth/login", methods=["POST"])
@verify_login_data
def user_login():
    data = request.get_json(force=True)
    user = login_user()
    if user and check_password_hash(user["passwd"],data["password"]):
        token = store_token(user["user_id"],encode_token(user["user_id"]))
        return jsonify({"token": token["token"],"message": "Successfully logged In"}),200
    return jsonify({"message": "Invalid credentials, Please try again"}), 401


@user_bp.route("/auth/logout", methods=["POST"])
def user_logout():
    blacklist = logout_user()
    return jsonify({"token": blacklist["token"],
             "message": "Successfully logged Out"}),200


def bad_request():
    return jsonify({"status":400, "message": "Sorry, Bad request"}),400

def not_found():
    return jsonify({"status":404, "message": "Users Not Found"}),404