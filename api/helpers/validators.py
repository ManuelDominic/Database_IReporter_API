from functools import wraps
import re
from flask import request,jsonify


invalid_key_msg = "Invalid Key in data,please provide valid input data"
required_feild = "field is Required"
Invalid_value_msg = "Invalid value in data,please provide valid input data"
get_data="Input fields are Required"
valid_type="Please provide valid data type for fields"


def pass_email():
    data= request.get_json()
    # error ={}
    response = None
    if not data:
        response = jsonify({"message": get_data}),406
    elif not str(data["email"]).strip():
        response = jsonify({"message":"Email address feild is required."}), 406
    elif not re.match(r"(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)", data["email"]) or len(data["email"])<12:
        response = jsonify({"message":"You have entered an invalid email address.Please try again."}), 406 
    elif not data["password"]:
        response = jsonify({"message":"Password feild is required."}), 406
    elif not data["password"].isalnum() or len(data["password"]) < 6:
        response = jsonify({"message":"Password must have atleast six alphanumeric characters"}), 406
    return response

def more_user_data():
    data = request.get_json()
    response = None
    if not data:
        response = jsonify({"message": get_data}),406
    elif not data["firstName"]:
        response = jsonify({"message":"firstName feild is required."}), 406
    elif not data["firstName"].isalpha() or len(data["firstName"]) < 3:
        response = jsonify({"message":"firstName field must have atleast 3 character strings"}), 406
    elif not data["lastName"]:
        response = jsonify({"message":"lastName feild is required."}), 406
    elif not data["lastName"].isalpha() or len(data["firstName"]) < 3:
        response = jsonify({"message":"lastName field must have atleast 3 character strings"}), 406
    elif not data["userName"]:
        response = jsonify({"message":"userName feild is required."}), 406
    elif not data["userName"].isalpha() or len(data["firstName"]) < 4:
        response = jsonify({"message":"userName field must have atleast 4 character strings"}), 406
    elif not data["phoneNumber"]:
        response = jsonify({"message":"phoneNumber feild is required."}), 406
    elif not isinstance(data["phoneNumber"],str) or len(str(data["phoneNumber"]))!=10:
        response = jsonify({"message":"Please enter valid phoneNumber"}), 406
    return response


def verify_login_data(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        error = None
        try:
            verify=pass_email()
            response = None
            if verify:
                return verify
            else:
                response = func(*args , **kwargs)
            return response
        except KeyError:
            error = jsonify({"message":invalid_key_msg}), 406
        except ValueError:
            error = jsonify({"message":valid_type}),406
        return error
    return wrapper


def verify_signup_data(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        error = None
        try:
            data = request.get_json()
            verify=pass_email()
            user_data=more_user_data()
            response = None
            if verify:
                response = verify
            elif user_data:
                response = user_data
            else:
                response = func(*args , **kwargs)
            return response
        except KeyError:
            error = jsonify({"message":invalid_key_msg}), 400
        except ValueError:
            error = jsonify({"message":valid_type}),400
        # except TypeError:
        #     error = jsonify({"message": "Email already in use"}),406
        return error
    return wrapper



def more_incident_data():
    data = request.get_json()
    response = None
    if not data:
        response = jsonify({"message": get_data}),406
    elif not data["longtitude"]:
        response = jsonify({"message":"longtitude feild is required"}), 406
    elif not isinstance(data["longtitude"],float):# or data["longtitude"] != range(+180,-180):
        response = jsonify({"message":"longtitude must be a float in range of -180 to +180"}),406
    elif not data["latitude"]:
        response = jsonify({"message":"latitude feild is required"}), 406
    elif not isinstance(data["latitude"],float):# or data["latitude"] != range(-90,+90):
        response = jsonify({"message":"latitude must be a float in range of -90 to +90"}),406
    elif not data["comment"]:
        response = jsonify({"message":"comment feild is required"}), 406
    elif not isinstance(data["comment"],str) or len(data["comment"])<10:
        response = jsonify({"message":"comment field must have atleast 10 character strings"}),406
    elif not data["title"]:
        response = jsonify({"message":"title feild is required"}), 406
    elif not data["title"].isalpha():
        response = jsonify({"message":"title feild should have only alphabets"}), 406
    return response


def verify_create_incident_data(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        error = None
        try:
            data = request.get_json()
            response = None
            incident_data = more_incident_data()
            if incident_data:
                response = incident_data
            else:
                response = func(*args, **kwargs)
            return response
        except KeyError:
            error = jsonify({"message":invalid_key_msg}), 406
        except ValueError:
            error = jsonify({"message":valid_type}),406
        except TypeError:
            error = jsonify({"message": "Incident already exist"}),406
        return error
    return wrapper


def verify_upadte_data(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        error = None
        try:
            data = request.get_json()
            response = None
            incident_data = more_incident_data()
            if incident_data:
                response = incident_data
            else:
                response = func(*args, **kwargs)
            return response
        except KeyError:
            error = jsonify({"message":invalid_key_msg}), 406
        except ValueError:
            error = jsonify({"message":valid_type}),406
        except TypeError:
            error = jsonify({"message": "Sorry, comments not accepted, make some change"}),406
        return error
    return wrapper
