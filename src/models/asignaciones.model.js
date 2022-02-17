//ALEJANDRO JAVIER GARCIA GARCIA -2017096 - PE6BM2

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CursosSchema = Schema({
    idCurso: { type: Schema.Types.ObjectId, ref: 'Cursos'},
    idAlumno: { type: Schema.Types.ObjectId, ref: 'Usuarios'}
});

module.exports = mongoose.model('Asignaciones', CursosSchema);