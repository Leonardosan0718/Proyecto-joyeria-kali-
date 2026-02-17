CREATE DATABASE Joyeria;

USE Joyeria;

CREATE TABLE Productos (
    ID INT PRIMARY KEY,
    Nombre VARCHAR(100),
    Categoria VARCHAR(50), -- Anillo, Reloj
    Estilo VARCHAR(50),    -- Minimalista, Vintage, etc.
    Precio DECIMAL(10,2),
    Imagen_URL VARCHAR(255)
);