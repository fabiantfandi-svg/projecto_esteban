# Consultas / Aggregations - MongoDB

Este documento contiene pipelines de Aggregation y ejemplos de uso, cada pipeline incluye explicación y el objetivo.

---

## Pipeline 1: Resumen mensual de actividades por usuario
**Objetivo**: Obtener número de actividades por mes para un `usuarioId` (útil para dashboard).

```js
db.actividades.aggregate([
  { $match: { usuarioId: "user_001" } },               
  {                                                  
    $project: {
      actividadId: 1,
      tipo: 1,
      fecha: 1,
      year: { $year: "$fecha" },
      month: { $month: "$fecha" }
    }
  },
  { $group: {                                        
      _id: { year: "$year", month: "$month" },
      totalActividades: { $sum: 1 },
      tipos: { $addToSet: "$tipo" }
  }},
  { $sort: { "_id.year": 1, "_id.month": 1 } },       
  { $project: {
      periodo: { $concat: [{ $toString: "$_id.year" }, "-", { $toString: "$_id.month" }] },
      totalActividades: 1,
      tipos: 1,
      _id: 0
  }}
]);
