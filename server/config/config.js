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
    urlDB = 'mongodb+srv://fbidegain:vU0UoHvt8giUC8sA@cluster0-mpuau.mongodb.net/cafe'
}
//------------------------------------------------------

process.env.URLDB = urlDB;

module.exports = {
    port
}