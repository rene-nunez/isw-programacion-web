/*
CLASSLIST

La propiedad element.classList permite manipular las clases CSS de un elemento HTML de forma sencilla.

Devuelve un objeto DOMTokenList con métodos útiles para agregar, eliminar y verificar clases.
*/

const elemento = document.querySelector("#miElemento");

// Métodos

// add()
elemento.classList.add("activo");
elemento.classList.add("rojo", "grande");

// remove()
elemento.classList.remove("oculto");

// toggle(), si no existe la crea
elemento.classList.toggle("visible");

// toggle con condición
elemento.classList.toggle("error", true);
elemento.classList.toggle("error", false);

// contains() → Devuelve true o false
if (elemento.classList.contains("activo")) {
  console.log("Tiene la clase activo");
}

// replace() → Reemplaza una clase por otra
elemento.classList.replace("rojo", "azul");

// length → Cantidad de clases
console.log("Cantidad de clases:", elemento.classList.length);



/* =====================================================
   ⏳ SETTIMEOUT
   ===================================================== */

/*
setTimeout permite ejecutar una función
después de un tiempo determinado (en milisegundos).

Sintaxis:
setTimeout(funcion, tiempo);
*/

// Ejemplo básico
setTimeout(() => {
  console.log("Hola después de 2 segundos");
}, 2000);

// Guardar el temporizador
const temporizador = setTimeout(() => {
  console.log("Este mensaje puede cancelarse");
}, 3000);

// Cancelar el temporizador
clearTimeout(temporizador);



/* =====================================================
   🧩 SET
   ===================================================== */

/*
Un Set es una colección de valores únicos.
No permite elementos duplicados.
Mantiene el orden de inserción.
*/

const numeros = new Set([1, 2, 3, 3, 4]);

console.log(numeros); // Set {1, 2, 3, 4}

/* 🔹 MÉTODOS DE Set */

// add() → Agrega un valor
numeros.add(5);

// delete() → Elimina un valor
numeros.delete(2);

// has() → Verifica si existe un valor
console.log(numeros.has(3)); // true

// size → Cantidad de elementos
console.log("Cantidad:", numeros.size);

// clear() → Elimina todos los elementos
// numeros.clear();

/* 🔹 Recorrer un Set */

numeros.forEach((valor) => {
  console.log("Valor:", valor);
});

// Convertir Set a Array
const arraySinDuplicados = [...numeros];
console.log(arraySinDuplicados);



/* =====================================================
   🗺️ MAP
   ===================================================== */

/*
Map es una colección de pares clave → valor.

Diferencias con Object:
- Las claves pueden ser de cualquier tipo (string, número, objeto, etc.)
- Mantiene el orden de inserción
- Tiene métodos específicos para trabajar con datos
*/

const usuarios = new Map();

/* 🔹 MÉTODOS DE Map */

// set() → Agrega o actualiza una clave
usuarios.set("Juan", 25);
usuarios.set("Ana", 30);

// get() → Obtiene el valor de una clave
console.log(usuarios.get("Juan")); // 25

// has() → Verifica si existe la clave
console.log(usuarios.has("Ana")); // true

// delete() → Elimina una clave
usuarios.delete("Ana");

// size → Cantidad de elementos
console.log("Cantidad usuarios:", usuarios.size);

// clear() → Elimina todo
// usuarios.clear();

/* 🔹 Claves pueden ser objetos */

const persona = { id: 1 };
usuarios.set(persona, "Administrador");

console.log(usuarios.get(persona)); // Administrador

/* 🔹 Recorrer un Map */

usuarios.forEach((valor, clave) => {
  console.log("Clave:", clave, "Valor:", valor);
});

// Convertir Map a Array
const arrayMap = [...usuarios];
console.log(arrayMap);