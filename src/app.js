const express = require("express");
const cors = require('cors');
const path = require('path');
const { defaultPages, adminRouter, enRouter, } = require('./routes/index');
const { news } = require("./utils/projectEn");
const app = express();
require('dotenv').config();
/* setar as variáveis 'view engine' e 'views' do express */
app.set("view engine", "ejs");
app.set('views', 'src/views');

/* configurar o middleware express.static */
app.use('/assets', express.static(path.join(__dirname, '../public')));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(defaultPages);
app.use(adminRouter);
app.use(enRouter);


app.use((req, res, next) => {
    const data = {
        titulo: "Grupo Boavida - Grupo empresarial: Inovação e gestão por Angola",
        mensagem: "Bem-vindo ao EJS!",
        path: req.url,
    };
    const news3 = news.map(objeto => ({
        ...objeto
    })).slice(0, 3);

    if (req.path.includes("en")) {
        res.status(404).render('en/erro', { data, news3 });
    } else {
        res.status(404).render('pt/erro', { data, news3 });
    }


});

module.exports = app;