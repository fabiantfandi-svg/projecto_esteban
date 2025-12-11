
# Diseño de Colecciones – Sistema Bancario (MongoDB)

MongoDB se utiliza para almacenar información flexible y no financiera del sistema bancario.  
Las colecciones son:

---

## 1. user_profiles
Guarda la configuración y preferencias del usuario.

### Campos:
- userId (string) – ID del usuario (relacionado con PostgreSQL)
- nombre (string)
- email (string)
- preferencias (objeto):
  - tema (string)
  - idioma (string)
  - notificaciones (bool)
- createdAt (date)
- ultimoLogin (date)

### Justificación:
Datos semiestructurados que cambian constantemente. No requiere un esquema rígido.

---

## 2. notifications
Guarda notificaciones enviadas al usuario.

### Campos:
- userId (string)
- mensaje (string)
- fecha (date)
- leido (bool)

### Justificación:
Las notificaciones no afectan la lógica bancaria ni requieren transacciones ACID.

---

## 3. login_logs
Historial de inicios de sesión del usuario.

### Campos:
- userId (string)
- fecha (date)
- ip (string)
- dispositivo (string)

### Justificación:
Los logs aumentan constantemente, ideal para bases NoSQL.

---

# Índices

- user_profiles:
  - userId (unique)
  - email (unique)

- notifications:
  - userId + fecha

- login_logs:
  - userId
  - fecha

---

MongoDB complementa a PostgreSQL y Redis proporcionando almacenamiento flexible y eficiente para datos no financieros.
