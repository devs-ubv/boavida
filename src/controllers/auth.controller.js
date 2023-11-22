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
                    .send({ error: "Usuário ou senha incorretos. Por favor, verifique suas credenciais e tente novamente." });
            const passwordMatch = await compare(password, user.password);

            if (!passwordMatch) {
                return res.status(404).send({ error: "Usuário ou senha incorretos. Por favor, verifique suas credenciais e tente novamente." });
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

                return res.send({
                    auth: req.session.autorizado
                });

            } else if (req.session.autorizado && req.session.user.type == 'manager') {
                return res.send({
                    auth: req.session.autorizado
                });

            } else if (req.session.autorizado && req.session.user.type == 'assistant') {
                return res.send({
                    auth: req.session.autorizado
                });

            } else {
                res.end("Falha na autenticação")
            }

        } catch (e) {
            return res.status(409).send(e.message);
        }
    },
    async logout(req, res) {
        req.session.destroy(function(err) {
            if(!req.session) return  res.send({
                logout: true
            })
           
        })
    }
};