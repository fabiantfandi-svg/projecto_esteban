# Proyecto Esteban — Sistema Multibase (SQL, MongoDB y Redis)

Este proyecto integra **tres tecnologías de bases de datos** para cubrir diferentes necesidades de almacenamiento:  
- **PostgreSQL / SQL** para datos estructurados y transaccionales.  
- **MongoDB** para datos flexibles orientados a documentos.  
- **Redis** para almacenamiento en memoria, caché y operaciones en tiempo real.

Incluye además documentación técnica, scripts, y configuraciones que permiten ejecutar y evaluar cada módulo por separado.

---

## 📁 Estructura del Proyecto

```
projecto_esteban/
│
├── Documentacion_tecnica/
│   ├── Justificación-Arquitectonica-de-Bases-de-Datos.pdf
│   └── otros documentos técnicos
│
├── mongo_db/
│   ├── consultas_aggregation.md
│   ├── diseño_colecciones.md
│   ├── docker-compose.yml
│   ├── inserts.json
│   ├── mongosh_script.js
│   └── mongo_client.js
│
├── Redis/
│   ├── caso_de_uso_redis.md
│   ├── comandos_basicos.txt
│   ├── conexion.py
│   └── operaciones_estructuras.txt
│
└── sql/
    ├── CONSULTAS.SQL
    ├── CREATE TABLE.SQL
    ├── INSERT INTO.SQL
    └── Sistema bancario .pdf
```

---

## 🧩 Descripción General del Sistema

El sistema presenta un enfoque híbrido para aprender y demostrar cómo combinar **tres tipos de motores de bases de datos** en un mismo proyecto académico.

### 🎯 Objetivos
- Comprender para qué escenarios es útil cada base de datos.
- Implementar scripts funcionales que soporten consultas reales.
- Trabajar una arquitectura distribuida donde cada módulo cumple un rol.

---

## 🗄️ 1. Módulo SQL (Sistema Bancario)

Ubicación: `/sql/`

Este módulo implementa:
- Creación de tablas (`CREATE TABLE.SQL`)
- Inserción de registros (`INSERT INTO.SQL`)
- Consultas transaccionales (`CONSULTAS.SQL`)
- Documento explicativo del sistema bancario en PDF

Ideal para **operaciones ACID**, integridad referencial y reglas transaccionales.

---

## 🍃 2. Módulo MongoDB

Ubicación: `/mongo_db/`

Incluye:
- Diseño de colecciones
- Scripts para llenar la base (`inserts.json`)
- Archivo `docker-compose.yml` para levantar un servidor local
- Ejemplos de agregaciones
- Cliente Node.js (`mongo_client.js`)

Usado para manejar datos semiestructurados como registros dinámicos y documentos.

---

## ⚡ 3. Módulo Redis

Ubicación: `/Redis/`

Contiene:
- Casos de uso propuestos
- Scripts de conexión en Python (`conexion.py`)
- Práctica con estructuras (listas, sets, sorted sets)
- Comandos básicos

Redis se utiliza para:
- Caché
- Sistemas en tiempo real
- Contadores y ranking de usuarios
- Guardado temporal de información

---

## 🧪 Ejecución de los Módulos

### ▶️ MongoDB
```
cd mongo_db
docker compose up -d
```

### ▶️ Redis
Es necesario tener Redis instalado o usar Docker:
```
redis-server
```
o
```
docker run -p 6379:6379 redis
```

Ejecutar script de conexión:
```
python conexion.py
```

### ▶️ SQL
Ejecutar los archivos `.SQL` en tu motor preferido:
- PostgreSQL
- MySQL
- SQL Server

---

## 💡 Recomendaciones
- Usar entornos separados para cada tecnología.
- Probar primero las consultas base antes de automatizar.
- Leer la documentación técnica incluida.

---

## 📌 Autor
Proyecto para prácticas en **bases de datos SQL, NoSQL y almacenamiento en memoria**.

