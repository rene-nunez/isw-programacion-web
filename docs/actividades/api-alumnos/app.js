import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());

class Alumno {
    constructor(ncuenta, nombre) {
        this.ncuenta = ncuenta;
        this.nombre = nombre;
    }
}

class Grupo {
    constructor() {
        this.alumnos = [];
    }

    buscar(ncuenta) {
        for(let i = 0; i < this.alumnos.length; i++) {
            if(this.alumnos[i].ncuenta == ncuenta) {
                return grupo.alumnos[i];
            };
        };
    }

    listar() {
        return this.alumnos;
    }
 
    eliminar(ncuenta) {
        let alumno = null;

        for(let i = 0; i < this.alumnos.length; i++) {
            if(this.alumnos[i].ncuenta == ncuenta) {
                alumno = grupo.alumnos[i];
                break;
            };
        };
        
        if(!alumno) {
            return false;
        } else {
            grupo.alumnos.splice(alumno, 1);
            return true;
        }
        
    }
}

let grupo = new Grupo();
grupo.alumnos.push(new Alumno(20261, "Miguel"));
grupo.alumnos.push(new Alumno(20262, "Adrian"));
grupo.alumnos.push(new Alumno(20263, "Samuel"));

app.get('/alumnos', (req, res) => {
    res.json(grupo.listar());
})

app.get('/alumnos/:ncuenta', (req, res) => {
    res.json(grupo.buscar(req.params.ncuenta));
})

app.delete('/alumnos/:ncuenta', (req, res) => {
    let response = grupo.eliminar(req.params.ncuenta);

    if(!response) {
        res.json({res: "no existe"});
    } else {
        res.json({res: "eliminado"});
    }
});

app.listen(3000, () => { console.log('Server is running on http://localhost:3000')});