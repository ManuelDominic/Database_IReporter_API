from os import environ
from flask import Flask
from flask_mail import Mail, Message

app =Flask(__name__)
mail=Mail(app)

app.config['MAIL_SERVER']='smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = environ.get("MAIL_USERNAME")
app.config['MAIL_PASSWORD'] = environ.get("MAIL_PASSWORD")
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True


def status_emailing(user_email,user_name,incident_Id,incident_status):
	msg = Message('Hello', sender = 'ireportermanueldominic@gmail.com', recipients = [user_email])
	msg.body = "Hello '{}', Incidents '{}' is '{}'. Thank you please.".format(user_name,incident_Id,incident_status)
	mail.send(msg)
	return "Email sent"


app.route('/emma', method='GET')
def sms_email():
	mess = status_emailing('ematembu2@gmail.com','Manuel','5','Resolved')
	return mess
