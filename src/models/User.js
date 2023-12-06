const connection = require('../database/connection')

module.exports = {
    findAll({ page = 0, limit = 1, search: text }) {
        return new Promise(async function(resolve, reject) {
            const sql = `SELECT u.active,u.lastName,u.id, u.userName, u.firstName, u.fullName, u.email, u.password, u.userProfile, p.role, p.type FROM tb_users as u join tb_permissions as p on u.permissionId= p.id where  u.active=1 ORDER BY u.createdAt DESC LIMIT ${limit} OFFSET ${page}`
            connection.query(sql, (err, result) => {
                if (err) reject(err.message);
                resolve(result);
            });
        });
    },
    findAllPreview() {
        return new Promise(async function(resolve, reject) {
            const sql = `SELECT u.active,u.lastName,u.id, u.userName, u.firstName, u.fullName, u.email, u.password,u.userProfile, p.role, p.type FROM tb_users as u join tb_permissions as p on u.permissionId= p.id  where  u.active=1 ORDER BY u.createdAt DESC LIMIT 6`
            connection.query(sql, (err, result) => {
                if (err) reject(err.message);
                resolve(result);
            });
        });
    },


    countUser() {
        return new Promise(async function(resolve, reject) {
            const sql = `SELECT COUNT(*) AS user_acount FROM tb_users WHERE active = '1';`
            connection.query(sql, (err, result) => {
                if (err) reject(err.message);
                resolve(result[0]);
            });
        });
    },
    findById(id) {
        return new Promise(async function(resolve, reject) {
            const sql = `SELECT * FROM tb_users WHERE id=${id}`;
            connection.query(sql, (err, result) => {
                if (err) reject(err);
                resolve(result[0]);
            });
        });
    },

    add(user) {
        return new Promise(async function(resolve, reject) {
            const sql = `SELECT * FROM tb_users WHERE email='${user.email}'`;
            connection.query(sql, (err, result) => {
                if (err) reject(err);
                if (!result[0]) {
                    connection.query("INSERT INTO tb_users SET ?", user, (err, result) => {
                        if (err) reject(err);
                        resolve(result);
                    });
                } else {
                    reject({ message: " Este e-mail já está registrado. Por favor, use um e-mail diferente." });
                }
            });
        });
    },

    update(id, values) {
        const sql = "UPDATE tb_users SET ? WHERE id=?";
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
        const sql = "DELETE FROM tb_users WHERE id=?";
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