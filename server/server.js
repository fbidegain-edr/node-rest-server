//# # # Requires # # # # # # # # # # # # # # # # # # # # # # # # # # #
const port = require('./config/config').port
const mongoose = require('mongoose'); /* -DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.- */
mongoose.set('useCreateIndex', true);
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// -- parse application/x-www-form-urlencoded -------------
app.use(bodyParser.urlencoded({ extended: false }));
// --------------------------------------------------------
// -- parse application/json ------------------------------
app.use(bodyParser.json());
// --------------------------------------------------------
//# # # # # # #  # # # # # # # # # # # # # # # # # # # # # # # # # #


// app.get('/', function(req, res) {
//     res.json('Hello World')
// });

// Configuración global de rutas

app.use(require('./routes/index.js'));


mongoose.connect(process.env.URLDB, { useNewUrlParser: true, useUnifiedTopology: true },
    (err, res) => {
        if (err) throw new Error;
        console.log("Online");
    });
app.listen(port, () => {
    console.log(`Escuchando puerto ${port}`)
});