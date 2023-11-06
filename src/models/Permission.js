const connection = require('../database/connection')

module.exports = {
    findAll({ page = 0, limit = 1 }) {
        return new Promise(async function(resolve, reject) {
            const sql =
                limit && page ?
                `SELECT * FROM tb_permissions ORDER BY id LIMIT ${limit} OFFSET ${page};` :
                `SELECT * FROM tb_permissions`;
            console.log(sql);
            connection.query(sql, (err, result) => {
                if (err) reject(err.message);
                resolve(result);
            });
        });
    },

    findById(id) {
        return new Promise(async function(resolve, reject) {
            const sql = `SELECT * FROM tb_permissions WHERE id=${id}`;
            connection.query(sql, (err, result) => {
                if (err) reject(err);
                resolve(result[0]);
            });
        });
    },
    add(permission) {
        const sql = "INSERT INTO tb_permissions SET ?";
        return new Promise(async function(resolve, reject) {
            connection.query(sql, permission, (err, result) => {
                if (err) reject(err);
                console.log(err);
                resolve(result[0]);
            });
        });
    },
    update(id, values) {
        const sql = "UPDATE tb_permissions SET ? WHERE id=?";
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
        const sql = "DELETE FROM tb_permissions WHERE id=?";
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