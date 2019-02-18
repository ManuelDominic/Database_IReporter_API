
CREATE TABLE IF NOT EXISTS "users" (
   user_Id BIGSERIAL  PRIMARY KEY  NOT NULL,
   first_Name VARCHAR (255)   NOT NULL,
   last_Name VARCHAR (255)   NOT NULL,
   email VARCHAR (255) UNIQUE NOT NULL,
   user_Name VARCHAR (255)  NOT NULL ,
   phone_Number VARCHAR (255)  NOT NULL, 
   Passwd VARCHAR (255)   NOT NULL,
   isAdmin BOOLEAN   NOT NULL  DEFAULT FALSE,
   joinning timestamp   NOT NULL
);


CREATE TABLE IF NOT EXISTS "tokens" (
   Id BIGSERIAL  PRIMARY KEY  NOT NULL,
   user_Id BIGSERIAL  NOT NULL,
   token VARCHAR (255)   NOT NULL,
   FOREIGN KEY (user_Id) REFERENCES users (user_Id) ON DELETE CASCADE,
   FOREIGN KEY (user_Id) REFERENCES users (user_Id) ON UPDATE CASCADE
);


CREATE TABLE IF NOT EXISTS "incidents" (
   incident_Id BIGSERIAL  PRIMARY KEY  NOT NULL,
   title  VARCHAR (50) NOT NULL,
   created_By  BIGSERIAL  NOT NULL,
   incident_Type VARCHAR (255) NOT NULL,
   comment  VARCHAR (255) UNIQUE NOT NULL,
   status_  VARCHAR (255)  NOT NULL DEFAULT 'draft',
   created_On  timestamp NOT NULL,
   latitude FLOAT(6) NOT NULL ,
   longtitude  FLOAT(6) NOT NULL,
   FOREIGN KEY (created_By) REFERENCES users (user_Id) ON DELETE CASCADE,
   FOREIGN KEY (created_By) REFERENCES users (user_Id) ON UPDATE CASCADE
);


CREATE TABLE IF NOT EXISTS "images" (
   Id BIGSERIAL  PRIMARY KEY  NOT NULL,
   incident_Id BIGSERIAL  NOT NULL,
   imagename VARCHAR (255)   NOT NULL,
   FOREIGN KEY (incident_Id) REFERENCES incidents (incident_Id) ON DELETE CASCADE,
   FOREIGN KEY (incident_Id) REFERENCES incidents (incident_Id) ON UPDATE CASCADE
);


CREATE TABLE IF NOT EXISTS "videos" (
   Id BIGSERIAL  PRIMARY KEY  NOT NULL,
   incident_Id BIGSERIAL  NOT NULL,
   videoname VARCHAR (255)   NOT NULL,
   FOREIGN KEY (incident_Id) REFERENCES incidents (incident_Id) ON DELETE CASCADE,
   FOREIGN KEY (incident_Id) REFERENCES incidents (incident_Id) ON UPDATE CASCADE
);
