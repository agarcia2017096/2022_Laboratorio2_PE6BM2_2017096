//ALEJANDRO JAVIER GARCIA GARCIA -2017096 - PE6BM2

const express = require('express');
const AsignacionesController = require('../controllers/asignaciones.controller');
const md_autenticacion = require('../middlewares/autentication');

const api = express.Router();
//AGREGAR ASIGNACION
api.post('/agregarAsignacion',md_autenticacion.Auth,AsignacionesController.AgregarAsignacion)

//OBTENER ASIGNACIONES
api.get('/obtenerAsignacionesTodas',md_autenticacion.Auth,AsignacionesController.ObtenerAsignaciones)

//OBTENER ASIGNACIONES POR ALUMNO - EXTRA, VISTA DE ASIGNACION ESPECÍFICA
//INSTRUCCION:4. Podrá visualizar a los cursos que se encuentra asignado.
api.get('/obtenerAsignacionesAlumno/:idAlumno?',md_autenticacion.Auth,AsignacionesController.ObtenerAsignacionesAlumno)

module.exports = api;
