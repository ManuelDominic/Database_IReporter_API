INSERT INTO users (
   user_Id,first_Name,last_Name,email,
   user_Name,phone_Number,passwd,isAdmin,joinning)
 VALUES (1,'Admin','Adminlast_Name',
   'ireportermanueldominic@gmail.com','admin','0788084708',
   'pbkdf2:sha256:50000$pBGAhyZb$d0405efaf8d3bc9287e36cfd1594789b85193ddf07739886cc69b71a7e509032',
   TRUE,'Thu, 10 Jan 2019 04:01:14 GMT');


INSERT INTO users (
   user_Id,first_Name,last_Name,email,
   user_Name,phone_Number,passwd,isAdmin,joinning)
 VALUES (2,'manuel','manuellast_Name',
   'ematembu2@gmail.com','manuel',256700701616,
   'pbkdf2:sha256:50000$kEBD7Z97$97db32267f5d0956994c5db567ffda9f45cd6f136a7e2d0f9029f3d68b882b1c',
   FALSE,'Thu, 10 Jan 2019 04:01:14 GMT');


INSERT INTO incidents (incident_id,title,created_By,incident_Type,
   comment,status_,created_On,latitude,longtitude)
 VALUES (1,'Theift',2,'redflag','Arnold stole hassan phone and laptop from his car',
   'draft', 'Thu, 10 Jan 2019 04:01:14 GMT',5.38974,0.33737);

INSERT INTO incidents (incident_id,title,created_By,incident_Type,
   comment,status_,created_On,latitude,longtitude)
 VALUES (2,'Smuggling',2,'redflag','Every night at malamba boarders, people smuggle kenya rice into the country',
 'draft', 'Thu, 10 Jan 2019 04:01:14 GMT',5.38974,0.33737);

INSERT INTO incidents (incident_id,title,created_By,incident_Type,
   comment,status_,created_On,latitude,longtitude)
 VALUES (3,'Rape',2,'redflag','Timothy raped Jane last night at 11pm after breaking into her apartment',
 'Rejected', 'Thu, 10 Jan 2019 04:01:14 GMT',5.38974,0.33737);

INSERT INTO incidents (incident_id,title,created_By,incident_Type,
   comment,status_,created_On,latitude,longtitude)
 VALUES (4,'Rape',2,'redflag','Hadrico raped lona last month at 11pm after breaking into her apartment',
 'Rejected', 'Thu, 10 Jan 2019 04:01:14 GMT',5.38974,0.33737);



INSERT INTO incidents (incident_id,title,created_By,incident_Type,
   comment,status_,created_On,latitude,longtitude)
 VALUES (5,'Road Breakdown',2,'intervention','Mbale highway broken down after a previous track accident last month amonth ',
 'draft', 'Thu, 10 Jan 2019 04:01:14 GMT',5.38974,0.33737);

INSERT INTO incidents (incident_id,title,created_By,incident_Type,
   comment,status_,created_On,latitude,longtitude)
 VALUES (6,'Incoprate hospital services',2,'intervention','Mbarara medical facilities lack proper medication and labour ward services',
 'draft', 'Thu, 10 Jan 2019 04:01:14 GMT',5.38974,0.33737);

INSERT INTO incidents (incident_id,title,created_By,incident_Type,
   comment,status_,created_On,latitude,longtitude)
 VALUES (7,'Bridge construction',2,'intervention','Jinja bridge needs replacement because it is past its deadline date',
 'draft', 'Thu, 10 Jan 2019 04:01:14 GMT',5.38974,0.33737);


