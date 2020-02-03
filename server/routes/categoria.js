const express = require('express');
let { verificaToken } = require('../middlewares/autenticacion');
let { verificaRol } = require('../middlewares/autenticacion');

let app = express();
let Categoria = require('../models/categoria');

// 5 servicios
//necesitan los tokens

app.get('/categoria', (req, res) => {
    //muestra todas las categorias
    Categoria.find({})
        .sort('descripcion')
        .populate('usuario', 'nombre email')
        .exec((err, categorias) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                categorias
            })
        })

});

app.get('/categoria/:id', (req, res) => {
    //muestra una categoria por id
    let id = req.params.id;

    Categoria.findById(id, (err, categoriaDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: "No se encontro una categoria con este Id"
                }
            });
        }

        res.json({
            ok: true,
            categoriaDB
        })
    });

});

app.post('/categoria', verificaToken, (req, res) => {
    //regresa la nueva categoria
    //req.usuario._id

    let body = req.body;

    let categoria = new Categoria({
        descripcion: body.descripcion,
        usuario: req.usuario._id
    });

    categoria.save((err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }
        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        res.json({
            ok: true,
            categoria: categoriaDB
        })

    })

});

app.put('/categoria/:id', (req, res) => {
    //actualizar la descripcion de la categoria nada más
    let id = req.params.id;
    let body = req.body;

    let descCategoria = {
        descripcion: body.descripcion
    }
    Categoria.findByIdAndUpdate(id, descCategoria, { new: true, runValidators: true, useFindAndModify: false }, (err, categoriaDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }
        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        res.json({
            ok: true,
            categoria: categoriaDB
        })



    });

});

app.delete('/categoria/:id', [verificaToken, verificaRol], (req, res) => {
    //solo puede borrarla un admin
    //Categoria.findByIdAndRemove (eliminar fisicamente)
    let id = req.params.id;

    Categoria.findByIdAndRemove(id, (err, categoriaDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }
        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: "El Id no existe"
                }
            })
        }
        res.json({
            ok: true,
            message: "Categoría borrada"
        })

    })


});





module.exports = app;