from flask import Blueprint, jsonify, request
from api.helpers.auth import token_required, admin_required, non_admin_required,get_current_user
from api.controllers.incident_controller import mailme,get_incidents_by_status_and_user,get_incidents_by_type_id_and_user,get_incidents_by_type_given_user,get_incidents_by_type,get_incidents_by_type_id,create_incident,update_incident_by_user,update_incident_status,delete_incident
from api.helpers.validators import verify_create_incident_data,verify_upadte_data
from api.helpers.fileupload import upload_image,upload_video
from api.models.database_model import DatabaseConnection


db= DatabaseConnection

redflag_bp = Blueprint('redflag_bp', __name__, url_prefix='/api/v3')



@redflag_bp.route('/admin/red-flags', methods=['GET'])
# @token_required
def get_all_redflags_by_admin():
    redflag=get_incidents_by_type('redflag')
    if redflag:
        return jsonify({"status": 200, "data": [redflag]}), 200
    return bad_request()


@redflag_bp.route('/admin/red-flags/<int:redflag_Id>', methods=['GET'])
# @token_required
def get_specific_redflag_by_admin(redflag_Id):
    redflag=get_incidents_by_type_id('redflag',int(redflag_Id))
    if redflag:
        return jsonify({"status": 200, "data":  [redflag]}), 200
    return not_found()


@redflag_bp.route('/user/red-flags', methods=['GET'])
# @token_required
def get_all_redflags_by_user():
    redflag=get_incidents_by_type_given_user('redflag')
    if redflag:
        return jsonify({"status": 200, "data":  [redflag]}), 200
    return bad_request()


@redflag_bp.route('/user/red-flags/<int:redflag_Id>', methods=['GET'])
# @token_required
def get_specific_redflag_by_user(redflag_Id):
    redflag=get_incidents_by_type_id_and_user('redflag',int(redflag_Id))
    if redflag:
        return jsonify({"status": 200, "data": redflag}), 200
    return not_found()



@redflag_bp.route('/red-flags', methods=['POST'])
# @token_required
@verify_create_incident_data
def create_redflag():
    incident=create_incident('redflag')
    if incident:
        return jsonify({"status":201,"data":incident,
            "message": "Redflag Successfully created"}), 201
    return bad_request()


@redflag_bp.route('/red-flags/<int:redflag_Id>/record', methods=['PATCH'])
# @token_required
@verify_upadte_data
def update_redflag_record(redflag_Id):
    not_incident_status=get_incidents_by_status_and_user('redflag',int(redflag_Id))
    incident=update_incident_by_user('redflag',int(redflag_Id))
    if not_incident_status:
        return not_incident_status
    elif incident:
        return jsonify({"status":200,"data":[incident,
            {"message": "Redflag location successfully Updated"}]}), 200
    return bad_request()


@redflag_bp.route('/red-flags/<int:redflag_Id>', methods=['DELETE'])
# @token_required
def delete_redflag(redflag_Id):
    not_found_id=get_incidents_by_type_id_and_user('redflag',int(redflag_Id))
    incident=delete_incident('redflag',redflag_Id)
    if not not_found_id:
        return not_found()
    if incident:
        return jsonify({"status":200,"data":[incident,
            {"message": "Redflag successfully Deleted"}]}), 200
    return bad_request()


@redflag_bp.route('/red-flags/<int:redflag_Id>/status', methods=['PATCH'])
# @token_required
def update_redflag_status(redflag_Id):
    not_incident_id=get_incidents_by_type_id('redflag',int(redflag_Id))
    incident=update_incident_status('redflag',int(redflag_Id))
    if not not_incident_id:
        return not_found()
    if incident:
        mail=mailme("redflag",int(incident["incident_id"]))
        return jsonify({"status":200,"data":incident,
            "message": "Redflag status successfully Updated","Email":mail}), 200
    return bad_request()


@redflag_bp.route('/<int:redflag_Id>/Addimage', methods=['POST'])
# @token_required
def redflag_upload_image(redflag_Id):
    file = upload_image(redflag_Id)
    return "Image successfully uploaded"


@redflag_bp.route('/<int:redflag_Id>/Addvideo', methods=['POST'])
# @token_required
def redflag_upload_video(redflag_Id):
    file = upload_video(redflag_Id)
    return "Video successfully uploaded"


def bad_request():
    return jsonify({"status":400, "error": "Sorry, Bad request"}),400

def not_found():
    return jsonify({"status":404, "error": "Sorry, Incident Not Found"}),404

def not_data():
    return jsonify({"status":406, "error": "Sorry, no input data found"}),406


