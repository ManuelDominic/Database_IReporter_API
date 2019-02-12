from flask import Blueprint, jsonify, request,make_response
from api.helpers.auth import token_required, admin_required, non_admin_required,get_current_user
from api.controllers.incident_controller import mailme,get_incidents_by_status_and_user,get_incidents_by_type_id_and_user,get_incidents_by_type_given_user,get_incidents_by_type,get_incidents_by_type_id,create_incident,update_incident_by_user,update_incident_status,delete_incident
from api.helpers.validators import verify_create_incident_data,verify_update_data
from api.helpers.fileupload import upload_image,upload_video
from api.models.database_model import DatabaseConnection


db= DatabaseConnection

intervention_bp = Blueprint('intervention_bp', __name__, url_prefix='/api/v3')


@intervention_bp.route("/")
def index():
    return jsonify({"IReporter": "This enables any/every citizen to bring"
                " any form of corruption to the notice of appropriate"
                " authorities and the general public."}),200


@intervention_bp.route('/admin/intervention', methods=['GET'])
@token_required
@admin_required
def get_intervention_by_admin():
    intervention=get_incidents_by_type('intervention')
    if intervention:
        return jsonify({"status": 200, "data":intervention}), 200
    return not_found()


@intervention_bp.route('/admin/intervention/<int:intervention_Id>', methods=['GET'])
@token_required
@admin_required
def get_specific_intervention_by_admin(intervention_Id):
    intervention=get_incidents_by_type_id('intervention',int(intervention_Id))
    if intervention:
        return jsonify({"status": 200, "data":intervention}), 200
    return not_found()


@intervention_bp.route('/user/intervention', methods=['GET'])
@token_required
@non_admin_required
def get_intervention_by_user():
    intervention=get_incidents_by_type_given_user('intervention')
    if intervention:
        return jsonify({"status": 200, "data":intervention}), 200
    return not_found()


@intervention_bp.route('/user/intervention/<int:intervention_Id>', methods=['GET'])
@token_required
@non_admin_required
def get_specific_intervention_by_user(intervention_Id):
    intervention=get_incidents_by_type_id_and_user('intervention',int(intervention_Id))
    if intervention:
        return jsonify({"status": 200, "data":intervention}), 200
    return not_found()



@intervention_bp.route('/intervention', methods=['POST'])
@token_required
@non_admin_required
@verify_create_incident_data
def create_intervention():
    incident=create_incident('intervention')
    if incident:
        return  jsonify({"status":201,"message": "Intervention Successfully created"}), 201
    return bad_request()


@intervention_bp.route('/intervention/<int:intervention_Id>/record', methods=['PATCH'])
@token_required
@non_admin_required
@verify_update_data
def update_intervention_record(intervention_Id):
    can_not_edit=get_incidents_by_status_and_user('intervention',int(intervention_Id))
    incident=update_incident_by_user('intervention',int(intervention_Id))
    if can_not_edit:
        return can_not_edit
    elif incident:
        return jsonify({"status":200,"data":incident,
            "message": "Intervention record successfully Updated"}), 200
    return bad_request()  


@intervention_bp.route('/intervention/<int:intervention_Id>', methods=['DELETE'])
@token_required
@non_admin_required
def delete_intervention(intervention_Id):
    incident=get_incidents_by_type_id_and_user('intervention',int(intervention_Id))
    delete=delete_incident('intervention',int(intervention_Id))
    if not incident:
        return not_found()
    elif delete:
        return jsonify({"status":200,"data":delete,
            "message": "Intervention successfully Deleted"}), 200 
    return bad_request()


@intervention_bp.route('/intervention/<int:intervention_Id>/status', methods=['PATCH'])
@token_required
@admin_required
def update_intervention_status(intervention_Id):
    incident=get_incidents_by_type_id('intervention',int(intervention_Id))
    incident_status=update_incident_status('intervention',int(intervention_Id))
    if not incident:
        return not_found()
    elif incident_status:
        #mail=mailme("intervention",int(incident_status["incident_id"]))
        return jsonify({"status":200,"data":incident_status,
            "message": "Intervention status successfully Updated"}), 200 #,"Email":mail}), 200   
    return bad_request()



@intervention_bp.route('/intervention/<int:intervention_Id>/addImage', methods=['PATCH'])
@token_required
@non_admin_required
def redflag_upload_image(intervention_Id):
    file = upload_image(intervention_Id)
    if file:
        return jsonify({"status":200,"message":"Image successfully uploaded"}), 200
    return bad_request()


@intervention_bp.route('/intervention/<int:intervention_Id>/addVideo', methods=['PATCH'])
@token_required
@non_admin_required
def redflag_upload_video(intervention_Id):
    file = upload_video(intervention_Id)
    if file:
        return jsonify({"status":200,"message":"Video successfully uploaded"}), 200
    return bad_request()



def bad_request():
    return jsonify({"status":400, "message": "Sorry, Bad request"}),400

def not_found():
    return jsonify({"status":404, "message": "Sorry, Incident Not Found"}),404

def not_data():
    return jsonify({"status":406, "message": "Sorry, no input data found"}),406


