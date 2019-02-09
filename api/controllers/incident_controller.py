import psycopg2
import datetime
from flask import jsonify,request
from api.helpers.mailhelper import status_emailing
from api.helpers.auth import get_current_user
from api.models.database_model import DatabaseConnection


db =DatabaseConnection()


def get_incidents_by_type(incident_type):
    sql_command="""SELECT incident_id,title,created_by,incident_Type,
            comment,status_,created_On,latitude,
            longtitude FROM incidents WHERE incident_Type='{}';""".format(incident_type)
    db.cursor.execute(sql_command)
    incident=db.cursor.fetchall()
    return incident

def get_incidents_by_type_id(incident_type,incident_id):
    sql_command="""SELECT incident_id,title,created_by,incident_Type,
            comment,status_,created_On,latitude,
            longtitude FROM incidents WHERE incident_Type='{}' AND
             incident_id='{}';""".format(incident_type,incident_id)
    db.cursor.execute(sql_command)
    incident=db.cursor.fetchone()
    return incident

def get_incidents_by_type_given_user(incident_type):
    sql_command="""SELECT incident_id,title,created_by,incident_Type,
            comment,status_,created_On,latitude,
            longtitude FROM incidents WHERE incident_Type='{}' AND
             created_by='{}';""".format(incident_type,1)#get_current_user()["userId"])
    db.cursor.execute(sql_command)
    incident=db.cursor.fetchall()
    return incident

def get_incidents_by_type_id_and_user(incident_type,incident_id):
    sql_command="""SELECT incident_id,title,created_by,incident_Type,
            comment,status_,created_On,latitude,
            longtitude FROM incidents WHERE incident_Type='{}'
             AND incident_id='{}' AND created_by='{}';""".format(incident_type,
                incident_id,1)#get_current_user()["userId"])
    try:
        db.cursor.execute(sql_command)
    except psycopg2.ProgrammingError:
        return "No Incident record"
    incident=db.cursor.fetchone()
    return incident



def get_incidents_by_status_and_user(incident_type,incId):
    data=request.get_json()
    incident=get_incidents_by_type_id_and_user(incident_type,incId)
    sql_command="""SELECT incident_id,title,created_by,incident_Type,
            comment,status_,created_On,latitude,
            longtitude FROM incidents WHERE incident_Type='{}' AND status_='draft' AND 
            incident_id='{}' AND created_by='{}';""".format(incident_type,incId,1)#get_current_user()["userId"])
    db.cursor.execute(sql_command)
    incident_status=db.cursor.fetchone()
    if not incident:
        return jsonify({"status":404,"error": "Sorry, Incident Not Found"}),404
    elif not incident_status:
        return jsonify({"status":406,"error": "Sorry, Update not Possible"}),406
    elif not data:
        return jsonify({"status":406,"error":"Sorry, No input value is inserted"}),406


def create_incident(incident_type):
    data = request.get_json()
    sql_command="""INSERT INTO incidents (title,created_By,incident_Type,
        comment,status_,created_On,latitude,longtitude)
        VALUES ('{}','{}','{}','{}','draft',now(),'{}','{}')
         RETURNING incident_id;""".format(data["title"],1,#get_current_user()["userId"],
            incident_type,data["comment"],data["latitude"],
            data["longtitude"])
    try:
        db.cursor.execute(sql_command)
    except psycopg2.IntegrityError:
        return jsonify({"comment": "Incident already exist"}),406
    incident=db.cursor.fetchone()
    return incident


def update_incident_by_user(incident_type,incident_Id):
    data = request.get_json()
    sql_command="""UPDATE incidents SET (latitude,longtitude,comment) = ('{}','{}','{}')
                WHERE incident_Type='{}' AND incident_id='{}' AND created_By='{}'
                 RETURNING incident_id;""".format(data['latitude'],data['longtitude'],
                    data['comment'],incident_type,incident_Id,1)#get_current_user()["userId"])
    try:
        db.cursor.execute(sql_command)
    except psycopg2.IntegrityError:
        return jsonify({"message": "Sorry, comments not accepted, make some change"}),406
    incident=db.cursor.fetchone()
    return incident   


def delete_incident(incident_tpye,incident_Id):
    sql_command="""DELETE FROM incidents WHERE incident_Type = '{}'
                 AND incident_Id = '{}' AND created_By='{}'
             RETURNING incident_Id;""".format(incident_tpye,incident_Id,1)#get_current_user()["userId"])
    db.cursor.execute(sql_command)
    incident=db.cursor.fetchone()
    return incident


def update_incident_status(incident_type,incident_Id):
    data = request.get_json()
    sql_command="""UPDATE incidents SET status_='{}'
                WHERE incident_Type='{}' AND incident_id='{}' 
                RETURNING incident_id;""".format(data['status'],incident_type,incident_Id)
    db.cursor.execute(sql_command)
    incident=db.cursor.fetchone()
    return incident


def mailme(incident_type,myid):
    sql_command="""SELECT 
            users.user_Name,
            users.email,
            tbl_name.status_,
            tbl_name.incident_Id
        FROM incidents tbl_name
        LEFT JOIN users ON tbl_name.created_By=users.user_Id
        WHERE tbl_name.incident_Type='{}' AND tbl_name.incident_Id='{}';""".format(incident_type,myid)
    db.cursor.execute(sql_command)
    me = db.cursor.fetchone()
    hello=status_emailing(me["email"],me["user_name"],me["incident_id"],me["status_"])
    return hello

