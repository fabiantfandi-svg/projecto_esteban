use CBAgroNoSQL;

db.usuarios_profiles.drop();
db.actividades.drop();
db.evidencias.drop();

db.createCollection("usuarios_profiles", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["usuarioId", "email", "fechaRegistro"],
      properties: {
        usuarioId: { bsonType: "string" },
        nombre: { bsonType: "string" },
        email: { bsonType: "string", pattern: "^.+@.+\\..+$" },
        fechaRegistro: { bsonType: "date" },
        preferencias: { bsonType: "object" },
        contacto: { bsonType: "array" },
        roles: { bsonType: "array" },
        meta: { bsonType: "object" },
        ultimoLogin: { bsonType: "date" }
      }
    }
  }
});

db.createCollection("actividades", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["actividadId", "usuarioId", "tipo", "fecha"],
      properties: {
        actividadId: { bsonType: "string" },
        usuarioId: { bsonType: "string" },
        tipo: { bsonType: "string" },
        cultivo: { bsonType: "object" },
        fecha: { bsonType: "date" },
        mediciones: { bsonType: ["array", "null"] },
        resultado: { bsonType: ["object", "null"] },
        geo: { bsonType: ["object", "null"] },
        tags: { bsonType: ["array", "null"] }
      }
    }
  }
});

db.createCollection("evidencias", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["evidenciaId", "url", "fechaSubida"],
      properties: {
        evidenciaId: { bsonType: "string" },
        actividadId: { bsonType: "string" },
        usuarioId: { bsonType: "string" },
        tipoArchivo: { bsonType: "string" },
        url: { bsonType: "string" },
        metadatos: { bsonType: "object" },
        fechaSubida: { bsonType: "date" },
        expiresAt: { bsonType: "date" },
        tags: { bsonType: "array" }
      }
    }
  }
});

db.usuarios_profiles.createIndex({ usuarioId: 1 }, { unique: true });
db.usuarios_profiles.createIndex({ email: 1 }, { unique: true });

db.actividades.createIndex({ actividadId: 1 }, { unique: true });
db.actividades.createIndex({ usuarioId: 1, fecha: -1 });

db.evidencias.createIndex({ evidenciaId: 1 }, { unique: true });
db.evidencias.createIndex({ actividadId: 1 });
db.evidencias.createIndex({ fechaSubida: -1 });

db.evidencias.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 });

db.usuarios_profiles.insertMany([
  {
    usuarioId: "user_001",
    nombre: "Ana Gómez",
    email: "ana.gomez@example.com",
    fechaRegistro: new Date("2025-01-10T08:00:00Z"),
    preferencias: { idioma: "es", tema: "oscuro", notificaciones: true },
    contacto: [{ tipo: "telefono", valor: "+573001112233" }],
    roles: ["productor"],
    meta: { finca: "Finca La Esperanza", areaHa: 4.5 },
    ultimoLogin: new Date("2025-03-05T10:00:00Z")
  },
  {
    usuarioId: "user_002",
    nombre: "Carlos Pérez",
    email: "carlos.perez@example.com",
    fechaRegistro: new Date("2025-02-02T12:30:00Z"),
    preferencias: { idioma: "en", tema: "claro", notificaciones: false },
    contacto: [{ tipo: "telefono", valor: "+573009887766" }],
    roles: ["técnico", "auditor"],
    meta: { empresa: "AgroTech" },
    ultimoLogin: new Date("2025-03-06T09:00:00Z")
  }
]);

db.actividades.insertMany([
  {
    actividadId: "act_1001",
    usuarioId: "user_001",
    tipo: "siembra",
    cultivo: { nombre: "Tomate", variedad: "Cherry", loteId: "lote_01" },
    fecha: new Date("2025-03-01T07:30:00Z"),
    mediciones: [ { nombre: "ph", valor: 6.5, unidad: "" }, { nombre: "humedad", valor: 34, unidad: "%" } ],
    resultado: { rendimientoEstimado: 1200, observaciones: "Buen crecimiento inicial" },
    geo: { lat: -31.4201, lon: -64.1836 },
    tags: ["siembra", "primavera"]
  },
  {
    actividadId: "act_1002",
    usuarioId: "user_001",
    tipo: "riego",
    cultivo: { nombre: "Tomate", variedad: "Cherry", loteId: "lote_01" },
    fecha: new Date("2025-03-10T06:00:00Z"),
    mediciones: [ { nombre: "humedad", valor: 45, unidad: "%" } ],
    resultado: { observaciones: "Necesita control de plagas" },
    tags: ["riego"]
  },
  {
    actividadId: "act_2001",
    usuarioId: "user_002",
    tipo: "inspeccion",
    cultivo: { nombre: "Maíz", variedad: "Híbrido A", loteId: "lote_05" },
    fecha: new Date("2025-03-02T09:00:00Z"),
    mediciones: [ { nombre: "altura", valor: 120, unidad: "cm" } ],
    resultado: { observaciones: "Plagas controladas" },
    tags: ["inspeccion", "maiz"]
  }
]);

db.evidencias.insertMany([
  {
    evidenciaId: "ev_9001",
    actividadId: "act_1001",
    usuarioId: "user_001",
    tipoArchivo: "image/jpeg",
    url: "https://storage.example.com/evidencias/ev_9001.jpg",
    metadatos: { tamañoBytes: 345678, ancho: 1920, alto: 1080, formato: "jpg" },
    fechaSubida: new Date("2025-03-01T08:00:00Z"),
    tags: ["tomate", "siembra"]
  },
  {
    evidenciaId: "ev_9002",
    actividadId: "act_1002",
    usuarioId: "user_001",
    tipoArchivo: "application/pdf",
    url: "https://storage.example.com/evidencias/ev_9002.pdf",
    metadatos: { tamañoBytes: 123456 },
    fechaSubida: new Date("2025-03-10T06:10:00Z"),
    tags: ["riego", "informe"],
    expiresAt: new Date(Date.now() + 30*24*60*60*1000) // expira en 30 días
  }
]);

// --- Ejemplos CRUD rápidos

db.usuarios_profiles.findOne({ usuarioId: "user_001" });

db.usuarios_profiles.updateOne(
  { usuarioId: "user_001" },
  { $set: { "preferencias.tema": "claro" } }
);

db.actividades.updateOne(
  { actividadId: "act_1001" },
  { $push: { mediciones: { nombre: "nitrogeno", valor: 12, unidad: "mg/kg" } } }
);

db.evidencias.deleteOne({ evidenciaId: "ev_9002" });

db.actividades.aggregate([
  { $match: { usuarioId: "user_001" } },
  { $project: { actividadId:1, tipo:1, fecha:1, year: { $year: "$fecha" }, month: { $month: "$fecha" } } },
  { $group: { _id: { year: "$year", month: "$month" }, totalActividades: { $sum: 1 }, tipos: { $addToSet: "$tipo" } } },
  { $sort: { "_id.year": 1, "_id.month": 1 } },
  { $project: { periodo: { $concat: [{ $toString: "$_id.year" }, "-", { $toString: "$_id.month" }] }, totalActividades: 1, tipos:1, _id:0 } }
]);
