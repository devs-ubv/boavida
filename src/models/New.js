const connection = require('../database/connection')

module.exports = {
    findAll({ page = 0, limit = 1, search: text }) {
        return new Promise(async function (resolve, reject) {
            const sql = `SELECT n.id, n.title, n.content, n.typeOfNew, n.title, n.datePublished, n.cover, us.fullName, n.createdAt FROM tb_new as n LEFT JOIN tb_users as us ON n.userId = us.id ORDER BY n.createdAt DESC
    LIMIT ${limit} OFFSET ${page}`
            
            connection.query(sql, (err, results) => {
                if (err) reject(err.message);
                resolve(results);   
            });
        });
    },

    findById(id) {
        return new Promise(async function (resolve, reject) {
            const sql = `SELECT n.id, 
            n.title, 
            n.content, n.typeOfNew,
            n.datePublished, 
            n.cover, n.createdAt, 
            ph.image 
            FROM tb_new as n 
            LEFT JOIN tb_photo as ph ON n.id= ph.newId where n.id=${id}`;
            connection.query(sql, (err, results) => {
                if (err) reject(err);
               if(results.length > 0){
                const newResulted = {
                    id: results[0].id,
                    title: results[0].title,
                    content: results[0].content,
                    typeOfNew: results[0].typeOfNew,
                    datePublished: results[0].datePublished,
                    cover: results[0].cover,
                    createdAt: results[0].createdAt,
                    fotos: results.map(result => ({ image: result.image }))
                  };
                  resolve(newResulted);
               }else{
                reject({ message: "Não foi encontrado nenhuma notícia." });
               }
                
            });
           
        });
    },
    add(dataNew) {
        return new Promise(async function (resolve, reject) {
          
            const sql = `SELECT * FROM tb_new WHERE title='${dataNew.title}'`;
            connection.query(sql, (err, result) => {
                if (err) reject(err);
                if (!result[0]) {
                    const sql = "INSERT INTO tb_new SET ?";
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

}

