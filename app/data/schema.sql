CREATE DATABASE IF NOT EXISTS dsfp;
USE dsfp;

/* Referee table */
DROP TABLE IF EXISTS referee;
CREATE TABLE referee (
	referee_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    grade INT(1),
    skill INT(3)
);

INSERT INTO referee (referee_id, first_name, last_name, grade, skill) VALUES 
(1, 'Tom', 'Gregory', 1, 100),
(2, 'Joshua', 'Dennis', 2, 95),
(3, 'Hillol', 'Bala', 5, 70),
(4, 'Alex', 'Lopes', 7, 50),
(5, 'Bipin', 'Prabhakar', 5, 60);



/* Game table */
DROP TABLE IF EXISTS game;
CREATE TABLE game (
	game_id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(100) NOT NULL,
    field VARCHAR(50) NOT NULL,
    date DATE NOT NULL DEFAULT(CURRENT_DATE),
    time VARCHAR(8) NOT NULL DEFAULT("12:00 PM"),
    level VARCHAR(50)
);

INSERT INTO game (game_id, title, field, date, time, level) VALUES 
(1, 'NCAA College Cup', 'Lucas Oil Stadium', '2021-11-10', '16:00', 'High'),
(2, 'Indiana University V. Purdue', 'Ross–Ade Stadium', '2021-09-23', '14:30', 'Normal'),
(3, 'Indiana Univeristy Practice Match', 'Indiana University Memorial Stadium', '2021-08-26', '12:00', 'Low');



/* Assignment table */
DROP TABLE IF EXISTS assignment;

CREATE TABLE assignment (
	assignment_id INT PRIMARY KEY AUTO_INCREMENT,
	referee_id INT NOT NULL,
    game_id INT NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT("Unassigned")
);

INSERT INTO assignment (referee_id, game_id, status) VALUES 
(1, 1, 'Accepted'),
(2, 1, 'Accepted'),
(3, 1, 'Assigned'),
(4, 1, 'Tentative'),
(5, 1, 'Tentative'),
(2, 2, 'Accepted'),
(1, 2, 'Accepted'),
(3, 2, 'Accepted'),
(1, 3, 'Accepted');