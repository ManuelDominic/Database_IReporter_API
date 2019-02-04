from flask import jsonify,request
import datetime
from werkzeug.security import generate_password_hash,check_password_hash
import psycopg2
import psycopg2.extras
from api.models.database_model import DatabaseConnection
from api.helpers.auth import get_current_user


# class User:
#     """docstring for User."""

db=DatabaseConnection()

def get_all_users():
    """docstring function that return all users detials"""
    sql_command="""SELECT * FROM users WHERE isAdmin=False"""
    db.cursor.execute(sql_command)
    users=db.cursor.fetchall()
    return users


def signup_user():
    data = request.get_json()
    sql_command="""INSERT INTO users (first_Name,last_Name,email,
            user_Name,phone_Number,passwd,isAdmin,joinning)
        VALUES ('{}','{}','{}',
            '{}','{}','{}',FALSE, now()) RETURNING user_id,first_Name,last_Name,email,
            user_Name,phone_Number,isAdmin,joinning""".format(data["firstName"],
            data["lastName"],
        data["email"],data["userName"],data["phoneNumber"],
        generate_password_hash(data["password"]))
    # try:
    db.cursor.execute(sql_command)
    # except psycopg2.IntegrityError:
    #     return jsonify({"message": "Email already in use"}),406
    user=db.cursor.fetchone()
    return user


def login_user():
    data = request.get_json()
    sql_command="""SELECT  passwd,email,user_Id FROM users WHERE email='{}'""".format(data["email"])
    db.cursor.execute(sql_command)
    user=db.cursor.fetchone()
    return user


def logout_user():
    sql_command="""DELETE FROM tokens WHERE user_id='{}' RETURNING token""".format(get_current_user()["userId"])
    db.cursor.execute(sql_command)
    token=db.cursor.fetchone()
    return token


def store_token(user_Id,token):
    sql_command="""INSERT INTO  tokens (user_Id,token)
        VALUES ('{}','{}') RETURNING token""".format(user_Id,token)
    db.cursor.execute(sql_command)
    valid=db.cursor.fetchone()
    return valid