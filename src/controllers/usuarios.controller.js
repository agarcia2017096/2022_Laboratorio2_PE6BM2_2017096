//ALEJANDRO JAVIER GARCIA GARCIA -2017096 - PE6BM2

const Usuarios = require('../models/usuarios.model');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../services/jwt');

//********************************* 1. REGISTRAR MAESTRO POR DEFECTO ********************************* */
function RegistrarMaestroDefault(req, res) {
    var parametros = req.body;
    var usuarioModel = new Usuarios();
            usuarioModel.nombre = "MAESTRO";
            usuarioModel.apellido = "Bran";
            usuarioModel.password = "123456";
            usuarioModel.email = "erikbran@kinal.edu.gt";
            usuarioModel.rol = 'ROL_MAESTRO';
            usuarioModel.imagen = null;

            Usuarios.find({ email: "erikbran@kinal.edu.gt"}, (err, usuarioEncontrado) => {
                if ( usuarioEncontrado.length == 0 ) {

                    bcrypt.hash("123456", null, null, (err, passwordEncriptada) => {
                        usuarioModel.password = passwordEncriptada;

                        usuarioModel.save((err, usuarioGuardado) => {
                            if (err) return res.status(500)
                                .send({ mensaje: 'Error en la peticion' });
                            if(!usuarioGuardado) return res.status(500)
                                .send({ mensaje: 'Error al agregar el Usuario'});
                            
                            return res.status(200).send({ usuario: usuarioGuardado });
                        });
                    });                    
                } else {
                    return res.status(500)
                        .send({ mensaje: 'Este correo, ya  se encuentra utilizado' });
                }
            })
    
}


//********************************* 2. REGISTRAR MAESTROS ********************************* */
function RegistrarMaestros(req, res) {
    var parametros = req.body;
    var usuarioModel = new Usuarios();

    if(parametros.nombre && parametros.apellido && 
        parametros.email && parametros.password) {
            usuarioModel.nombre = parametros.nombre;
            usuarioModel.apellido = parametros.apellido;
            usuarioModel.email = parametros.email;
            usuarioModel.rol = 'ROL_MAESTRO';
            usuarioModel.imagen = null;

            Usuarios.find({ email : parametros.email }, (err, usuarioEncontrado) => {
                if ( usuarioEncontrado.length == 0 ) {

                    bcrypt.hash(parametros.password, null, null, (err, passwordEncriptada) => {
                        usuarioModel.password = passwordEncriptada;

                        usuarioModel.save((err, usuarioGuardado) => {
                            if (err) return res.status(500)
                                .send({ mensaje: 'Error en la peticion' });
                            if(!usuarioGuardado) return res.status(500)
                                .send({ mensaje: 'Error al agregar el Usuario'});
                            
                            return res.status(200).send({ usuario: usuarioGuardado });
                        });
                    });                    
                } else {
                    return res.status(500)
                        .send({ mensaje: 'Este correo, ya  se encuentra utilizado' });
                }
            })
    }else{
        return res.status(500)
        .send({ mensaje: 'Debe llenar los campos necesarios'});
    }
}

//////////////////////////////////////////ALUMNOS
//********************************* 3. REGISTRAR ALUMNOS ********************************* */
function RegistrarAlumnos(req, res) {
    var parametros = req.body;
    var usuarioModel = new Usuarios();

    if(parametros.nombre && parametros.apellido && 
        parametros.email && parametros.password) {
            usuarioModel.nombre = parametros.nombre;
            usuarioModel.apellido = parametros.apellido;
            usuarioModel.email = parametros.email;
            usuarioModel.rol = 'ROL_ALUMNO';
            usuarioModel.imagen = null;

            Usuarios.find({ email : parametros.email }, (err, alumnoEncontrado) => {
                if ( alumnoEncontrado.length == 0 ) {

                    bcrypt.hash(parametros.password, null, null, (err, passwordEncriptada) => {
                        usuarioModel.password = passwordEncriptada;

                        usuarioModel.save((err, usuarioGuardado) => {
                            if (err) return res.status(500)
                                .send({ mensaje: 'Error en la peticion' });
                            if(!usuarioGuardado) return res.status(500)
                                .send({ mensaje: 'Error al agregar el Usuario'});
                            
                            return res.status(200).send({ usuario: usuarioGuardado });
                        });
                    });                    
                } else {
                    return res.status(500)
                        .send({ mensaje: 'Este correo, ya  se encuentra utilizado' });
                }
            })
    }else{
        return res.status(500)
        .send({ mensaje: 'Debe llenar los campos necesarios'});
    }
}

//********************************* LOGIN ********************************* */
function Login(req, res) {
    var parametros = req.body;

 if(!parametros.email&&!parametros.password) return res.status(500)
 .send({ mensaje: 'Debe llenar los campos necesario'});

    Usuarios.findOne({ email : parametros.email }, (err, usuarioEncontrado)=>{
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if(usuarioEncontrado){
            bcrypt.compare(parametros.password, usuarioEncontrado.password, 
                (err, verificacionPassword)=>{//TRUE OR FALSE
                    if ( verificacionPassword ) {
                        if(parametros.obtenerToken === 'true'){
                            return res.status(200)
                                .send({ token: jwt.crearToken(usuarioEncontrado) })
                        } else {
                            usuarioEncontrado.password = undefined;
                            return  res.status(200)
                                .send({ usuario: usuarioEncontrado })
                        }

                    
                    } else {
                        return res.status(500)
                            .send({ mensaje: 'Las contraseña no es válida'});
                    }
                })

        } else {
            return res.status(500)
                .send({ mensaje: 'Error, el correo no se encuentra registrado.'})
        }
    })
}

 //********************************* EDITAR ********************************* */
//EDITAR USUARIOS
function EditarUsuariosNombreApellido(req, res) {
    var parametros = req.body;    
    var usuarioModel = new Usuarios();


    if(parametros.nombre&&parametros.apellido){

        Usuarios.findByIdAndUpdate(req.user.sub, {nombre:parametros.nombre,apellido:parametros.apellido}, {new : true},
            (err, usuarioActualizado)=>{
                if(err) return res.status(500)
                    .send({ mensaje: 'Error en la peticion' });
                if(!usuarioActualizado) return res.status(500)
                    .send({ mensaje: 'Error al editar el Usuario'});
                
                return res.status(200).send({usuario : usuarioActualizado})

            })
    }else{
        return res.status(500)
        .send({ mensaje: 'No puede modificar los campos necesarios para el logueo,solamente nombre y apellido'});
    }
       
}

//********************************* ELIMINAR ********************************* */
 //ELIMINAR USUARIOS
function EliminarUsuarios(req, res){

    Usuarios.findByIdAndDelete(req.user.sub,(err,usuarioEliminado)=>{
        if(err) return res.status(500).send({mensaje: "Error en la peticion"});
        if(!usuarioEliminado) return res.status(404).send({mensaje: "Error al eliminar usuario"})

        return  res.status(200).send({usuario:usuarioEliminado});
    })
}

//********************************* EXPORTAR ********************************* */
//EXPORTAR

module.exports ={
    EliminarUsuarios,
    EditarUsuariosNombreApellido,
    Login,
    RegistrarMaestroDefault,//
    RegistrarMaestros,//
    RegistrarAlumnos
    

}