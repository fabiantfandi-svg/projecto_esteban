
use BankSystemNoSQL;

// Eliminación de colecciones previas
db.user_profiles.drop();
db.notifications.drop();
db.login_logs.drop();


// ----------------------
// COLECCIÓN: user_profiles
// ----------------------
db.createCollection("user_profiles", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["userId", "email", "createdAt"],
      properties: {
        userId: { bsonType: "string" },
        email: { bsonType: "string", pattern: "^.+@.+\\..+$" },
        nombre: { bsonType: "string" },
        preferencias: {
          bsonType: "object",
          properties: {
            tema: { bsonType: "string" },
            idioma: { bsonType: "string" },
            notificaciones: { bsonType: "bool" }
          }
        },
        createdAt: { bsonType: "date" },
        ultimoLogin: { bsonType: "date" }
      }
    }
  }
});


// ----------------------
// COLECCIÓN: notifications
// ----------------------
db.createCollection("notifications", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["userId", "mensaje", "fecha"],
      properties: {
        userId: { bsonType: "string" },
        mensaje: { bsonType: "string" },
        leido: { bsonType: "bool" },
        fecha: { bsonType: "date" }
      }
    }
  }
});


// ----------------------
// COLECCIÓN: login_logs
// ----------------------
db.createCollection("login_logs", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["userId", "fecha", "ip"],
      properties: {
        userId: { bsonType: "string" },
        fecha: { bsonType: "date" },
        ip: { bsonType: "string" },
        dispositivo: { bsonType: "string" }
      }
    }
  }
});


// ----------------------
// ÍNDICES
// ----------------------
db.user_profiles.createIndex({ userId: 1 }, { unique: true });
db.user_profiles.createIndex({ email: 1 }, { unique: true });

db.notifications.createIndex({ userId: 1, fecha: -1 });

db.login_logs.createIndex({ userId: 1 });
db.login_logs.createIndex({ fecha: -1 });


// ----------------------
// INSERTS DE EJEMPLO
// ----------------------
db.user_profiles.insertMany([
  {
    userId: "user001",
    nombre: "Ana Gómez",
    email: "ana@example.com",
    preferencias: { tema: "oscuro", idioma: "es", notificaciones: true },
    createdAt: new Date(),
    ultimoLogin: new Date()
  },
  {
    userId: "user002",
    nombre: "Carlos Pérez",
    email: "carlos@example.com",
    preferencias: { tema: "claro", idioma: "en", notificaciones: false },
    createdAt: new Date(),
    ultimoLogin: new Date()
  }
]);

db.notifications.insertMany([
  { userId: "user001", mensaje: "Tu saldo ha cambiado", leido: false, fecha: new Date() },
  { userId: "user002", mensaje: "Nuevo inicio de sesión detectado", leido: false, fecha: new Date() }
]);

db.login_logs.insertMany([
  { userId: "user001", fecha: new Date(), ip: "192.168.0.10", dispositivo: "Chrome" },
  { userId: "user002", fecha: new Date(), ip: "192.168.0.25", dispositivo: "Android" }
]);


// ----------------------
// EJEMPLO DE AGGREGATION (estilo bancario)
// ----------------------
db.notifications.aggregate([
  { $match: { userId: "user001" } },
  { $project: { _id: 0, mensaje: 1, fecha: 1, leido: 1 } },
  { $sort: { fecha: -1 } }
]);
