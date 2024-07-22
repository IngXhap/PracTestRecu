const express = require("express");
const mysql = require("mysql2");
const path = require("path");
const bodyParser = require("body-parser"); 

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public/")));
app.get("/", (req, res) => {
res.sendFile(path.join(__dirname, "./index.html"));
});

// Configuración de la conexión a MySQL

const conexion = mysql.createConnection({

host: "escuela.cpc8ii0w6226.us-east-1.rds.amazonaws.com", // Cambia esto si tu MySQL no está en el mismo servidor
user: "roberto", // Tu usuario de MySQL
password: "roberto123456789", // Tu contraseña de MySQL
database: "prac", // El nombre de tu base de datos
port: 3306

});

conexion.connect(err => {
if (err) {
console.error("Error conectando a la base de datos:", err.stack);
return;
}

console.log("Conectado a la base de datos MySQL");

});

app.post("/consulta" ,(req,res)=>{
  const { dni, nombres, apellidos, fecha, optionSelectSexo, celular, correo, direccion, colesterol, glucosa, hemoglobina, optionSelectSeguro } = req.body;
    console.log("Datos insertados", req.body);

    const query = 'INSERT INTO datos_personales (dni, nombres, apellidos, fecha, optionSelectSexo, celular, correo, direccion, colesterol, glucosa, hemoglobina, optionSelectSeguro) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
   conexion.query(
    query,
    [dni, nombres, apellidos, fecha, optionSelectSexo, celular, correo, direccion, colesterol, glucosa, hemoglobina, optionSelectSeguro],
    (err, result)=>{
        if (err) {
            console.error("Error al guardar en la base de datos: ", err);
            res.status(500).send("Error al guardar en la base de datos");
          } else {
            console.log("Datos guardados correctamente");
            res.redirect("/");
            // Redirige a la página del formulario
          }
        }
        ); 
    });

// En caso de error o no encontrar datos, enviar null


// Iniciar el servidor

app.listen(port, () => {

console.log(`Servidor escuchando en http://localhost:${port}`);

});





