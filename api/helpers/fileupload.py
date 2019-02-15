import os
from flask import Flask, request, redirect, url_for, send_from_directory
from api.models.database_model import DatabaseConnection
from werkzeug import secure_filename

db=DatabaseConnection()

UPLOAD_FOLDER = 'uploads/'
ALLOWED_IMAGE_EXTENSIONS = set(['pdf', 'png', 'jpg', 'jpeg', 'gif'])
ALLOWED_VIDEO_EXTENSIONS = set(['wmv','Flv','mp4','mkv'])

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def allowed_image(filename):
    return filename.rsplit(".", 1)[1] in ALLOWED_IMAGE_EXTENSIONS

def allowed_video(filename):
    return filename.rsplit(".", 1)[1] in ALLOWED_VIDEO_EXTENSIONS


def upload_image(incident_Id):
    file = request.files['file']
    if file and allowed_image(file.filename):
        sql_command = """INSERT INTO files (filename,incident_Id) VALUES ('{}','{}');""".format(file.filename,incident_Id)
        db.cursor.execute(sql_command)
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        return filename


def upload_video(incident_Id):
    file = request.files['file']
    if file and allowed_video(file.filename):
        sql_command = """INSERT INTO files (filename,incident_Id) VALUES ('{}','{}');""".format(file.filename,incident_Id)
        db.cursor.execute(sql_command)
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        return filename

