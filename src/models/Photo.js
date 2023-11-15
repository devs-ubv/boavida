const connection = require('../database/connection')

module.exports = {
    findAll({ page = 0, limit = 1, search: text }) {
        return new Promise(async function(resolve, reject) {
            const sql = `select id, image, description, newId, createdAt from tb_photo LIMIT ${limit} OFFSET ${page}`
            connection.query(sql, (err, result) => {
                if (err) reject(err.message);
                resolve(result);
            });
        });
    },

    findById(id) {
        return new Promise(async function(resolve, reject) {
            const sql = `SELECT * FROM tb_photo WHERE id=${id}`;
            connection.query(sql, (err, result) => {
                if (err) reject(err);
                resolve(result[0]);
            });
        });
    },
    add(dataPhoto) {
        return new Promise(async function(resolve, reject) {
            console.log(dataPhoto);
            const sql = `SELECT * FROM tb_photo WHERE image='${dataPhoto.image}'`;
            connection.query(sql, (err, result) => {
                console.log(err);
                if (err) reject(err);
                
                if (!result[0]) {
                    const sql = "INSERT INTO tb_photo SET ?";
                    connection.query(sql, dataPhoto, (err, result) => {
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
        const sql = "UPDATE tb_photo SET ? WHERE id=?";
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
        const sql = "DELETE FROM tb_photo WHERE id=?";
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