# Casos de Uso en Redis

## Caso de Uso 1: Gestión de sesiones de usuarios

**Descripción:**  
Almacenar la información de sesión de cada usuario en Redis para un acceso rápido, con expiración automática.

**Estructura Redis utilizada:**  
- **STRING**

**Ejemplo de comando:**
```redis
SET session:1 '{"usuario":"juan","rol":"usuario","balance":1000,"ultimo_acceso":1699588800,"token":"token_123456"}' EX 1800
GET session:1
TTL session:1
EXISTS session:1
```
**Uso práctico:**

Validar rápidamente si un usuario tiene sesión activa.

## Caso de Uso 2: Historial de accesos por usuario

**Estructura Redis utilizada:**

LIST

**Ejemplo de comando:**
```redis
LPUSH historial_accesos:juan 1699588800
LPUSH historial_accesos:juan 1699592400
LPUSH historial_accesos:juan 1699596000
LRANGE historial_accesos:juan 0 2
```
**Uso práctico:**

Obtener los últimos accesos de un usuario para monitoreo de seguridad.

Analizar patrones de conexión y detectar comportamientos sospechosos.

## Caso de Uso 3: Ranking de usuarios por saldo

**Descripción:**
Mantener un ranking de usuarios según su saldo en tiempo real, útil para reportes o dashboards.

Estructura Redis utilizada:

ZSET (Sorted Set)

**Ejemplo de comando:**
```redis
ZADD ranking_saldos 1000 fabian
ZADD ranking_saldos 2500 fernanda
ZADD ranking_saldos 3500 luisa
ZREVRANGE ranking_saldos 0 2 WITHSCORES
```

**Uso práctico**:

Mostrar los usuarios con mayor saldo en un leaderboard.

Consultar fácilmente los top usuarios 