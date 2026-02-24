CREATE TABLE Productos (
    ID INT PRIMARY KEY IDENTITY(1,1), 
    Nombre NVARCHAR(100) NOT NULL,
    Descripcion NVARCHAR(MAX),       
    Categoria NVARCHAR(50),           
    Estilo NVARCHAR(50),            
    Material NVARCHAR(50),           
    Precio DECIMAL(10, 2) NOT NULL,
    Stock INT DEFAULT 0,              
    Imagen_URL NVARCHAR(255),
    Fecha_Creacion DATETIME DEFAULT GETDATE() 
);

INSERT INTO Productos (Nombre, Descripcion, Categoria, Estilo, Material, Precio, Stock, Imagen_URL)
VALUES 
('Anillo Aura', 'Anillo de banda delgada con acabado pulido.', 'Anillo', 'Minimalista', 'Oro Blanco 14k', 3500.00, 10, 'aura_min.jpg'),
('Collar Medallón Antiguo', 'Collar con grabado floral tallado a mano.', 'Collar', 'Vintage', 'Plata .925', 1850.00, 5, 'medallon_vin.jpg'),
('Brazalete Étnico Luna', 'Brazalete ajustable con detalles de turquesa.', 'Brazalete', 'Bohemio', 'Bronce', 950.00, 12, 'luna_boho.jpg'),
('Pendientes Línea Pura', 'Pendientes largos de una sola pieza recta.', 'Aretes', 'Minimalista', 'Oro Amarillo 10k', 2200.00, 8, 'linea_min.jpg'),
('Reloj de Bolsillo Legacy', 'Reloj funcional con cadena de eslabones clásicos.', 'Reloj', 'Vintage', 'Acero Oxidado', 4800.00, 3, 'reloj_vin.jpg');