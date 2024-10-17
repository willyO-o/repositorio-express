const jwt = require('jsonwebtoken');


const authMiddleware = (req, res, next) => {
    const authorization = req.headers['authorization'];

    // return res.status(401).json({
    //     mensaje: token
    // });

    if (!authorization) {
        return res.status(401).json({
            mensaje: 'No se proporcionó un token'
        });
    }

    const token = authorization.split(' ')[1];



    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {


        //mensjae de error para token expirado

        if (err && err.name === 'TokenExpiredError') {

            return res.status(401).json({
                mensaje: 'Token expirado'
            });

        }



        if (err) {
            return res.status(401).json({
                mensaje: 'Token inválido'
            });
        }

        req.usuario = decoded;
        next();
    });
};


module.exports = authMiddleware;