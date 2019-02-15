
CREATE TABLE IF NOT EXISTS "users" (
   user_Id BIGSERIAL  PRIMARY KEY  NOT NULL,
   first_Name VARCHAR (255)   NOT NULL,
   last_Name VARCHAR (255)   NOT NULL,
   email  VARCHAR (255) UNIQUE NOT NULL,
   user_Name  VARCHAR (255)  NOT NULL ,
   phone_Number   VARCHAR (255)  NOT NULL, 
   Passwd VARCHAR (255)   NOT NULL,
   isAdmin  BOOLEAN   NOT NULL  DEFAULT FALSE,
   joinning  timestamp   NOT NULL
);

-- TRUNCATE TABLE users CASCADE;

-- INSERT INTO users (
--    user_Id,first_Name,last_Name,email,
--    user_Name,phone_Number,passwd,isAdmin,joinning)
--  VALUES (1,'Admin','Adminlast_Name',
--    'ireportermanueldominic@gmail.com','admin','0788084708',
--    'pbkdf2:sha256:50000$pBGAhyZb$d0405efaf8d3bc9287e36cfd1594789b85193ddf07739886cc69b71a7e509032',
--    TRUE,'Thu, 10 Jan 2019 04:01:14 GMT');

CREATE TABLE IF NOT EXISTS "tokens" (
   Id BIGSERIAL  PRIMARY KEY  NOT NULL,
   user_Id BIGSERIAL  NOT NULL,
   token VARCHAR (255)   NOT NULL,
   FOREIGN KEY (user_Id) REFERENCES users (user_Id) ON DELETE CASCADE,
   FOREIGN KEY (user_Id) REFERENCES users (user_Id) ON UPDATE CASCADE
);

-- TRUNCATE TABLE tokens CASCADE;


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

-- TRUNCATE TABLE incidents CASCADE;


CREATE TABLE IF NOT EXISTS "files" (
   Id BIGSERIAL  PRIMARY KEY  NOT NULL,
   incident_Id BIGSERIAL  NOT NULL,
   filename VARCHAR (255)   NOT NULL,
   FOREIGN KEY (incident_Id) REFERENCES incidents (incident_Id) ON DELETE CASCADE,
   FOREIGN KEY (incident_Id) REFERENCES incidents (incident_Id) ON UPDATE CASCADE
);

-- TRUNCATE TABLE files CASCADE;