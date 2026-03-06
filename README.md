# Joyería Digital (Joyeria Kaligrafi) - Sistema de Navegación por Estilos Estéticos

## 📌 Visión General del Proyecto
Este proyecto forma parte del **Proyecto Integrador Dual**. Consiste en una plataforma de comercio electrónico especializada en joyería que optimiza la experiencia de usuario mediante un sistema de **filtrado por estilos estéticos** (Minimalista, Vintage, Bohemio).

El desarrollo se divide en:
1. **The Job (Ingeniería):** MVP funcional con arquitectura cliente-servidor (React-Python-SQL).
2. **The Science (Investigación):** Análisis de usabilidad basado en la recolección de métricas de navegación en tiempo real.

## 🧪 Rigor Científico: Hipótesis
> *"La implementación de un sistema de filtrado por estilos estéticos reducirá el **tiempo promedio de localización de producto (Time-on-Task)** en un **30%** en comparación con la navegación tradicional."*

### Instrumentación y Telemetría
El sistema está instrumentado para registrar eventos en una tabla de auditoría en **SQL Server**:
* **Eventos de Filtro:** Registra qué estilo prefiere el usuario y en qué momento.
* **Eventos de Interés:** Registra cuando un usuario agrega un producto al carrito (conversión).
* **Métricas de Tiempo:** Timestamps precisos para calcular el *Time-on-Task*.

## 🛠️ Stack Tecnológico
* **Frontend:** React (Hooks para gestión de estado, Axios para peticiones asíncronas).
* **Backend:** Python con FastAPI (Middleware de CORS, Endpoints REST).
* **Base de Datos:** Microsoft SQL Server (Transact-SQL para procedimientos y logs).
* **Diseño:** CSS-in-JS con enfoque en Luxury UI/UX.



## 📂 Funcionalidades Implementadas (MVP)
* **Filtrado Dinámico:** Clasificación instantánea de productos por estilo estético.
* **Carrito de Compras:** Gestión de productos seleccionados con cálculo de total en tiempo real.
* **Normalización de Datos:** Algoritmo de asignación de imágenes basado en búsqueda por palabras clave.
* **Feedback Visual:** Formateo automático de moneda (USD) e interactividad (Hover effects).

## 📂 Estructura del Repositorio
* `/frontend`: Código fuente en React.
* `/backend`: API REST y lógica de conexión a DB.
* `/database`: Esquemas de tablas para productos y telemetría (Logs).
* `/docs`: Documentación técnica bajo normas APA.

## 🚀 Hitos del Proyecto
* **Hito 1 (Completado):** Protocolo de Investigación y Estructura.
* **Hito 2 (Actual):** MVP funcional con conectividad completa (Frontend-API-DB).
* **Semana 10:** Finalización de funcionalidad core e inicio de recolección de datos.
* **Semana 12:** Análisis de resultados y entrega de reporte final.

---
**Autor:** [Pineda Martinez Leonardo Said]
**Matricula**[334007776]
[cite_start]**Institución:** UNITEC - Práctica Dual 2026-2 
