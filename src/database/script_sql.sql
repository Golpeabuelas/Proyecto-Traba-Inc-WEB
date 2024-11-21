create database if not exists TrabaInc

use TrabaInc

create table if not exists usuario(
	id_usuario int primary key auto_increment not null,
    nombre varchar(50) not null,
    correo varchar(50) not null,
    password varchar(50) not null,
    permisos boolean not null
);

create table if not exists publicacion{
    id_publicacion int primary key auto_increment not null,
    titulo varchar(50) not null,
    ubicacion
}