const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol válido'
};

let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario'] // se pasa como 2do parámetro un mensaje en caso de que no se ingrese el valor requerido
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El mail es necesario']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es necesaria']
    },
    img: {
        type: String
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }

});

// ----------------------------------------------------------------------------------
usuarioSchema.plugin(uniqueValidator, { messge: '{PATH} debe de ser único' });
/* ----------------------------------------------------------------------------------
Se pasa como primer parámetro el del .plugin() el plugin deseado, 
en este caso uniqueValidator. 
Como segundo parámetro opcinal un mensaje
 ------------------------------------------------------------------------------------*/






// ----------------------------------------------------------------------------------
usuarioSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();

    delete userObject.password;

    return userObject;
};
/* ----------------------------------------------------------------------------------
"usuarioSchema.methods.toJSON" llama al metodo toJSON que imprime el JSON del objeto
(toJSON siempre se llama cuando se intenta imprimir).

Definimos "user" como el objeto que traiga a travez de this.

Definimos "userObject" como las propiedades de "user" a travez de la función toObject()

Luego eliminamos password del objeto userObject

Por último retornamos userObject ya sin el atributo password para que no sea mostrado
cuando se imprima el Json.

 ------------------------------------------------------------------------------------*/






// ----------------------------------------------------------------------------------
module.exports = mongoose.model('Usuario', usuarioSchema);
/* ----------------------------------------------------------------------------------
Se pasa como primer parámetro el nombre que se desea para el modelo
Como segundo parámetro se pasa la variable de la cual va a obtener su configuración
 ------------------------------------------------------------------------------------*/