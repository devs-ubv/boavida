const { hash } = require("bcrypt");
const User = require("../../models/User");
const path = require('path');
const fs = require('fs');

module.exports = {
    async addHandler(req, res) {
        try {
            const value = req.body;
            const file = req.file;
            const passwordHashed = await hash(value.password, 8);
            value.password = passwordHashed;
            value.userProfile = file.filename;
            const user = await User.add(value);
            console.log(value);
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
    async deleteHanlerFile(req, res) {
        try {
            const filename = req.params.filename;
            console.log(filename);
            const filepath = path.resolve(__dirname, '..', '..', 'public', 'img', 'user', filename);
            console.log(filename);

            fs.unlink(filepath, function (err) {
                if (err) {
                    res.status(500).send('Ocorreu um erro ao excluir o arquivo');
                } else {

                    res.send('Arquivo excluído com sucesso');
                }
            })

        } catch (e) {
            return res.status(409).send(e.message);
        }
    },
}