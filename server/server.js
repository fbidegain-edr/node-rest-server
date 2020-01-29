const express = require('express');
const app = express();
const port = require('./config/config').port

const bodyParser = require('body-parser')
    // parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
    // parse application/json
app.use(bodyParser.json())






app.get('/', function(req, res) {
    res.json('Hello World')
});

//# # # Usuarios # # # # # # # # # # # # # # # # # # # # #
app.get('/usuario', function(req, res) {
    res.json('get usuario')
});
app.post('/usuario', function(req, res) {
    let body = req.body;

    if (body.nombre == undefined) {
        res.status(400).json({
            Estado: "Error",
            mensaje: "El nombre es requerido"
        })
    } else {
        res.json({ persona: body })
    }

});
app.put('/usuario/:id', function(req, res) {

    let id = req.params.id;

    res.json({ id })
});
app.delete('/usuario', function(req, res) {
    res.json('delete usuario')
});
// # # # # # # # # # # # # # # # # # # # # # # # # # # # # # 

app.listen(port, () => {
    console.log(`Escuchando puerto ${port}`)
});