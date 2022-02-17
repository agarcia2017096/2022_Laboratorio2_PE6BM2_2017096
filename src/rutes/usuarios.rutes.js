//ALEJANDRO JAVIER GARCIA GARCIA -2017096 - PE6BM2

const express = require('express');
const usuariosController = require('../controllers/usuarios.controller')
const md_autentificacion = require('../middlewares/autentication')

//RUTAS
var api = express.Router();

 //********************************* USUARIOS ********************************* */
//AGREGAR MAESTRO DEFAULT
api.post('/agregarMaestroDefault',usuariosController.RegistrarMaestroDefault)

//REGISTRAR MAESTROS
api.post('/registrarMaestros', usuariosController.RegistrarMaestros);

//REGISTRAR ALUMNOS
api.post('/registrarAlumnos', usuariosController.RegistrarAlumnos);

//LOGIN USUARIOS
api.post('/login', usuariosController.Login);

/* - - - PERFIL  - - -*/
//ELIMINAR
api.delete('/usuariosEliminar',md_autentificacion.Auth,usuariosController.EliminarUsuarios)
//EDITAR CAMPOS QUE NO AFECTEN AL LOGIN
api.put('/usuariosEditar',md_autentificacion.Auth, usuariosController.EditarUsuariosNombreApellido)

module.exports = api