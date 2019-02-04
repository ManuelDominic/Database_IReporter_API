# /users = {
#     "data": [
#         [
#             {
#                 "email": "irepotermanuel@gmail.com",
#                 "first_name": "Admin",
#                 "isadmin": true,
#                 "joinning": "Thu, 10 Jan 2019 04:01:14 GMT",
#                 "last_name": "Adminlast_Name",
#                 "other_name": "other_Name",
#                 "passwd": "pbkdf2:sha256:50000$LuGTCgii$fd0a6cc9c7e7f70f1b2b76af0a76f217e3ce90b603068d0bb27b67f190de8eb3",
#                 "phone_number": "256788084708",
#                 "user_id": 13,
#                 "user_name": "admin"
#             },
#             {
#                 "email": "ematembu2@gmail.com",
#                 "first_name": "Emmanuel",
#                 "isadmin": false,
#                 "joinning": "Thu, 10 Jan 2019 04:06:37 GMT",
#                 "last_name": "Matembu",
#                 "other_name": "Dominic",
#                 "passwd": "pbkdf2:sha256:50000$sQueRoWd$816cacdef85cee03292df7cb84af19f9a0fb10a547d31178d9fccdf55fe80698",
#                 "phone_number": "5655700701616",
#                 "user_id": 14,
#                 "user_name": "Manuel"
#             }
#         ]
#     ],
#     "status": 200
# }


# /auth/signup response = {
#     "data": {
#         "email": "ematembu2@gmail.com",
#         "first_name": "Emmanuel",
#         "isadmin": false,
#         "joinning": "Thu, 10 Jan 2019 06:27:04 GMT",
#         "last_name": "Matembu",
#         "other_name": "Dominic",
#         "phone_number": "5655700701616",
#         "user_id": 18,
#         "user_name": "Manuel"
#     },
#     "message": "Successfully registered",
#     "status": 201,
#     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE4LCJleHAiOjE1NDcxNzcyMjR9.XTiS2uKbT9yncfhvN4T_DW7z1ViPMibXBTr7hi9ptNU"
# }
# /auth/signup = {
# 	"email": "ematembu2@gmail.com",
#     "firstName": "Emmanuel",
#     "lastName": "Matembu",
#     "otherName": "Dominic",
#     "password": "Admin123",
#     "phoneNumber": 5655700701616,
#     "userName": "Manuel"
# }

# /auth/login response = {
#     "message": "Successfully logged In",
#     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE4LCJleHAiOjE1NDcxNzczMTR9.uNXklL1fU_gfXhK8u4AM-nadyI2kkLa7BWQMkUb3_6I"
# }
# /auth/login = {
# 	"email": "ematembu2@gmail.com",
#     "password": "Admin123"
# }

# /red-flags create response = {
#     "Data": [
#         {
#             "incident_id": 5
#         },
#         {
#             "message": "Redflag Successfully created"
#         }
#     ],
#     "status": 201
# }

# /red-flags create = {
#         "title":"Road breakdown",
#         "comment": "james idle and disorderly",
#         "images": "1.jpeg",
#         "latitude": 5.38974,
#         "longtitude": 0.33737,
#         "videos": "1.gif"
# }

# /red-flags get = {
#     "data": [
#         {
#             "comment": "james idle and disorderly",
#             "created_by": 18,
#             "created_on": "Thu, 10 Jan 2019 06:36:45 GMT",
#             "images": "1.jpeg",
#             "incident_id": 1,
#             "incident_type": "interventon",
#             "latitude": 5.38974,
#             "longtitude": 0.33737,
#             "status_": "draft",
#             "title": "Road breakdown",
#             "videos": "1.gif"
#         }
#     ],
#     "status": 200
# }

# /red-flags/1/comment response = {
#     "Data": [
#         {
#             "incident_id": 1
#         },
#         {
#             "message": "intervention comment successfully Updated"
#         }
#     ],
#     "status": 200
# }

# /red-flags/1/comment = {
# 	"comment":2
# }

# /red-flags/1/location = {
# 	"latitude":25.5585,
# 	"longititude":55.6866
# }

# /red-flags/1/location response = {
#     "Data": [
#         [
#             {
#                 "incident_id": 1
#             }
#         ],
#         {
#             "message": "intervention location successfully Updated"
#         }
#     ],
#     "status": 200
# }

# /red-flags/1/status response = {
#     "Data": [
#         {
#             "incident_id": 5
#         },
#         {
#             "message": "Redflag status successfully Updated"
#         },
#         {
#             "Email": "Email sent"
#         }
#     ],
#     "status": 200
# }

# /red-flags/1/status = {
# 	"status":"Resolved"
# }
