const path = require('path');
const fs = require('fs');
const Banner = require("../../models/Banner");
const { deleteFileInDataBase } = require('../../utils/function');

module.exports = {
    async addHandler(req, res) {
        try {
            const value = req.body;
            const file = req.file;
            value.banner = file.filename;
            value.active = 1;
            value.visible = 1;
            value.userId = req.session?.user.id;
            const banner = await Banner.add(value);
            return res.send(banner);
        } catch (e) {
            return res.status(409).send(e.message);
        }
    },
    async findAllBannerHandler(req, res) {
        try {
            const { limit, page, search } = req.query;
            const banner = await Banner.findAll({ page, limit, search });
            return res.send(banner);
        } catch (e) {
            return res.status(409).send(e.message);
        }
    },

    async getBannerById(req, res) {
        try {
            const id = parseInt(req.params.id);
           
            const banner = await Banner.findById(id);
            if (!banner) return res.send({
                message: "Não foi encontrado nenhuma banner"
            });
            return res.send(banner);
        } catch (e) {
            return res.status(409).send(e.message);
        }
    },

    async updateBannerHandler(req, res) {
        try {
            
            console.log("Estou entrar aqui")
            const id = parseInt(req.params.id);
            const value = req.body;
            const file = req.file;
            console.log(value, file);
            if (file) {
                value.banner = file.filename;
                const bannerData = await Banner.findById(id);

                if (bannerData) {
                    const resultDelete = await deleteFileInDataBase('banner', bannerData?.banner);
                    console.log(resultDelete);
                    if (!resultDelete) return res.status(409).send({ message: 'Ocorreu um erro ao excluir o arquivo' });
                    const not = await Banner.update(id, value);
                    return res.send(not);
                }
            } else {
                delete value.banner;
                const not = await Banner.update(id, value);
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
            const banner = await Banner.delete(id);
            return res.send(banner);
        } catch (e) {
            return res.status(409).send(e.message);
        }
    },
    async deleteHanlerFile(req, res) {
        try {
            const filename = req.params.filename;
            const filepath = path.resolve(__dirname, '..', '..', 'public', 'img', 'banner', filename);
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