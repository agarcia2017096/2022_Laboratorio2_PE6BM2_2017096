//ALEJANDRO JAVIER GARCIA GARCIA -2017096 - PE6BM2

const mongoose = require('mongoose');
const app = require('./app')

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/IN6BM2_LAB2_2017096',{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
    console.log('Se encuentra conectado a la base de datos.');

    app.listen(3000,function(req, res){
        console.log('IN6BM, eL servidor esta corriendo correctamente (puerto 3000))');
    
    })
}).catch(error =>console.log(error))

