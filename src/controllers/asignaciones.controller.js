//ALEJANDRO JAVIER GARCIA GARCIA -2017096 - PE6BM2
const Asignaciones = require('../models/asignaciones.model');


//********************************* 1. AGREGAR ASIGNACION ********************************* */
function AgregarAsignacion(req, res){
    var parametros = req.body;
    var cursoModel = new Asignaciones();

    if ( req.user.rol == "ROL_MAESTRO" ) return res.status(500)
        .send({ mensaje: 'Los maestros no pueden asignarse cursos'});

    if(parametros.idCurso){
        cursoModel.idCurso = parametros.idCurso;
        cursoModel.idAlumno = req.user.sub;
        Asignaciones.find({idAlumno:req.user.sub}, (err, cantidadCursos) => {

        if ( cantidadCursos.length <3 ) {

          Asignaciones.find({ idCurso : parametros.idCurso,idAlumno:req.user.sub}, (err, asignacionEncontrada) => {
                if ( asignacionEncontrada.length ==0 ) {
                    cursoModel.save((err, asignacionGuardada) => {
                    if(err) return res.status(500).send({ mensaje: "Error en la peticion" });
                    if(!asignacionGuardada) return res.status(500).send({ mensaje: "Error al guardar el asignacion"});
                        
                    return res.status(200).send({ asignacion: asignacionGuardada });
                    });
               }else{
                    return res.status(500)
                    .send({ mensaje: 'Este curso ya  se encuentra asignado' });
            }
        })
        
    } else {
        return res.status(500)
            .send({ mensaje: 'No puede asignar mas cursos' });
    }
})
    } else{
        return res.status(500).send({ mensaje: "Debe rellenar los campos necesarios." });
    }
}

//********************************* 1. OBTENER ASIGNACIONES ********************************* */
function ObtenerAsignaciones(req, res) {
    Asignaciones.find((err, asignacionEncontrada) => {
        if(err) return res.status(500).send({ mensaje: "Error en la peticion" });
        if(!asignacionEncontrada) return res.status(500).send({ mensaje: "Error al obtener las asignaciones."});

        return res.status(200).send({ asignacion: asignacionEncontrada });

    }).populate('idCurso', 'nombreCurso')
        .populate('idAlumno', 'nombre apellido email');
}

//********************************* 1. OBTENER ASIGNACIONES ********************************* */
function ObtenerAsignacionesAlumno(req, res) {
    var idOpcional = req.params.idAlumno
   
    if(idOpcional != null && idOpcional){
        

        Asignaciones.find({idAlumno:idOpcional},(err, asignacionEncontrada1) => {
            if(err) return res.status(500).send({ mensaje: "Error en la peticion" });
            if(!asignacionEncontrada1) return res.status(500).send({ mensaje: "Error al obtener las asignaciones."});
    
            return res.status(200).send({ asignacion1: asignacionEncontrada1 });
    
        }).populate('idCurso', 'nombreCurso').populate('idAlumno','nombre email')

    }else{

        if ( req.user.rol == "ROL_MAESTRO" ) return res.status(500)
        .send({ mensaje: 'Los maestros deben colocar el ID del alumno en la ruta (ruta opcional)'});


        Asignaciones.find({idAlumno:req.user.sub},(err, asignacionEncontrada) => {
            if(err) return res.status(500).send({ mensaje: "Error en la peticion" });
            if(!asignacionEncontrada) return res.status(500).send({ mensaje: "Error al obtener las asignaciones."});
    
            return res.status(200).send({ asignacion: asignacionEncontrada });
    
        }).populate('idCurso', 'nombreCurso').populate('idAlumno','nombre email')

    }


}

module.exports = {
    AgregarAsignacion,
    ObtenerAsignaciones,
    ObtenerAsignacionesAlumno
}


