import express from 'express';

const app = express()

let numeros = [1, 2, 3, 4, 5, 6];

let producto = {
  id: "5",
  nombre: "Lápiz",
  activo: true,
  cantidad: 10,
  precio: 10
}

app.get('/productos', (req, res) => {
  res.json(producto);
})

app.get('/numeros', (req, res) => {
  res.json({tipo:"200", datos: numeros});
})

app.get('/numeros/:numero', (req, res) => {
  res.json(numeros[req.params.numero - 1]);
})

app.listen(3000, () => { console.log('Server is running on http://localhost:3000')});