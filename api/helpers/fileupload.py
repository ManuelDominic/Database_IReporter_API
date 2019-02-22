import os
import uuid
from flask import Flask, jsonify, request, redirect, url_for, send_from_directory
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
    form = allowed_image(file.filename)
    if not file:
        return jsonify({"status":406,"message":"No selected file"}), 406
    elif not form:
        return jsonify({"status":406,"message":"Image format not supported"}), 406
    elif file and allowed_image(file.filename):
        filename = secure_filename(file.filename)
        extention = filename.rsplit(".", 1)[1]
        new_name = str(uuid.uuid1()) + '.' + str(extention)
        new_name = str(new_name).replace("-", "")
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], new_name))
        sql_command = """INSERT INTO images (imagename,incident_Id) VALUES ('{}','{}');""".format(new_name,incident_Id)
        db.cursor.execute(sql_command)
        return jsonify({"file":file,"message":"Image successfully uploaded"}), 200


def upload_video(incident_Id):
    file = request.files['file']
    form = allowed_video(file.filename)
    if not file:
        return jsonify({"status":406,"message":"No selected file"}), 406
    elif not form:
        return jsonify({"status":406,"message":"Video format not supported"}), 406
    elif file and allowed_video(file.filename):        
        filename = secure_filename(file.filename)
        extention = filename.rsplit(".", 1)[1]
        new_name = str(uuid.uuid1()) + '.' + str(extention)
        new_name = str(new_name).replace("-", "")
        sql_command = """INSERT INTO videos (videoname,incident_Id) VALUES ('{}','{}');""".format(new_name,incident_Id)
        db.cursor.execute(sql_command)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], new_name))
        return jsonify({"file":new_name,"message":"Video successfully uploaded"}), 200


def get_media(media_type,filename):
    directory = app.config['UPLOAD_FOLDER']
    return send_from_directory(directory, filename)
