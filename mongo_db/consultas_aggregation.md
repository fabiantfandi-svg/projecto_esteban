
# Consultas con Aggregation Framework (MongoDB)

## 1. Contar cuántos productos hay por categoría
db.productos.aggregate([
  { "$group": { "_id": "$categoria", "total": { "$sum": 1 } } }
])

## 2. Promedio de precios por categoría
db.productos.aggregate([
  { "$group": { "_id": "$categoria", "promedio_precio": { "$avg": "$precio" } } }
])

## 3. Listar productos producidos en invernadero
db.productos.aggregate([
  { "$match": { "invernadero": true } }
])

## 4. Total de cantidad disponible por proveedor
db.productos.aggregate([
  { "$group": {
      "_id": "$proveedor.nombre",
      "total_cantidad": { "$sum": "$cantidad" }
  }}
])

## 5. Productos con precio mayor a 3000 ordenados de mayor a menor
db.productos.aggregate([
  { "$match": { "precio": { "$gt": 3000 } } },
  { "$sort": { "precio": -1 } }
])

## 6. Traer solo nombre, precio y categoría (proyección)
db.productos.aggregate([
  { "$project": { 
      "_id": 0,
      "nombre": 1,
      "precio": 1,
      "categoria": 1
  }}
])

## 7. Productos agrupados por categoría con promedio, mínimo y máximo
db.productos.aggregate([
  { "$group": {
      "_id": "$categoria",
      "promedio_precio": { "$avg": "$precio" },
      "precio_min": { "$min": "$precio" },
      "precio_max": { "$max": "$precio" }
  }}
])

## 8. Filtrar frutas y mostrar solo las que tengan más de 100 unidades
db.productos.aggregate([
  { "$match": { "categoria": "Fruta", "cantidad": { "$gt": 100 } } },
  { "$project": {
      "_id": 0,
      "nombre": 1,
      "cantidad": 1,
      "precio": 1
  }}
])

## 9. Ordenar proveedores por total de productos que suministran
db.productos.aggregate([
  { "$group": {
      "_id": "$proveedor.nombre",
      "productos_suministrados": { "$sum": 1 }
  }},
  { "$sort": { "productos_suministrados": -1 } }
])

## 10. Reporte completo por categoría con conteo, promedio y total de inventario
db.productos.aggregate([
  { "$group": {
      "_id": "$categoria",
      "total_productos": { "$sum": 1 },
      "promedio_precio": { "$avg": "$precio" },
      "total_inventario": { "$sum": "$cantidad" }
  }},
  { "$sort": { "total_inventario": -1 } }
])
