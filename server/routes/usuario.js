//# # # Requires # # # # # # # # # # # # # # # # # # # # #
const express = require('express');
const app = express();
const Usuario = require('../models/uruario');
const bcrypt = require('bcrypt');
const _ = require('underscore');
//# # # # # # #  # # # # # # # # # # # # # # # # # # # # #



app.get('/usuario', function(req, res) {

    let activo = { estado: true }

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    Usuario.find({ estado: true }, 'nombre email role')
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            Usuario.countDocuments({ estado: true }, (err, conteo) => {
                res.json({
                    ok: true,
                    usuarios,
                    cantidad: conteo
                })
            })

        })
        // res.json('get usuario local')
});



app.post('/usuario', function(req, res) {

    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10), //hashSync para que reealiza el encriptado. 1er param(que se quiere enccriptar)2do(cantida de vueltas del encriptado)
        role: body.role
    });

    usuario.save((err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            usuario: usuarioDB
        });

    });

});



app.put('/usuario/:id', function(req, res) {

    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            usuario: usuarioDB
        });
    })
});



app.delete('/usuario/:id', function(req, res) {

    let id = req.params.id;

    let borraUsuario = {
        estado: false
    };

    Usuario.findByIdAndUpdate(id, borraUsuario, { new: true }, (err, usuarioBorrado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            if (usuarioBorrado == null) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'Usuario no encontrado'
                    }
                });
            }

            res.json({
                ok: true,
                usuario: usuarioBorrado

            })
        })
        //res.json('delete usuario')
});


module.exports = app;