from functools import wraps
import re
from flask import request,jsonify


invalid_key_msg = "Invalid Key in data,please provide valid input data"
required_feild = "field is Required"
Invalid_value_msg = "Invalid value in data,please provide valid input data"
get_data="All Input fields are Required"
get_update="No Input field provided"
valid_type="Please provide valid data type for fields"


def pass_email():
    data= request.get_json(force=True)
    errors = {}
    if not data["email"] and not data["password"]:
        errors["fields"] = get_data
    
    if not str(data["email"]).strip():
        errors["email"] = "Email address feild is required."
    
    if not data["password"]:
        errors["password"] = "Password feild is required."

    if errors:
        return jsonify({"error":errors}), 406
    return None


def more_user_data():
    data = request.get_json(force=True)
    errors = {}
    if not data["firstName"] and not data["lastName"] and not data["userName"] and not data["email"] and not data["password"] and not data["phoneNumber"]:
        errors["fields"] = get_data
    
    if not data["firstName"]:
        errors["firstName"] = "firstName feild is required."
    elif not data["firstName"].isalpha() or len(data["firstName"]) < 3:
        errors["firstName"] = "firstName field must have atleast 3 character strings"
    
    if not data["lastName"]:
        errors["lastName"] = "lastName feild is required."
    elif not data["lastName"].isalpha() or len(data["lastName"]) < 3:
        errors["lastName"] = "lastName field must have atleast 3 character strings"
    
    if not data["userName"]:
        errors["userName"] = "userName feild is required."
    elif not data["userName"].isalpha() or len(data["userName"]) < 4:
        errors["userName"] = "userName field must have atleast 4 character strings"
    
    if not str(data["email"]).strip():
        errors["email"] = "Email address feild is required."
    elif not re.match(r"(^[a-zA-Z0-9.]+@[a-zA-Z0-9]+\.[a-zA-Z]+$)", data["email"]) or len(data["email"])<12:
        errors["email"] = "You have entered an invalid email address.Please try again." 
    
    if not data["password"]:
        errors["password"] = "Password feild is required."
    elif not data["password"].isalnum() or len(data["password"]) < 6:
        errors["password"] = "Password must have atleast six alphanumeric characters"
    
    if not data["phoneNumber"]:
        errors["phoneNumber"] = "phoneNumber feild is required."
    elif not re.match(r"(^[0-9]+$)",data["phoneNumber"]) or len(str(data["phoneNumber"])) != 10:
        errors["phoneNumber"] = "Please enter valid phoneNumber"
    
    if errors:
        return jsonify({"error":errors}), 406
    return None


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
            error = jsonify({"message":invalid_key_msg}), 400
        except ValueError:
            error = jsonify({"message":valid_type}),400
        return error
    return wrapper


def verify_signup_data(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        error = None
        try:
            data = request.get_json()
            user_data=more_user_data()
            response = None
            if user_data:
                response = user_data
            else:
                response = func(*args , **kwargs)
            return response
        except KeyError:
            error = jsonify({"message":invalid_key_msg}), 400
        except ValueError:
            error = jsonify({"message":valid_type}),400
        return error
    return wrapper



def more_incident_data():
    data = request.get_json(force=True)
    errors = {}
    if not data["title"] and not data["longtitude"] and not data["latitude"] and not data["comment"]:
        errors["fields"] = get_data
    
    if not data["title"]:
        errors["title"] = "title feild is required"
    elif not isinstance(data["title"],str) and len(data["title"]) < 4:
        errors["title"] = "title feild should have atleast 4 character strings"
   
    if not data["longtitude"]:
        errors["longtitude"] = "longtitude feild is required"
    elif not isinstance(data["longtitude"],str):
        errors["longtitude"] = "longtitude must be a float in range of -180 to +180"
   
    if not data["latitude"]:
        errors["latitude"] = "latitude feild is required"
    elif not isinstance(data["latitude"],str):
        errors["latitude"] = "latitude must be a float in range of -90 to +90"
   
    if not data["comment"]:
        errors["comment"] = "comment feild is required"
    elif not isinstance(data["comment"],str) and len(data["comment"]) < 10:
        errors["comment"] = "comment field must have atleast 10 character strings"

    if errors:
        return jsonify({"error":errors}), 406
    return None


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
            error = jsonify({"message":invalid_key_msg}), 400
        except ValueError:
            error = jsonify({"message":valid_type}),400
        return error
    return wrapper


def update_incident_data():
    data = request.get_json(force=True)
    errors = {}

    if not isinstance(data["longtitude"],str):
        errors["longtitude"] = "longtitude must be a float in range of -180 to +180"
   
    if not isinstance(data["latitude"],str):
        errors["latitude"] = "latitude must be a float in range of -90 to +90"
   
    if not isinstance(data["comment"],str) or len(data["comment"])<10:
        errors["comment"] = "comment field must have atleast 10 character strings"

    if errors:
        return jsonify({"error":errors}), 406
    return None


def verify_update_data(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        error = None
        try:
            data = request.get_json()
            response = None
            incident_data = update_incident_data()
            if incident_data:
                response = incident_data
            else:
                response = func(*args, **kwargs)
            return response
        except KeyError:
            error = jsonify({"message":invalid_key_msg}), 400
        except ValueError:
            error = jsonify({"message":valid_type}),400
        return error
    return wrapper
