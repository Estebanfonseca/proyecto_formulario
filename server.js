import express from "express";
import mysql from "mysql2";
import cors from "cors";
import bodyParser from "body-parser";
import process from "process";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Configuración de CORS
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173", "*"],
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);
// Middleware

app.use(bodyParser.json());

// Configuración de la conexión a la base de datos

const connection = mysql.createConnection({
  host: process.env.DB_HOST || "127.0.0.1",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "Developer.0511*",
  database: process.env.DB_NAME || "datos",
});

// Conectar a la base de datos
connection.connect((error) => {
  if (error) {
    console.error("Error connecting to the database:", error);
    process.exit(1);
  }
  console.log("Conexión exitosa a la base de datos.");
});

// Ruta para guardar datos del formulario
app.post("/api/submit-form", (req, res) => {
  console.log("Received data:", req.body);
  const {
    fecha,
    hora,
    correo,
    nombre,
    autorizacion,
    radicado,
    tipoServicio,
    identificador,
    estado,
    causalesdedevolucion,
  } = req.body;
  if (
    !fecha ||
    !hora ||
    !correo ||
    !nombre ||
    !autorizacion ||
    !radicado ||
    !tipoServicio ||
    !identificador ||
    !estado ||
    !causalesdedevolucion
  ) {
    console.error("Campos faltantes en la solicitud");
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  const query =
    "INSERT INTO datos (fecha, hora, correo, nombre, autorizacion, radicado, tipoServicio, identificador, estado, causalesdedevolucion  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ? )";

  connection.query(
    query,
    [
      fecha,
      hora,
      correo,
      nombre,
      autorizacion,
      radicado,
      tipoServicio,
      identificador,
      estado,
      causalesdedevolucion,
    ],
    (error, results) => {
      if (error) {
        console.error("Error al insertar en la base de datos:", error);
        return res
          .status(500)
          .json({ error: error.message, sqlMessage: error.sqlMessage });
      }
      console.log("Datos insertados correctamente:", results);
      res
        .status(200)
        .json({
          message: "Datos guardados correctamente",
          id: results.insertId,
        });
    }
  );
}
);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
