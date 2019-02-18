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
    form = allowed_image(file.filename)
    if not file:
        return jsonify({"status":406,"message":"No selected file"}), 406
    if not form:
        return jsonify({"status":406,"message":"Image format not allowed"}), 406
    if file and allowed_image(file.filename):
        sql_command = """INSERT INTO images (imagename,incident_Id) VALUES ('{}','{}');""".format(file.filename,incident_Id)
        db.cursor.execute(sql_command)
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        return redirect(url_for('uploaded_file',filename=filename))


def upload_video(incident_Id):
    file = request.files['file']
    form = allowed_video(file.filename)
    if not file:
        return jsonify({"status":406,"message":"No selected file"}), 406
    if not form:
        return jsonify({"status":406,"message":"Video format not allowed"}), 406
    if file and allowed_video(file.filename):
        sql_command = """INSERT INTO videos (videoname,incident_Id) VALUES ('{}','{}');""".format(file.filename,incident_Id)
        db.cursor.execute(sql_command)
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        # return redirect(url_for('uploaded_file',filename=filename))
        return filename


def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'],filename)