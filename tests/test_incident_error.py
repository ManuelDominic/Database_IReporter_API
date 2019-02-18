import json
import os
import sys
import unittest

sys.path.append(os.path.dirname(os.path.abspath(__file__)) + "/..")

from .test_base import TestBase, invalid_key_msg, error, example_create_data, \
    new_status, new_bad_intervention, new_error_intervention, \
    new_error_redflag, token_header, new_bad_redflag, new_record
from api.models.database_model import DatabaseConnection
from api.helpers.auth import encode_token


class TestIncidenterrors(TestBase):
    def test_get_specific_user_intervention_with_error_id(self):
        response = self.app.get('/api/v3/user/intervention/25', headers=token_header(encode_token(2)))
        self.assertEqual(response.status_code, 404)
        data = response.data.decode()
        self.assertEqual(json.loads(data), error)

    def test_get_specific_user_redflags_with_error_id(self):
        response = self.app.get('/api/v3/user/red-flags/82', headers=token_header(encode_token(2)))
        self.assertEqual(response.status_code, 404)
        data = response.data.decode()
        self.assertEqual(json.loads(data), error)

    def test_get_specific_admin_intervention_with_error_id(self):
        response = self.app.get('/api/v3/admin/intervention/25', headers=token_header(encode_token(1)))
        self.assertEqual(response.status_code, 404)
        data = response.data.decode()
        self.assertEqual(json.loads(data), error)

    def test_get_specific_admin_redflags_with_error_id(self):
        response = self.app.get('/api/v3/admin/red-flags/82', headers=token_header(encode_token(1)))
        self.assertEqual(response.status_code, 404)
        data = response.data.decode()
        self.assertEqual(json.loads(data), error)


    def test_intervention_update_record_with_error_id(self):
        response = self.app.patch('/api/v3/intervention/25/record', headers=token_header(encode_token(2)),
                                  data=json.dumps(new_record))
        self.assertEqual(response.status_code, 404)
        data = response.data.decode()
        self.assertEqual(json.loads(data), error)

    def test_redflag_update_record_with_error_id(self):
        response = self.app.patch('/api/v3/red-flags/12/record', headers=token_header(encode_token(2)),
                                  data=json.dumps(new_record))
        self.assertEqual(response.status_code, 404)
        data = response.data.decode()
        self.assertEqual(json.loads(data), error)

    def test_delete_intervention_with_error_id(self):
        response = self.app.delete('/api/v3/intervention/30', headers=token_header(encode_token(2)))
        self.assertEqual(response.status_code, 404)
        data = response.data.decode()
        self.assertEqual(json.loads(data), error)

    def test_delete_redflag_with_error_id(self):
        response = self.app.delete('/api/v3/red-flags/35', headers=token_header(encode_token(2)))
        self.assertEqual(response.status_code, 404)
        data = response.data.decode()
        self.assertEqual(json.loads(data), error)

    def test_create_redflag_key_error(self):
        response = self.app.post('/api/v3/red-flags', headers=token_header(encode_token(2)),
                                 data=json.dumps(new_error_redflag))
        self.assertEqual(response.status_code, 400)
        data = response.data.decode()
        message = {"message": invalid_key_msg}
        self.assertEqual(json.loads(data)["message"], message["message"])

    def test_create_redflag_bad_error(self):
        response = self.app.post('/api/v3/red-flags', headers=token_header(encode_token(2)),
                                 data=json.dumps(new_bad_redflag))
        self.assertEqual(response.status_code, 400)
        data = response.data.decode()
        message = {"message": invalid_key_msg}
        self.assertEqual(json.loads(data)["message"], message["message"])

    def test_create_intervention_key__error(self):
        response = self.app.post('/api/v3/intervention', headers=token_header(encode_token(2)),
                                 data=json.dumps(new_error_intervention))
        self.assertEqual(response.status_code, 400)
        data = response.data.decode()
        message = {"message": invalid_key_msg}
        self.assertEqual(json.loads(data)["message"], message["message"])

    def test_create_intervention_bad__error(self):
        response = self.app.post('/api/v3/intervention', headers=token_header(encode_token(2)),
                                 data=json.dumps(new_bad_intervention))
        self.assertEqual(response.status_code, 400)
        data = response.data.decode()
        message = {"message": invalid_key_msg}
        self.assertEqual(json.loads(data), message)

    def test_create_intervention_user__error(self):
        response = self.app.post('/api/v3/intervention', headers=token_header(encode_token(1)),
                                 data=json.dumps(new_bad_intervention))
        self.assertEqual(response.status_code, 401)
        data = response.data.decode()
        message = {"messsage": "Login as a user to can access this route"}
        self.assertEqual(json.loads(data), message)

    def test_intervention_update_status_with_error_id(self):
        response = self.app.patch('/api/v3/intervention/12/status', headers=token_header(encode_token(1)),
                                  data=json.dumps(new_status))
        self.assertEqual(response.status_code, 404)
        data = response.data.decode()
        self.assertEqual(json.loads(data), error)

    def test_redflag_update_status_with_error_id(self):
        response = self.app.patch('/api/v3/red-flags/10/status', headers=token_header(encode_token(1)),
                                  data=json.dumps(new_status))
        self.assertEqual(response.status_code, 404)
        data = response.data.decode()
        self.assertEqual(json.loads(data), error)

    def test_record_update_not_possible(self):
        response = self.app.patch('/api/v3/red-flags/4/record', headers=token_header(encode_token(2)),
                                  data=json.dumps(new_record))
        self.assertEqual(response.status_code, 406)
        data = response.data.decode()
        message = {"status": 406, "message": "Sorry, Update not Possible"}
        self.assertEqual(json.loads(data), message)


    def test_teardown(self):
        self.db = DatabaseConnection()
        self.db.cursor.execute(open('drop.sql', 'r').read())

if __name__ == '__main__':
    unittest.main()
