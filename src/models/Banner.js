const connection = require('../database/connection')

module.exports = {
    findAll({ page = 0, limit = 1, search: text }) {
        return new Promise(async function(resolve, reject) {
            const sql = `SELECT b.id, b.type, b.banner, b.title, b.description, b.createdAt, u.fullName FROM tb_banner as b join tb_users as u on b.userId= u.id LIMIT ${limit} OFFSET ${page}`
            connection.query(sql, (err, result) => {
                if (err) reject(err.message);
                resolve(result);
            });
        });
    },

    findById(id) {
        return new Promise(async function(resolve, reject) {
            const sql = `SELECT * FROM tb_banner WHERE id=${id}`;
            connection.query(sql, (err, result) => {
                if (err) reject(err);
                console.log(result);
                resolve(result[0]);
            });
        });
    },
    add(banner) {
        return new Promise(async function(resolve, reject) {
            const sql = `SELECT * FROM tb_banner WHERE title='${banner.title}'`;
            connection.query(sql, (err, result) => {
                if (err) reject(err);
                if (!result[0]) {
                    const sql = "INSERT INTO tb_banner SET ?";
                    connection.query(sql, banner, (err, result) => {
                        if (err) reject(err);
                        resolve(result);
                    });
                } else {
                    reject({ message: "O banner que desejas cadastrar já existe. Por favor verifica o titulo." });
                }
            });
        });
    },
    update(id, values) {
        const sql = "UPDATE tb_banner SET ? WHERE id=?";
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
        const sql = "DELETE FROM tb_banner WHERE id=?";
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