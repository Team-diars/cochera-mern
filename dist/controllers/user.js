"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User = require("../models/user");
const bcrypt = require("bcrypt");
const getUsers = async (req, res) => {
    const users = await User.find({ status: 1 }).exec();
    return res.status(200).json({
        ok: true,
        customers: users.map((user) => {
            return {
                id: user.id,
                fullname: user.fullname,
                email: user.email,
                date: user.date,
            };
        }),
    });
};
const registerUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const emailExists = await User.findOne({ email: email, status: 1 }).exec();
        if (emailExists)
            return res.status(400).json({
                ok: false,
                msg: "El email ya está en uso",
            });
        const user = new User(req.body);
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);
        await user.save();
        return res.status(200).json({
            ok: true,
            msg: "Usuario registrado exitosamente",
            user: {
                id: user.id,
                fullname: user.fullname,
                email: user.email,
                date: user.date,
            },
        });
    }
    catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Ocurrio un error" + error,
        });
    }
};
const updateUser = async (req, res) => {
    try {
        const { id, fullname, email, password } = req.body;
        const emailExists = await User.findOne({
            email: email,
            status: 1,
            _id: { $ne: id },
        }).exec();
        if (emailExists)
            return res.status(400).json({
                ok: false,
                msg: "El email ya está en uso"
            });
        const user = await User.findOne({ _id: id, status: 1 });
        if (!user)
            return res.status(404).json({
                ok: false,
                msg: "El usuario no existe",
            });
        user.fullname = fullname;
        user.email = email;
        if (password) {
            const salt = await bcrypt.genSaltSync();
            user.password = await bcrypt.hashSync(password, salt);
        }
        await user.save();
        return res.status(200).json({
            ok: true,
            msg: "Usuario actualizado exitosamente",
            user: {
                id: user.id,
                fullname: user.fullname,
                email: user.email,
                date: user.date,
            },
        });
    }
    catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Ocurrio un error",
        });
    }
};
const deleteUser = async (req, res) => {
    try {
        const { id } = req.body;
        const user = await User.findOne({ _id: id, status: 1 });
        if (!user)
            return res.status(404).json({
                ok: false,
                msg: "El usuario no existe",
            });
        user.status = 0;
        user.save();
        return res.status(200).json({
            ok: true,
            msg: "Usuario eliminado exitosamente",
        });
    }
    catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Ocurrio un error",
        });
    }
};
module.exports = {
    getUsers,
    registerUser,
    updateUser,
    deleteUser,
};
