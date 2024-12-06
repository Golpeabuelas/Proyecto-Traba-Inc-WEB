CREATE DATABASE if NOT EXISTS TrabaInc;

USE TrabaInc;

CREATE TABLE if NOT EXISTS usuario(
    id_usuario INT PRIMARY KEY auto_increment,
    nombre varchar(50) NOT NULL,
    correo varchar(50) NOT NULL UNIQUE,
    password varchar(50) NOT NULL,
    foto_usuario MEDIUMTEXT NOT NULL,
    permisos boolean NOT NULL
);

CREATE TABLE if NOT EXISTS mascota(
	id_mascota INT PRIMARY KEY auto_increment,
    id_usuario INT, 
    nombre_mascota varchar(50) NOT NULL,
    especie_mascota varchar(50) NOT NULL,
    foto_mascota MEDIUMTEXT NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE if NOT EXISTS ubicacion_usuario(
    id_usuario INT PRIMARY KEY,
    latitud DECIMAL(8,6) NOT NULL,
    longitud DECIMAL(9,6) NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE if NOT EXISTS publicacion(
    id_publicacion INT PRIMARY KEY auto_increment,
    id_usuario INT NOT NULL,
    titulo_publicacion VARCHAR(50) NOT NULL,
    fecha_publicacion DATETIME NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE if NOT EXISTS chat_publicacion(
    id_chat INT PRIMARY KEY auto_increment,
    id_publicacion INT NOT NULL,
    FOREIGN KEY (id_publicacion) REFERENCES publicacion(id_publicacion)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);   

CREATE TABLE if NOT EXISTS mensaje_chat(
	id_mensaje INT PRIMARY KEY auto_increment,
    id_chat INT NOT NULL,
    id_usuario INT NOT NULL,
    mensaje varchar(300) NOT NULL,
    FOREIGN KEY (id_chat) REFERENCES chat_publicacion(id_chat)
    ON DELETE CASCADE 
    ON UPDATE CASCADE,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
    ON DELETE CASCADE 
    ON UPDATE CASCADE
);

CREATE TABLE if NOT EXISTS informacion_mascota(
    id_publicacion INT PRIMARY KEY,
    imagen_mascota MEDIUMTEXT NOT NULL,
    nombre_mascota VARCHAR(50) NOT NULL,
    especie_mascota VARCHAR(50) NOT NULL,
    color_mascota VARCHAR(50) NOT NULL,
    distintivo_mascota VARCHAR(50) NOT NULL,
    FOREIGN KEY (id_publicacion) REFERENCES publicacion(id_publicacion)
);

CREATE TABLE if NOT EXISTS informacion_desaparicion(
    id_publicacion INT PRIMARY KEY,
    fecha_desaparicion DATE NOT NULL,
    descripcion_desaparicion varchar(300),
    estatus_desaparicion BOOLEAN NOT NULL,
    estatus_reporte BOOLEAN NOT NULL,
    FOREIGN KEY (id_publicacion) REFERENCES publicacion(id_publicacion)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE if NOT EXISTS ubicacion_desaparicion(
    id_publicacion INT PRIMARY KEY,
    latitud DECIMAL(8,6) NOT NULL,
    longitud DECIMAL(9,6) NOT NULL,
    FOREIGN KEY (id_publicacion) REFERENCES publicacion(id_publicacion)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE if NOT EXISTS usuario_chat_publicacion(
    id_usuario INT,
    id_chat INT,
    PRIMARY KEY (id_usuario, id_chat),
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    FOREIGN KEY (id_chat) REFERENCES chat_publicacion(id_chat)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);
