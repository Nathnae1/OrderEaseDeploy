-- Use the mydb database
USE mydb;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

INSERT INTO users (email, password) VALUES
('abebe.kebede@example.com', '$2a$10$examplehashedpassword1'),
('hana.abraham@example.com', '$2a$10$examplehashedpassword2'),
('jemal.mohammed@example.com', '$2a$10$examplehashedpassword3'),
('marta.tadesse@example.com', '$2a$10$examplehashedpassword4'),
('mulu.sisay@example.com', '$2a$10$examplehashedpassword5'),
('solomon.tesfaye@example.com', '$2a$10$examplehashedpassword6');
