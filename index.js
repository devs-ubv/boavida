const app = require('./src/app');
const port = process.env.PORT || 8000;
/* const conexao = require('./src/database/connection');
const Tabelas = require('./src/database/Tables');
 */
app.listen(port, () => {
    //Tabelas.init(conexao);
    /* eslint-disable no-console */
    console.log(`Listening: http://localhost:${port}`);
    /* eslint-enable no-console */
});