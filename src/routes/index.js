const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/aaa', function(req, res) {
    const data = {
        titulo: "Grupo Boavida - Grupo empresarial: Inovação e gestão por Angola",
        mensagem: "Bem-vindo ao EJS!",
        path: req.url,
    };
    res.render("index", { data });
});

/* GET home page. */
module.exports = router;