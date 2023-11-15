const connection = require('../database/connection')

module.exports = {
    findAll({ page = 0, limit = 1, search: text }) {
        return new Promise(async function (resolve, reject) {
            const sql = `SELECT n.id, n.typeOfNew, n.title, n.datePublished, n.cover, n.createdAt, nc.paragraph, ph.image FROM tb_new as n LEFT JOIN tb_new_content as nc ON n.id = nc.newId LEFT JOIN tb_photo as ph ON n.id= ph.newId 
            
            ORDER BY n.createdAt DESC
    LIMIT ${limit} OFFSET ${page}`
            
            connection.query(sql, (err, results) => {
                if (err) reject(err.message);
                    const newsMap = new Map();

                    results.forEach(row => {
                        const { id, typeOfNew, title, datePublished, cover, createdAt, paragraph, image, } = row;
                
                      // Se a notícia ainda não foi adicionada ao mapa, adiciona ela
                      if (!newsMap.has(id)) {
                        newsMap.set(id, {
                            id,
                            title,
                            typeOfNew,
                            datePublished,
                            cover,
                            createdAt,
                            content: [],
                            photos: []
                        });
                      }
                
                      const noticia = newsMap.get(id);
                
                      // Adiciona parágrafo se existir
                      if (paragraph && !noticia.content.some(c => c.paragraph === paragraph)) {
                        noticia.content.push({paragraph});
                      }
                
                      // Adiciona foto se existir
                      if (image && !noticia.photos.some(foto => foto.image === image)) {
                        noticia.photos.push({ image });
                      }
                    });
                
                    // Converte o Map para um array de notícias
                    const noticias = Array.from(newsMap.values());
        
                resolve(Object.values(noticias));
            });
        });
    },

    findById(id) {
        return new Promise(async function (resolve, reject) {
            const sql = `SELECT n.id, n.typeOfNew, n.title, n.datePublished, n.cover, n.createdAt, nc.paragraph, ph.image FROM tb_new as n LEFT JOIN tb_new_content as nc ON n.id = nc.newId LEFT JOIN tb_photo as ph ON n.id= ph.newId where n.id=${id}`;
            connection.query(sql, (err, result) => {
                if (err) reject(err);
                const news = {};
                result.forEach(row => {
                    const { typeOfNew, title, datePublished, cover, createdAt, paragraph, image, } = row;
                    if (!news[title]) {
                        news[title] = {
                            title,
                            typeOfNew,
                            datePublished,
                            cover,
                            createdAt,
                            content: [],
                            photos: []
                        };
                    }

                    if (paragraph) {
                        news[title].content.push({ paragraph });
                    }

                    if (image) {
                        news[title].photos.push({ image });
                    }
                });
                resolve(news);
            });
        });
    },
    add(dataNew) {
        return new Promise(async function (resolve, reject) {
            console.log(dataNew);
            const sql = `SELECT * FROM tb_new WHERE title='${dataNew.title}'`;
            connection.query(sql, (err, result) => {
                if (err) reject(err);
                if (!result[0]) {
                    const sql = "INSERT INTO tb_new SET ?";
                    connection.query(sql, dataNew, (err, result) => {
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



    getAllContent(idNew) {
        const sql = `SELECT * FROM tb_new_content WHERE idNew=${idNew}`;
        return new Promise(async function (resolve, reject) {
            connection.query(sql, (erro, result) => {
                if (erro) {
                    reject(erro);
                } else {
                    resolve({ id, result });
                }
            });
        });
    }
}

