const { compare } = require("bcrypt");
const { AuthLogin } = require("../models/Auth");

module.exports = {
    async auth(req, res) {
        try {
            const { email, password } = req.body;
            const user = await AuthLogin({ email, password });

            if (!user)
                return res
                    .status(404)
                    .send({ error: "Username or password not found" });
            const passwordMatch = await compare(password, user.password);

            if (!passwordMatch) {
                return res.status(404).send({ error: "User or Password incorrect" });
            }
            const session = {
                id: user.id,
                email: user.email,
                fullName: `${user.firstName} ${user.lastName}`,
                userName: user.userName,
                userProfile: user.userProfile,
                role: user.role,
                type: user.type,
                active: user.active
            }
            req.session.autorizado = true;
            req.session.user = session;

            if (req.session.autorizado && req.session.user.type == 'admin') {
                res.render("admin/index");
            } else if (req.session.autorizado && req.session.user.type == 'manager') {
                res.render("admin/index");
            } else if (req.session.autorizado && req.session.user.type == 'assistant') {
                res.render("admin/index");
            } else {
                res.end("Falha na autenticação")
            }

        } catch (e) {
            return res.status(409).send(e.message);
        }
    },
};