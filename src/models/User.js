const connection = require('../database/connection')

module.exports = {
    findAll({ page = 0, limit = 1, search: text }) {
        console.log(text)
        return new Promise(async function(resolve, reject) {
            const sql = `SELECT u.active,u.lastName,u.id, u.userName, u.firstName, u.fullName, u.email, u.password, u.userProfile, p.role, p.type FROM tb_users as u join tb_permissions as p on u.permissionId= p.id  LIMIT ${limit} OFFSET ${page}`
            connection.query(sql, (err, result) => {
                if (err) reject(err.message);
                resolve(result);
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
                    const sql = "INSERT INTO tb_users SET ?";
                    connection.query(sql, user, (err, result) => {
                        if (err) reject(err);
                        console.log(err);
                        resolve(result[0]);
                    });
                } else {
                    reject({ message: "Username already exists." });
                }
            });
        });
    },
    update(id, values) {
        const sql = "UPDATE tb_users SET ? WHERE id=?";
        console.log(id, values);
        return new Promise(async function(resolve, reject) {
            connection.query(sql, [values, id], (err, result) => {
                if (err) {
                    reject(err.message);
                } else {
                    console.log(values)
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