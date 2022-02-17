//ALEJANDRO JAVIER GARCIA GARCIA -2017096 - PE6BM2

const express = require('express');
const CursosController = require('../controllers/cursos.controller');
const md_autenticacion = require('../middlewares/autentication');

const api = express.Router();

//AGREGAR CURSO CON VERIFICACION DE ROL
api.post('/agregarCurso', md_autenticacion.Auth, CursosController.AgregarCursos);

//EDITAR CURSO CON VERIFICACION DE ROL
api.put('/editarCurso/:idCurso', md_autenticacion.Auth, CursosController.EditarCursos);

//ELIMINAR CURSO CON VERIFICACION DE ROL
//INTRUCCION: En el caso de eliminar un curso con alumnos asignados se deberá 
//desasignar a los alumnos el curso y asignarlos a un curso por default.
//--FUNCIONAMIENTO CORRECTO, CAMBIA EL ID DEL CURSO EN ASIGNACION POR EL DE DEFECTO
api.delete('/eliminarCursos/:idCurso', md_autenticacion.Auth,CursosController.EliminarCursos)

//OBTENER LOS CURSOS DEL PROFESOR
api.get('/obtenerCursosProfesor', md_autenticacion.Auth, CursosController.ObtenerCursosProfesor);

//OBTENER TODOS LOS CURSOS - EXTRA, YA QUE ES INFORMACIÓN GENERAL DE CURSOS
api.get('/obtenerCursosTodos', md_autenticacion.Auth, CursosController.ObtenerCursosTodos);

module.exports = api;