const path = require('path');
const fs = require('fs');
const New = require("../../models/New");

module.exports = {
    async addHandler(req, res) {
        try {
            const value = req.body;
            const file = req.file;
             value.cover = file.filename;
             value.userId = req.session?.user.id;
            const not = await New.add(value);
            return res.send(not); 
        } catch (e) {
            return res.status(409).send(e.message);
        }
    },
    async findAllNewHandler(req, res) {
        try {
            const { limit, page, search } = req.query;
            const not = await New.findAll({ page, limit, search });
            return res.send(not);
        } catch (e) {
            return res.status(409).send(e.message);
        }
    },

    async getNewById(req, res) {
        try {
            const id = parseInt(req.params.id);
            const newResult = await New.findById(id);
            if (!newResult) return res.send({
                message: "Não foi encontrado nenhuma notícia"
            });
          
            return res.send(newResult);
        } catch (e) {
            return res.status(409).send(e.message);
        }
    },
    async updateNewHandler(req, res) {
        try {
            const id = parseInt(req.params.id);
            const value = req.body;
            const not = await New.update(id, value);
            return res.send(not);
        } catch (e) {
            return res.status(409).send(e.message);
        }
    },
    async deleteHanler(req, res) {
        try {
            const id = parseInt(req.params.id);
            const not = await New.delete(id);
            return res.send(not);
        } catch (e) {
            return res.status(409).send(e.message);
        }
    },
    async deleteHanlerFile(req, res) {
        try {
            const filename = req.params.filename;
            console.log(filename);
            const filepath = path.resolve(__dirname, '..', '..', 'public', 'img', 'news', filename);
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