// Maikoll Este es un ejemplo de la conexion entendido
import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI || "mongodb://localhost:27017";
const client = new MongoClient(uri);

export async function connect() {
  if (!client.isConnected?.()) {
    await client.connect();
  }
  return client.db("CBAgroNoSQL");
}

export async function getPerfil(usuarioId) {
  const db = await connect();
  return db.collection("usuarios_profiles").findOne({ usuarioId });
}

export async function addActividad(actividad) {
  const db = await connect();
  return db.collection("actividades").insertOne(actividad);
}

export async function getActividadConEvidencias(actividadId) {
  const db = await connect();
  return db.collection("actividades").aggregate([
    { $match: { actividadId } },
    { $lookup: { from: "usuarios_profiles", localField: "usuarioId", foreignField: "usuarioId", as: "usuario" } },
    { $unwind: { path: "$usuario", preserveNullAndEmptyArrays: true } },
    { $lookup: { from: "evidencias", localField: "actividadId", foreignField: "actividadId", as: "evidencias" } },
    { $project: { actividadId:1, tipo:1, fecha:1, cultivo:1, "usuario.nombre":1, evidencias:1 } }
  ]).toArray();
}
