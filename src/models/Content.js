const connection = require('../database/connection')

module.exports = {
    findAll({ page = 0, limit = 1, search: text }) {
        return new Promise(async function(resolve, reject) {
            const sql = `select nc.paragraph, n.title, nc.createdAt from tb_new_content as nc INNER JOIN tb_new as n on nc.newId = n.id  LIMIT ${limit} OFFSET ${page}`
            connection.query(sql, (err, result) => {
                if (err) reject(err.message);
                console.log(result);
                resolve(result);
            });
        });
    },

    findById(id) {
        return new Promise(async function(resolve, reject) {
            const sql = `SELECT * FROM tb_new_content WHERE id=${id}`;
            connection.query(sql, (err, result) => {
                if (err) reject(err);
                resolve(result[0]);
            });
        });
    },
    add(content) {
        return new Promise(async function(resolve, reject) {
            console.log(content);
            const sql = `SELECT * FROM tb_new_content WHERE paragraph='${content.paragraph}'`;
            connection.query(sql, (err, result) => {
                if (err) reject(err);
                if (!result[0]) {
                    const sql = "INSERT INTO tb_new_content SET ?";
                    connection.query(sql, content, (err, result) => {
                        if (err) reject(err);
                        console.log(err);
                        resolve(result[0]);
                    });
                } else {
                    reject({ message: "A notícia que desejas cadastrar já existe. Por favor verifica o titulo." });
                }
            });
        });
    },
    update(id, values) {
        const sql = "UPDATE tb_new_content SET ? WHERE id=?";
        return new Promise(async function(resolve, reject) {
            connection.query(sql, [values, id], (err, result) => {
                if (err) {
                    reject(err.message);
                } else {
                    resolve({...values, id, result });
                }
            });
        });
    },
    delete(id) {
        const sql = "DELETE FROM tb_new_content WHERE id=?";
        return new Promise(async function(resolve, reject) {
            connection.query(sql, id, (erro, result) => {
                if (erro) {
                    reject(erro);
                } else {
                    resolve({ id, result });
                }
            });
        });
    }
}