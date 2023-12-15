const path = require('path');
const fs = require('fs');
const Video = require("../../models/Video");
const { deleteFileInDataBase } = require('../../utils/function');

module.exports = {
    async addHandler(req, res) {
        try {
            const value = req.body;
            const file = req.file;
            value.image = file.filename;
            value.active = 1;
            value.visible = 1;
            value.userId = req.session?.user.id;
            const video = await Video.add(value);
            return res.send(video);
        } catch (e) {
            return res.status(409).send(e.message);
        }
    },
    async findAllVideoHandler(req, res) {
        try {
            const { limit, page, search } = req.query;
            const video = await Video.findAll({ page, limit, search });
            return res.send(video);
        } catch (e) {
            return res.status(409).send(e.message);
        }
    },

    async getVideoById(req, res) {
        try {
            const id = parseInt(req.params.id);
           
            const video = await Video.findById(id);
            if (!video) return res.send({
                message: "Não foi encontrado nenhuma video"
            });
            return res.send(video);
        } catch (e) {
            return res.status(409).send(e.message);
        }
    },

    async updateVideoHandler(req, res) {
        try {
            const id = parseInt(req.params.id);
            const value = req.body;
            const file = req.file;

            if (file) {
                value.image = file.filename;
                const videoData = await Video.findById(id);

                if (videoData) {
                    const resultDelete = await deleteFileInDataBase('video', videoData?.image);
                    if (!resultDelete) return res.status(409).send({ message: 'Ocorreu um erro ao excluir o arquivo' });
                    const not = await Video.update(id, value);
                    return res.send(not);
                }
            } else {
                delete value.image;
                const not = await Video.update(id, value);
                return res.send(not);
            }
        } catch (e) {
            return res.status(409).send(e.message);
        }
    },

    async deleteVideoHanler(req, res) {
        try {
            const id = parseInt(req.params.id);
            const result = await Video.findById(id);
            const video = await Video.delete(result.id);
            if(result.image) {
                await deleteFileInDataBase('video', result.image);
                return res.send(video);
            }else{
                return res.send(video);
            }
        } catch (e) {
            return res.status(409).send(e.message);
        }
    },
}