const { hash } = require("bcrypt");
const User = require("../models/User");
const { use } = require("../app");

module.exports = {
    async addHandler(req, res) {
        try {
            const value = req.body;
            const file = req.file;
            const passwordHashed = await hash(value.password, 8);
            value.password = passwordHashed;
            value.userProfile = file.filename;
            const user = await User.add(value);
            return res.send(user);
        } catch (e) {
            return res.status(409).send(e.message);
        }

    },
    async findAllUserHandler(req, res) {
        try {
            const { limit, page, search } = req.query;
            const user = await User.findAll({ page, limit, search });
            const allUser = user.map(objeto => {
                delete objeto.password;
                return { ...objeto };
            });
            return res.send(allUser);
        } catch (e) {
            return res.status(409).send(e.message);
        }
    },

    async getUserById(req, res) {
        try {
            const id = parseInt(req.params.id);
            const user = await User.findById(id);
            if (!user) return res.send({
                message: "Não foi encontrado nenhum usuário"
            });
            return res.send(user);
        } catch (e) {
            return res.status(409).send(e.message);
        }
    },
    async updateHandler(req, res) {
        try {
            const id = parseInt(req.params.id);
            const value = req.body;
            const user = await User.update(id, value);
            return res.send(user);
        } catch (e) {
            return res.status(409).send(e.message);
        }
    },
    async deleteHanler(req, res) {
        try {
            const id = parseInt(req.params.id);
            const user = await User.delete(id);
            return res.send(user);
        } catch (e) {
            return res.status(409).send(e.message);
        }
    },
    userPage(req, res) {
        res.render("admin/user");
    },

    async new(req, res) {
        res.render("admin/register");
    },
}