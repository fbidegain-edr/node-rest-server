const mongoose = require('mongoose');
let Schema = mongoose.Schema;

// let categoriaSchema = new Schema({

//     descripcion: {
//         type: String,
//         required: [true, 'La descripción es necesaria']
//     },
//     usuario: {
//         type: String
//     }

// });

let categoriaSchema = new Schema({
    descripcion: { type: String, unique: true, required: [true, 'La descripción es obligatoria'] },
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' }
});


// ----------------------------------------------------------------------------------
module.exports = mongoose.model('Categoria', categoriaSchema);
/* ----------------------------------------------------------------------------------
Se pasa como primer parámetro el nombre que se desea para el modelo
Como segundo parámetro se pasa la variable de la cual va a obtener su configuración
 ------------------------------------------------------------------------------------*/