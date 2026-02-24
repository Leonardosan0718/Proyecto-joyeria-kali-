from fastapi import FastAPI
from typing import List
import pyodbc

app = FastAPI()

conn_str = (
    "Driver={ODBC Driver 17 for SQL Server};"
    "Server=JARVIS;" 
    "Database=Joyeria;"
    "Trusted_Connection=yes;"
)

@app.get("/productos")
def obtener_productos():
    try:
        conn = pyodbc.connect(conn_str)
        cursor = conn.cursor()
        cursor.execute("SELECT ID, Nombre, Descripcion, Categoria, Estilo, Material, Precio, Stock FROM Productos")
        rows = cursor.fetchall()
        
        productos = []
        for row in rows:
            productos.append({
                "id": row[0],
                "nombre": row[1],
                "descripcion": row[2],
                "categoria": row[3],
                "estilo": row[4],
                "material": row[5],
                "precio": float(row[6]),
                "stock": row[7]
            })
        conn.close()
        return productos
    except Exception as e:
        return {"error": str(e)}

@app.get("/productos/estilo/{estilo_nombre}")
def obtener_por_estilo(estilo_nombre: str):
    try:
        conn = pyodbc.connect(conn_str)
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM Productos WHERE Estilo = ?", estilo_nombre)
        rows = cursor.fetchall()
        conn.close()
        return {"mensaje": f"Próximamente filtrados para {estilo_nombre}"}
    except Exception as e:
        return {"error": str(e)}