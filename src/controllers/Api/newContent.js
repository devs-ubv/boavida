const path = require('path');
const fs = require('fs');
const Content = require("../../models/Content");

module.exports = {
    async addHandler(req, res) {
        try {
            const value = req.body;
            const content = await Content.add(value);
            return res.send(content);
        } catch (e) {
            return res.status(409).send(e.message);
        }
    },
    async findAllContentHandler(req, res) {
        try {
            const { limit, page, search } = req.query;
            const content = await Content.findAll({ page, limit, search });
            const allContent = content.map(objeto => {
                return { ...objeto };
            });
            return res.send(allContent);
        } catch (e) {
            return res.status(409).send(e.message);
        }
    },

    async getContentById(req, res) {
        try {
            const id = parseInt(req.params.id);
            const user = await Content.findById(id);
            if (!user) return res.send({
                message: "Não foi encontrado nenhuma contentícia"
            });
            return res.send(user);
        } catch (e) {
            return res.status(409).send(e.message);
        }
    },
    async updateContentHandler(req, res) {
        try {
            const id = parseInt(req.params.id);
            const value = req.body;
            const content = await Content.update(id, value);
            return res.send(content);
        } catch (e) {
            return res.status(409).send(e.message);
        }
    },
    async deleteHanler(req, res) {
        try {
            const id = parseInt(req.params.id);
            const content = await Content.delete(id);
            return res.send(content);
        } catch (e) {
            return res.status(409).send(e.message);
        }
    },
    async deleteHanlerFile(req, res) {
        try {
            const filename = req.params.filename;
            console.log(filename);
            const filepath = path.resolve(__dirname, '..', '..', 'public', 'img', 'Contents', filename);
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