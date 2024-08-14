const connection = require('../database/connection');
const { api }  = require('../utils/api');

module.exports = {
    findAll({ page = 0, limit = 1, search: text }) {
        return new Promise(async function (resolve, reject) {
            return []
        });
    },
    
    findAllPreview() {
        return new Promise(async function (resolve, reject) {
            return []
        });
    },
    
    countNew() {
        return new Promise(async function(resolve, reject) {
            return { }
        });
    },

    findById(id, data) {
        return new Promise(async function (resolve, reject) {
            try {
                const item = data.find(item => item.id === id);
                resolve(item);
            } catch (error) {
                if (error.response) {
                    const { status, data } = error.response;
                    throw new Error(`Erro ao buscar o item com ID ${id}: ${status} - ${data.message || 'Erro no servidor'}`);
                }
            }
        });
    },
    add(dataNew) {
        return new Promise(async function (resolve, reject) {
          
            const sql = `SELECT * FROM tb_new WHERE title='${dataNew.title}'`;
            connection.query(sql, (err, result) => {
                console.log("Backend 1",err);
                if (err) reject(err);
                if (!result[0]) {
                    const sql = "INSERT INTO tb_new SET ?";
                    console.log("Backend 2",result);
                    connection.query(sql, dataNew, (err, result) => {
                        if (err) reject(err);
                        resolve(result);
                    });
                } else {
                    reject({ message: "A notícia que desejas cadastrar já existe. Por favor verifica o titulo." });
                }
            });
        });
    },
    update(id, values) {
        const sql = "UPDATE tb_new SET ? WHERE id=?";
        return new Promise(async function (resolve, reject) {
            connection.query(sql, [values, id], (err, result) => {
                if (err) {
                    reject(err.message);
                } else {
                    resolve({ ...values, id, result });
                }
            });
        });
    },
    delete(id) {
        const sql = "DELETE FROM tb_new WHERE id=?";
        return new Promise(async function (resolve, reject) {
            connection.query(sql, id, (erro, result) => {
                if (erro) {
                    reject(erro);
                } else {
                    resolve({ id, result });
                }
            });
        });
    },

    /*----------------------------------------- REQUISIÇÕES DO SITE--------------------------------------------- */
    
    findAllSite() {
        return new Promise(async function (resolve, reject) {
            const { data } = await api.get("/new");
            resolve(data.news);
        });
    },

}

