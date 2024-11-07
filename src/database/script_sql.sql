create database TrabaInc

use database TrabaInc

create table usuario(
	id_usuario int primary key auto_increment not null,
    nombre varchar(50) not null,
    correo varchar(50) not null,
    password varchar(50) not null,
    permisos boolean not null
);