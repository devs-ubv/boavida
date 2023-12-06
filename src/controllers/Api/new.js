const path = require('path');
const fs = require('fs');
const New = require("../../models/New");
const { deleteFileInDataBase } = require('../../utils/function');

module.exports = {
    async addHandler(req, res) {
        try {
            const value = req.body;
            const file = req.file;
            value.cover = file.filename;
            value.userId = req.session?.user.id;
            value.active = 1;
            value.visible = 1;

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
            const file = req.file;
            console.log(value, file);
            if (file) {
                value.cover = file.filename;
                const newData = await New.findById(id);

                if (newData) {
                    const resultDelete = await deleteFileInDataBase(newData?.cover);
                    console.log(resultDelete);
                    if (!resultDelete) return res.status(409).send({ message: 'Ocorreu um erro ao excluir o arquivo' });
                    const not = await New.update(id, value);
                    return res.send(not);
                }
            } else {

                const not = await New.update(id, value);
                return res.send(not);
            }
        } catch (e) {
            console.log(e);
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