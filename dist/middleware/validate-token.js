"use strict";
const jwt = require("jsonwebtoken");
const validateJWT = (req, res, next) => {
    //x-token
    const token = req.header("x-token");
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: "Usuario no autenticado",
        });
    }
    try {
        const { uid, name } = jwt.verify(token, process.env.SECRET_JWT_SEED);
        req.uid = uid;
        req.name = name;
    }
    catch (error) {
        return res.status(401).json({
            ok: false,
            msg: "Token no valido",
        });
    }
    next();
};
module.exports = {
    validateJWT,
};
