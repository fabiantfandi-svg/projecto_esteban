# Consultas con Aggregation Pipeline – Gestión Bancaria (MongoDB)

Este archivo contiene **todas las consultas de Aggregation** para el proyecto de **gestión bancaria**, en un solo bloque de código listo para copiar y pegar.

---

# Total de dinero depositado por cada cliente
db.transactions.aggregate([
  { $match: { type: "deposit" } },
  {
    $group: {
      _id: "$client_id",
      totalDeposits: { $sum: "$amount" }
    }
  },
  { $sort: { totalDeposits: -1 } }
])

---

#  Total de retiros por cliente
db.transactions.aggregate([
  { $match: { type: "withdraw" } },
  {
    $group: {
      _id: "$client_id",
      totalWithdrawals: { $sum: "$amount" }
    }
  },
  { $sort: { totalWithdrawals: -1 } }
])

---

#  Balance final de cada cuenta (depósitos – retiros)
db.transactions.aggregate([
  {
    $group: {
      _id: "$account_id",
      balance: {
        $sum: {
          $cond: [
            { $eq: ["$type", "deposit"] }, "$amount",
            { $multiply: ["$amount", -1] }
          ]
        }
      }
    }
  },
  { $sort: { balance: -1 } }
])

---

# Transacciones con información del cliente (JOIN con $lookup)
db.transactions.aggregate([
  {
    $lookup: {
      from: "clients",
      localField: "client_id",
      foreignField: "_id",
      as: "client_info"
    }
  },
  { $unwind: "$client_info" },
  {
    $project: {
      _id: 0,
      client: "$client_info.name",
      account: "$account_id",
      amount: 1,
      type: 1,
      date: 1
    }
  },
  { $sort: { date: -1 } }
])

---

#  Total de transacciones por tipo
db.transactions.aggregate([
  {
    $group: {
      _id: "$type",
      total: { $sum: 1 }
    }
  },
  { $sort: { total: -1 } }
])

---

# Clientes ordenados por total de dinero movido
db.transactions.aggregate([
  {
    $group: {
      _id: "$client_id",
      totalMovements: { $sum: "$amount" }
    }
  },
  { $sort: { totalMovements: -1 } }
])

---

# Todas las cuentas con datos del cliente
db.accounts.aggregate([
  {
    $lookup: {
      from: "clients",
      localField: "client_id",
      foreignField: "_id",
      as: "owner"
    }
  },
  { $unwind: "$owner" },
  {
    $project: {
      _id: 0,
      accountNumber: "$_id",
      clientName: "$owner.name",
      balance: 1,
      type: 1
    }
  }
])

---

# Número total de transacciones por cuenta
db.transactions.aggregate([
  {
    $group: {
      _id: "$account_id",
      numTransactions: { $sum: 1 }
    }
  },
  { $sort: { numTransactions: -1 } }
])

---

#  Promedio de valor de transacciones por tipo
db.transactions.aggregate([
  {
    $group: {
      _id: "$type",
      avgAmount: { $avg: "$amount" }
    }
  }
])

---

#  Transacciones en un rango de fechas
db.transactions.aggregate([
  {
    $match: {
      date: { $gte: ISODate("2025-01-01"), $lte: ISODate("2025-12-31") }
    }
  },
  { $sort: { date: -1 } }
])

---

# ✔ Explicación rápida de etapas del Aggregation Pipeline

- **$match:** Filtrar documentos (similar a WHERE).  
- **$group:** Agrupar para sumar, contar, promediar.  
- **$project:** Elegir qué campos mostrar.  
- **$sort:** Ordenar resultados.  
- **$lookup:** Unir colecciones (JOIN).  
- **$unwind:** Convertir arrays en documentos individuales.  

