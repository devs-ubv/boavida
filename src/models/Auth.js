const connection = require('../database/connection')

module.exports = {
    AuthLogin({ email, password }) {
        return new Promise(async function(resolve, reject) {
            console.log(email, password)
            const sql = `SELECT u.fullName, u.firstName, u.email, u.password, u.active,u.lastName,u.id,u.userName,u.userProfile, p.role, p.type FROM tb_users as u join tb_permissions as p on u.permissionId= p.id where email='${email}'`;
            connection.query(sql, (err, result) => {
                console.log(err);
                if (err) reject(err.message);
                resolve(result[0]);
            });
        })
    }
}