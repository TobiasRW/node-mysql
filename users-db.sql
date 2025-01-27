-- Delete a database
DROP DATABASE IF EXISTS users_db;

-- Create a database
CREATE DATABASE users_db;

-- Select and use database, users_db
USE users_db;

-- Create a New Table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    mail VARCHAR(255) UNIQUE NOT NULL,
    title VARCHAR(100),
    image TEXT
);

-- insert
INSERT INTO users (name, mail, title, image) VALUES ('Peter Lind', 'petl@kea.dk', 'Senior Lecturer', 'https://share.cederdorff.dk/images/petl.jpg');
INSERT INTO users (name, mail, title, image) VALUES ('Rasmus Cederdorff', 'race@eaaa.dk', 'Senior Lecturer', 'https://cederdorff.com/img/race.webp');
INSERT INTO users (name, mail, title, image) VALUES ('Anne Kirketerp', 'anki@eaaa.dk', 'Head of Education', 'https://www.eaaa.dk/media/5buh1xeo/anne-kirketerp.jpg?width=850&height=450');
INSERT INTO users (name, mail, title, image) VALUES ('Dan Okkels Brendstrup', 'dob@eaaa.dk','Lecturer', 'https://www.eaaa.dk/media/bdojel41/dan-okkels-brendstrup.jpg?width=850&height=450');
INSERT INTO users (name, mail, title, image) VALUES ('Kasper Fischer Topp', 'kato@eaaa.dk','Lecturer', 'https://www.eaaa.dk/media/lxzcybme/kasper-topp.jpg?width=850&height=450');
INSERT INTO users (name, mail, title, image) VALUES ('Morten Algy Bonderup', 'moab@eaaa.dk','Senior Lecturer', 'https://www.eaaa.dk/media/hi4lv5hw/morten-algy-bonderup.jpg?width=850&height=450');
INSERT INTO users (name, mail, title, image) VALUES ('Maria Louise Bendixen', 'mlbe@eaaa.dk','Senior Lecturer', 'https://www.eaaa.dk/media/b5ahrlra/maria-louise-bendixen.jpg?width=850&height=450');