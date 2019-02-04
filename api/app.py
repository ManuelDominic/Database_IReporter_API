
# import os
# from flask import Flask, request, redirect, url_for, send_from_directory
from flask import Flask
from flask_cors import CORS
# from api.helpers.fileupload import app
from api.routes.user_route import user_bp
from api.routes.redflag_route import redflag_bp
from api.routes.intervention_route import intervention_bp
# from werkzeug import secure_filename

# UPLOAD_FOLDER = 'uploads'
# ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])

app = Flask(__name__)
# app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
cors = CORS(app)

app.register_blueprint(user_bp)
app.register_blueprint(redflag_bp)
app.register_blueprint(intervention_bp)


# def allowed_file(filename):
#   # this has changed from the original example because the original did not work for me
#     return filename[-3:].lower() in ALLOWED_EXTENSIONS

# @app.route('/uploads', methods=['POST'])
# def upload_file():
#     file = request.files['file']
#     if file and allowed_file(file.filename):
#         # print('**found file', file.filename)
#         # f"""INSERT INTO files (filename) VALUES ('{file.filename}');"""
#         filename = secure_filename(file.filename)
#         file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
#         # for browser, add 'redirect' function on top of 'url_for'
#         return url_for('uploaded_file',filename=filename)
#     return "False"

# @app.route('/uploads/<filename>')
# def uploaded_file(filename):
#     return send_from_directory(app.config['UPLOAD_FOLDER'],filename)

# if __name__ == '__main__':
# 	app.run(debug=True)
