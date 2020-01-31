//# # # Puerto # # # # # # # # # # # # # # # # # # # # #

const port = process.env.PORT = process.env.PORT || 3000

//# # # # # #  # # # # # # # # # # # # # # # # # # # # #



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

process.env.URLDB = urlDB;

module.exports = {
    port
}