const { hash } = require("bcrypt");
const User = require("../../models/User");
const Permission = require("../../models/Permission");

module.exports = {
    async findAllPermissionHandler(req, res) {
        try {
            const { limit, page, search } = req.query;
            const permission = await Permission.findAll({ limit, page, search });
            return res.send(permission);
        } catch (e) {
            return res.status(409).send(e.message);
        }
    },
    async getByIdHandler(req, res) {
        try {
            const id = parseInt(req.params.id);
            const permission = await Permission.findById(id);

            return res.send(permission);
        } catch (e) {
            return res.status(409).send(e.message);
        }
    },
    async addHandler(req, res) {
        try {
            const value = req.body;
            const permission = await Permission.add(value);
            return res.send(permission);
        } catch (e) {
            return res.status(409).send(e.message);
        }
    },
    async updateHandler(req, res) {
        try {
            const id = parseInt(req.params.id);
            const value = req.body;
            const permission = await Permission.update(id, value);
            return res.send(permission);
        } catch (e) {
            return res.status(409).send(e.message);
        }
    },
    async deleteHandler(req, res) {
        try {
            const id = parseInt(req.params.id);
            const permission = await Permission.delete(id);
            return res.send(permission);
        } catch (e) {
            return res.status(409).send(e.message);
        }
    }
}