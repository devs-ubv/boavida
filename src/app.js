const express = require("express");

const bodyParser = "body-parser";
const cors = require('cors');
const path = require('path');
const indexRouter = require('./routes/index');
const pageRouter = require('./routes/pages');
const app = express();
require('dotenv').config();
/* setar as variáveis 'view engine' e 'views' do express */
app.set("view engine", "ejs");
app.set('views', 'src/views');

console.log(__dirname)

/* configurar o middleware express.static */
app.use('/assets', express.static(path.join(__dirname, '../public')));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(indexRouter);
app.use(pageRouter);

module.exports = app;