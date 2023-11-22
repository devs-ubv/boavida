const path = require('path');
const fs = require('fs');
const Photo = require("../../models/Photo");

module.exports = {
    async addHandler(req, res) {
        try {
            const value = req.body;
            const file = req.file;
     
            value.image = file.filename;
            const image = await Photo.add(value);
            return res.send(image);
        } catch (e) {
            return res.status(409).send(e.message);
        }
    },
    async findAllPhotoHandler(req, res) {
        try {
            const { limit, page, search } = req.query;
            const not = await Photo.findAll({ page, limit, search });
            return res.send(not);
        } catch (e) {
            return res.status(409).send(e.message);
        }
    },

    async getPhotoById(req, res) {
        try {
            const id = parseInt(req.params.id);
            const user = await Photo.findById(id);
            if (!user) return res.send({
                message: "Não foi encontrado nenhuma imagem"
            });
            return res.send(user);
        } catch (e) {
            return res.status(409).send(e.message);
        }
    },
    async updatePhotoHandler(req, res) {
        try {
            const id = parseInt(req.params.id);
            const value = req.body;
            const not = await Photo.update(id, value);
            return res.send(not);
        } catch (e) {
            return res.status(409).send(e.message);
        }
    },
    async deleteHanler(req, res) {
        try {
            const id = parseInt(req.params.id);
            const not = await Photo.delete(id);
            return res.send(not);
        } catch (e) {
            return res.status(409).send(e.message);
        }
    },
    async deleteHanlerFile(req, res) {
        try {
            const filename = req.params.filename;
            const filepath = path.resolve(__dirname, '..', '..', 'public', 'img', 'news-images', filename);
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