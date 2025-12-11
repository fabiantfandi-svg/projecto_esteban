// Maikoll Este es un ejemplo de la conexion entendido

---

# 📄 **4. mongo_client.js**  
*(Cliente Node.js para conectarse a MongoDB y probar consultas)*

```js
import { MongoClient } from "mongodb";

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log("✔ Conectado a MongoDB");

    const db = client.db("BankSystemNoSQL");

    // Consulta ejemplo
    const notificaciones = await db
      .collection("notifications")
      .find({ userId: "user001" })
      .toArray();

    console.log("Notificaciones del usuario:");
    console.log(notificaciones);

  } catch (error) {
    console.error("Error:", error);
  } finally {
    await client.close();
  }
}

run();
