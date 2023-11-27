const connection = require('../database/connection')

module.exports = {
    findAll({ page = 0, limit = 1, search: text }) {
        return new Promise(async function(resolve, reject) {
            const sql = `SELECT v.id, v.dataId, v.title, v.image, v.createdAt, u.fullName FROM tb_video as v join tb_users as u on v.userId= u.id LIMIT ${limit} OFFSET ${page}`
            connection.query(sql, (err, result) => {
                if (err) reject(err.message);
                resolve(result);
            });
        });
    },
    countVideo() {
        return new Promise(async function(resolve, reject) {
            const sql = `SELECT COUNT(*) AS video_acount FROM tb_video WHERE active = '1';`
            connection.query(sql, (err, result) => {
                if (err) reject(err.message);
                resolve(result[0]);
            });
        });
    },

    findById(id) {
        return new Promise(async function(resolve, reject) {
            const sql = `SELECT * FROM tb_video WHERE id=${id}`;
            connection.query(sql, (err, result) => {
                if (err) reject(err);
                console.log(result);
                resolve(result[0]);
            });
        });
    },
    add(video) {
        return new Promise(async function(resolve, reject) {
            const sql = `SELECT * FROM tb_video WHERE title='${video.title}' OR dataId='${video.dataId}'`;
            connection.query(sql, (err, result) => {
                console.log(err);
                if (err) reject(err);
                if (!result[0]) {
                    const sql = "INSERT INTO tb_video SET ?";
                    connection.query(sql, video, (err, result) => {
                        if (err) reject(err);
                        resolve(result);
                    });
                } else {
                    reject({ message: "O video que desejas cadastrar já existe. Por favor verifica o titulo." });
                }
            });
        });
    },
    update(id, values) {
        const sql = "UPDATE tb_video SET ? WHERE id=?";
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
        const sql = "DELETE FROM tb_video WHERE id=?";
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