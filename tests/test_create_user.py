import json
import os
import sys
import unittest

sys.path.append(os.path.dirname(os.path.abspath(__file__)) + "/..")
from .test_base import TestBase, token_signature_error, token_Invalid, token_expired, invalid_login_user, \
    new_user_error_mail, new_user, new_user_response, token_header, login_user, all_users_response, \
    login_user_response,new_user_no_mail,new_user_no_password,new_user_no_firstname,new_user_no_lastname,\
    new_user_no_username,new_user_no_phonenumber,user_no_mail,user_no_password,new_user_no_fields,user_no_fields
from api.helpers.auth import encode_token


class TestUser(TestBase):
    def test_sign_up(self):
        response = self.app.post('/api/v3/auth/signup', content_type="application/json",
                     data=json.dumps(new_user))
        self.assertEqual(response.status_code, 201)
        data = response.data.decode('utf-8')
        self.assertEqual(json.loads(data), new_user_response)

    def test_signup_no_email_field(self):
        response = self.app.post('/api/v3/auth/signup', content_type="application/json",
                                 data=json.dumps(new_user_no_mail))
        self.assertEqual(response.status_code, 406)
        data = response.data.decode()
        errors={}
        errors["email"] = {'error': {'email': 'Email address feild is required.'}}
        self.assertEqual(json.loads(data), errors["email"])

    def test_signup_no_password_field(self):
        response = self.app.post('/api/v3/auth/signup', content_type="application/json",
                                 data=json.dumps(new_user_no_password))
        self.assertEqual(response.status_code, 406)
        data = response.data.decode()
        errors={}
        errors["password"] = {'error': {'password': 'Password feild is required.'}}
        self.assertEqual(json.loads(data), errors["password"])


    def test_signup_no_firstname_field(self):
        response = self.app.post('/api/v3/auth/signup', content_type="application/json",
                                 data=json.dumps(new_user_no_firstname))
        self.assertEqual(response.status_code, 406)
        data = response.data.decode()
        errors={}
        errors["firstName"] = {'error': {'firstName': 'firstName feild is required.'}}
        self.assertEqual(json.loads(data), errors["firstName"])

    def test_signup_no_lastname_field(self):
        response = self.app.post('/api/v3/auth/signup', content_type="application/json",
                                 data=json.dumps(new_user_no_lastname))
        self.assertEqual(response.status_code, 406)
        data = response.data.decode()
        errors={}
        errors["lastName"] = {'error': {'lastName': 'lastName feild is required.'}}
        self.assertEqual(json.loads(data), errors["lastName"])


    def test_signup_no_username_field(self):
        response = self.app.post('/api/v3/auth/signup', content_type="application/json",
                                 data=json.dumps(new_user_no_username))
        self.assertEqual(response.status_code, 406)
        data = response.data.decode()
        errors={}
        errors["userName"] = {'error': {'userName': 'userName feild is required.'}}
        self.assertEqual(json.loads(data), errors["userName"])


    def test_signup_no_phone_field(self):
        response = self.app.post('/api/v3/auth/signup', content_type="application/json",
                                 data=json.dumps(new_user_no_phonenumber))
        self.assertEqual(response.status_code, 406)
        data = response.data.decode()
        errors={}
        errors["phoneNumber"] = {'error': {'phoneNumber': 'phoneNumber feild is required.'}}
        self.assertEqual(json.loads(data), errors["phoneNumber"])

    def test_signup_no_field(self):
        response = self.app.post('/api/v3/auth/signup', content_type="application/json",
                                 data=json.dumps(new_user_no_fields))
        self.assertEqual(response.status_code, 406)
        data = response.data.decode()
        errors={}
        errors["fields"] = {'error': {'fields': 'All Input fields are Required',
            'firstName': 'firstName feild is required.','email': 'Email address feild is required.',
            'lastName': 'lastName feild is required.','userName': 'userName feild is required.',
            'phoneNumber': 'phoneNumber feild is required.','password': 'Password feild is required.'}}
        self.assertEqual(json.loads(data), errors["fields"])


    def test_login_no_email_field(self):
        response = self.app.post('/api/v3/auth/login', content_type="application/json",
                                 data=json.dumps(user_no_mail))
        self.assertEqual(response.status_code, 406)
        data = response.data.decode()
        errors={}
        errors["email"] = {'error': {'email': 'Email address feild is required.'}}
        self.assertEqual(json.loads(data), errors["email"])

    def test_login_no_field(self):
        response = self.app.post('/api/v3/auth/login', content_type="application/json",
                                 data=json.dumps(user_no_fields))
        self.assertEqual(response.status_code, 406)
        data = response.data.decode()
        errors={}
        errors["fields"] = {'error': {'fields': 'All Input fields are Required',
            'email': 'Email address feild is required.','password': 'Password feild is required.'}}
        self.assertEqual(json.loads(data), errors["fields"])


    def test_login_no_password_field(self):
        response = self.app.post('/api/v3/auth/login', content_type="application/json",
                                 data=json.dumps(user_no_password))
        self.assertEqual(response.status_code, 406)
        data = response.data.decode()
        errors={}
        errors["password"] = {'error': {'password': 'Password feild is required.'}}
        self.assertEqual(json.loads(data), errors["password"])


    def test_login(self):
        response = self.app.post('/api/v3/auth/login', content_type="application/json", data=json.dumps(login_user))
        self.assertEqual(response.status_code, 200)
        data = response.data.decode()
        self.assertEqual(json.loads(data)["message"], login_user_response["message"])

    def test_login_invalid(self):
        response = self.app.post('/api/v3/auth/login', content_type="application/json",
                                 data=json.dumps(invalid_login_user))
        self.assertEqual(response.status_code, 401)
        data = response.data.decode()
        Invalid = {"message": "Invalid credentials, Please try again"}
        self.assertEqual(json.loads(data), Invalid)

    def test_get_users(self):
        response = self.app.get('/api/v3/users', headers=token_header(encode_token(1)))
        self.assertEqual(response.status_code, 200)
        data = response.data.decode()
        self.assertEqual(len(json.loads(data)), len(all_users_response))
        self.assertEqual(json.loads(data)["data"][0]["email"], all_users_response["data"][0]["email"])

    def test_get_token_miss(self):
        response = self.app.get('/api/v3/users')
        self.assertEqual(response.status_code, 401)
        data = response.data.decode()
        message = {"message": "Missing token"}
        self.assertEqual(json.loads(data), message)

    def test_get_expire_token(self):
        response = self.app.get('/api/v3/users', headers=token_expired)
        self.assertEqual(response.status_code, 401)
        data = response.data.decode()
        token_expired_message = {"message": "token expired"}
        self.assertEqual(json.loads(data), token_expired_message)

    def test_get_invalid_token(self):
        response = self.app.get('/api/v3/users', headers=token_Invalid)
        self.assertEqual(response.status_code, 401)
        data = response.data.decode()
        token_Invalid_message = {"message": "Invalid Token verification failed"}
        self.assertEqual(json.loads(data), token_Invalid_message)

    def test_get_token_signature_error(self):
        response = self.app.get('/api/v3/users', headers=token_signature_error)
        self.assertEqual(response.status_code, 401)
        data = response.data.decode()
        message = {"message": "Signature verification failed"}
        self.assertEqual(json.loads(data), message)

    def test_get_users_error(self):
        response = self.app.get('/api/v3/users', headers=token_header(encode_token(2)))
        self.assertEqual(response.status_code, 401)
        data = response.data.decode()
        message = {"messsage": "Login as an admin to access this route"}
        self.assertEqual(json.loads(data), message)


if __name__ == '__main__':
    unittest.main()
