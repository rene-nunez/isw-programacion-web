import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());

const API_KEY = process.env.API_KEY;

app.get("/clima/:pais", (req, res) => {
    const pais = req.params.pais;

    fetch(`https://api.weatherstack.com/current?access_key=${process.env.API_KEY}&query=${pais}`)
        .then(response => response.json()) // fetch
        .then(data => res.json(data)) // respuesta al navegador
        .catch(err => res.status(500).json({ error: "Error al obtener el clima del país" }));
});

app.listen(3000, () => console.log("Servidor activo puerto 3000"));