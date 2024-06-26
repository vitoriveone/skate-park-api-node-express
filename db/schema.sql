CREATE DATABASE skatepark;

\c skatepark

CREATE TABLE skaters (
    id SERIAL PRIMARY KEY,
    email VARCHAR(50) NOT NULL,
    nombre VARCHAR(25) NOT NULL,
    password VARCHAR(25) NOT NULL,
    anos_experiencia INT NOT NULL,
    especialidad VARCHAR(50) NOT NULL,
    foto VARCHAR(255),
    estado BOOLEAN NOT NULL DEFAULT false,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO skaters (email, nombre, password, anos_experiencia, especialidad, foto, estado) VALUES
('tony.hawk@th.com','Tony Hawk','123456','12','Kickflip','tony.jpg',true),
('evelien.bouilliart@eb.com','Evelien Bouilliart','123456','10','Heelflip','Evelien.jpg',false),
('danny.way@dw.com','Danny Way','123456','8','Ollie','Danny.jpg',false);