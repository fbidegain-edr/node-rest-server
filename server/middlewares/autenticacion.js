const jwt = require('jsonwebtoken');



//----- Verificar token --------------

let verificaToken = (req, res, next) => {

    let token = req.get('token'); // obtiene del los header el parámetro llamado token

    jwt.verify(token, process.env.SEED, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no válido'
                }
            })
        }
        req.usuario = decoded.usuario;
        next();

    })

};


//----- Verificar ADMIN_ROLE --------------

let verificaRol = (req, res, next) => {

    let usuario = req.usuario;

    if (usuario.role != 'ADMIN_ROLE') {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'El usuario no es administrador'
            }
        })
    }
    console.log(usuario.role);
    next();
};


module.exports = { verificaToken, verificaRol };