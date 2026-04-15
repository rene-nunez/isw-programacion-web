const btnAgregar = document.getElementById("btnAgregar");
const btnListar = document.getElementById("btnListar");
const btnBuscar = document.getElementById("btnBuscar");

const lista = document.getElementById("lista");

btnAgregar.addEventListener("click", async () => {
    const placa = document.getElementById("placa").value;
    const marca = document.getElementById("marca").value;
    const modelo = document.getElementById("modelo").value;

    const res = await fetch("http://localhost:3000/vehiculos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ placa, marca, modelo })
    });

    console.log(res.json());
});