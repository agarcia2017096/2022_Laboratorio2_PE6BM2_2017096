//ALEJANDRO JAVIER GARCIA GARCIA -2017096 - PE6BM2
const Cursos = require('../models/cursos.model');
const Asignaciones = require('../models/asignaciones.model');


//********************************* 1. AGREGAR CURSO ********************************* */
function AgregarCursos(req, res){
    var parametros = req.body;
    var cursoModel = new Cursos();

    if ( req.user.rol == "ROL_ALUMNO" ) return res.status(500)
        .send({ mensaje: 'No tiene acceso a crear Cursos'});


    if(parametros.nombreCurso){
        cursoModel.nombreCurso = parametros.nombreCurso;
        cursoModel.idMaestroCurso = req.user.sub;

        cursoModel.save((err, cursoGuardada) => {
            if(err) return res.status(500).send({ mensaje: "Error en la peticion" });
            if(!cursoGuardada) return res.status(500).send({ mensaje: "Error al guardar el curso"});
            
            return res.status(200).send({ curso: cursoGuardada });
        });


        Cursos.findOne({nombreCurso:"CURSO POR DEFECTO"}, (err, cursosEncontrados) => {

            if(err) return res.status(500).send({ mensaje: "Error en la peticion" });
    
            if(!cursosEncontrados){
                //Agregar por defecto

                var cursoModel = new Cursos();
                cursoModel.nombreCurso = "CURSO POR DEFECTO";
                cursoModel.idMaestroCurso =null;

                cursoModel.save((err, cursoGuardada) => {
                    if(err) return res.status(500).send({ mensaje: "Error en la peticion guardar" });
                    if(!cursoGuardada) return res.status(500).send({ mensaje: "Error al guardar el curso"});
                });
            //      
            }

        })

    } else{
        return res.status(500).send({ mensaje: "Debe rellenar los campos necesarios." });
    }
}
 
//********************************* 2. BUSCAR TODOS LOS CURSOS ********************************* */
function ObtenerCursosTodos(req, res) {

    Cursos.find({}, (err, cursosEncontrados) => {
        if(err) return res.status(500).send({ mensaje: "Error en la peticion" });
        if(!cursosEncontrados) return res.status(500).send({ mensaje: "Error al obtener las encuestas."});

        return res.status(200).send({ curso: cursosEncontrados });
    }).populate('idMaestroCurso', 'nombre email')
}

//********************************* 2.1. BUSCAR CURSOS DEL PROFESOR ********************************* */
function ObtenerCursosProfesor(req, res) {

    if ( req.user.rol == "ROL_ALUMNO" ) return res.status(500)
    .send({ mensaje: 'No tiene acceso a buscar Cursos'});

    Cursos.find({idMaestroCurso:req.user.sub}, (err, cursosEncontrados) => {
        if(err) return res.status(500).send({ mensaje: "Error en la peticion" });
        if(!cursosEncontrados) return res.status(500).send({ mensaje: "Error al obtener las encuestas."});

        return res.status(200).send({ curso: cursosEncontrados });
    }).populate('idMaestroCurso', 'nombre email')
}

//********************************* 3. EDITAR CURSOS ********************************* */
function EditarCursos(req, res) {
    var idCur = req.params.idCurso;
    var parametros = req.body;

    if ( req.user.rol == "ROL_ALUMNO" ) return res.status(500)
    .send({ mensaje: 'No tiene acceso a editar Cursos'});

    Cursos.findByIdAndUpdate(idCur, parametros, { new: true } ,(err, cursosActualizado) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion'});
        if(!cursosActualizado) return res.status(404).send( { mensaje: 'Error al Editar el Cursos'});

        return res.status(200).send({ curso: cursosActualizado});
    });
}

//********************************* 4. ELIMINAR CURSOS ********************************* */
function EliminarCursos(req, res){
    var idCur = req.params.idCurso

    if ( req.user.rol == "ROL_ALUMNO" ) return res.status(500)
    .send({ mensaje: 'No tiene acceso a eliminar Cursos'});

    Cursos.findById(idCur, (err, cursosEncontradosId) => {

        if(err) return res.status(500).send({ mensaje: "Error en la peticion" });
        if(!cursosEncontradosId) return res.status(500).send({ mensaje: "Error al buscar el curso"});

        if ( cursosEncontradosId.nombreCurso == "CURSO POR DEFECTO" ) {
            return res.status(500)
        .send({ mensaje: 'No se puede eliminar este curso'});
        }else{
            //
            Asignaciones.find({idCurso: idCur}, (err,cursoEncontrado)=>{
                if(cursoEncontrado.length !=0){  

                    Cursos.findOne({nombreCurso:"CURSO POR DEFECTO"}, (err, cursosEncontrados) => {
                        if(err) return res.status(500).send({ mensaje: "Error en la peticion" });
                        console.log(cursosEncontrados._id)
                        
                        Asignaciones.updateMany({idCurso:idCur},{idCurso:cursosEncontrados._id}, { new: true } ,(err, cursosActualizado)=>{
                            if (err) return res.status(500).send({ mensaje: 'Error en la peticion editar'});
                            if(!cursosActualizado) return res.status(404).send( { mensaje: 'Error al Editar el Cursos'});
            
                        })
                    })

                    Cursos.findByIdAndDelete(idCur,(err,cursoEliminado)=>{
                        if(err) return res.status(500).send({mensaje: "Error en la peticion1"});
                        if(!cursoEliminado) return res.status(404).send({mensaje: "Error al eliminar1"})
                        return res.status(200).send({Eliminacion_y_Modificacion_Exitosa_por_Id: cursoEliminado})

                    })

                }else{
                    Cursos.findByIdAndDelete(idCur,(err,cursoEliminado)=>{
                        if(err) return res.status(500).send({mensaje: "Error en la peticion2"});
                        if(!cursoEliminado) return res.status(404).send({mensaje: "Error al eliminar2"})
                        return res.status(200).send({Eliminacion_y_Modificacion_Exitosa_por_Id: cursoEliminado})
                    })
                }

            })
        }
    })




}



module.exports = {
    AgregarCursos,
    ObtenerCursosTodos,
    EditarCursos,
    EliminarCursos,
    ObtenerCursosProfesor,
}