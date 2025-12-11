# Diseño de colecciones - MongoDB (CBAgroNoSQL)

## Visión general
MongoDB se utiliza para almacenar datos semiestructurados y documentos complejos relacionados con perfiles extendidos de usuarios, historiales de actividades agrícolas y evidencias (fotos, informes). Estas tres colecciones permiten flexibilidad para cambios rápidos en el modelo y consultas agregadas sobre historiales y anexos.

### Colecciones mínimas (3)
1. **usuarios_profiles**
   - Guarda datos extendidos del usuario (preferencias, perfil público, contactos externos).
   - Justificación: perfiles varían mucho (redes, bio, múltiples teléfonos/addresses) → esquema flexible.

2. **actividades**
   - Registros de actividades agrícolas o transacciones no-financieras asociadas a cultivos (p. ej. siembra, riego, fertilización) con métricas (ph, humedad, rendimiento).
   - Justificación: eventos periódicos con estructuras anidadas y arrays (sensores, mediciones) donde el documento por actividad es ideal.

3. **evidencias**
   - Almacena referencias a archivos (imagen/pdf), metadatos y enlaces con `actividadId` o `usuarioId`.
   - Justificación: documentos grandes y variados (metadatos, tags) que pueden crecer y necesitar búsqueda por tags/fecha.

---

## Requisitos funcionales cubiertos (por colección)
- Campos obligatorios (validación).
- Índices para consultas comunes.
- Ejemplos CRUD y pipelines de Aggregation con `$match`, `$group`, `$project`, `$lookup`, `$sort`.

---

## Modelo de datos (resumen)

### usuarios_profiles
- `_id` : ObjectId
- `usuarioId` : string (clave natural, **única**, required)
- `nombre` : string
- `email` : string (required)
- `fechaRegistro` : date (required)
- `preferencias` : object { idioma, tema, notificaciones }
- `contacto` : array of { tipo, valor } (teléfono, whatsapp, redes)
- `roles` : array string
- `meta` : object (flexible)
- `ultimoLogin` : date

### actividades
- `_id` : ObjectId
- `actividadId` : string (required, unique)
- `usuarioId` : string (FK lógico con usuarios_profiles.usuarioId)
- `tipo` : string (siembra, riego, fertilizacion, cosecha)
- `cultivo` : { nombre, variedad, loteId(optional) }
- `fecha` : date
- `mediciones` : array of { nombre, valor, unidad }  (ph, humedad, temp)
- `resultado` : object { rendimientoEstimado, observaciones }
- `geo` : { lat, lon } optional
- `tags` : array string

### evidencias
- `_id` : ObjectId
- `evidenciaId` : string (required, unique)
- `actividadId` : string (nullable)  — link hacia actividades
- `usuarioId` : string (nullable)
- `tipoArchivo` : string (image/jpg, application/pdf)
- `url` : string (ruta en storage)
- `metadatos` : object { tamañoBytes, ancho, alto, formato }
- `fechaSubida` : date
- `expiresAt` : date (opcional si quieres TTL)
- `tags` : array string

---

## Índices recomendados
- usuarios_profiles: `{ usuarioId: 1 }` (unique), `{ email: 1 }` (unique)
- actividades: `{ actividadId: 1 }` (unique), `{ usuarioId: 1, fecha: -1 }`
- evidencias: `{ actividadId: 1 }`, `{ fechaSubida: -1 }`, TTL index en `expiresAt` si se requieren caducidades.

