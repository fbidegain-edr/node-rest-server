//# # # Puerto # # # # # # # # # # # # # # # # # # # # #

const port = process.env.PORT = process.env.PORT || 3000

//# # # # # #  # # # # # # # # # # # # # # # # # # # # #


const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

// --- ENTORNO -----------------------------------------

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//------------------------------------------------------



//------- DB -------------------------------------------
let urlDB;
if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe'
} else {
    urlDB = process.env.MONGO_URI
}
//------------------------------------------------------



//-----TOKEN --------------------------------------------
//===== SEED =====================
process.env.SEED = process.env.SEED || 'este-es-el-seed-de-desarrollo'
    //================================

//===== Fecha de EXP =============
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;
//================================
//-------------------------------------------------------


//===== Google Client ID =========
process.env.CLIENT_ID = process.env.CLIENT_ID || '1065497464400-qa9l20dblsq7unlh7uobh9vtum5d6qvv.apps.googleusercontent.com';
//================================
//-------------------------------------------------------

process.env.URLDB = urlDB;

module.exports = {
    port
}