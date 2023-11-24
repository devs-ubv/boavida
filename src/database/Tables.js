class Tabelas {
    init(conexao) {
        this.conexao = conexao
        this.createTablePermission();
        this.createTableUser();
        this.createTableNew();
        this.createTableBanner();
        this.createTablePhoto();
        this.createTableVideo();
    }

    createTablePermission() {
        const sql = 'CREATE TABLE IF NOT EXISTS tb_permissions(id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, level INT NOT NULL, role VARCHAR(100)  NULL, type VARCHAR(150) NOT NULL, createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP);'
        this.conexao.query(sql, erro => {
            if (erro) {
            } else {
                console.log('Tabela nivelacesso criada com sucesso')
            }
        })
    }

    createTableUser() {
        const sql = 'CREATE TABLE IF NOT EXISTS tb_users(id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, userProfile VARCHAR(200) NULL, nameProfile VARCHAR(100)  NULL, fullName VARCHAR(150) NOT NULL, email VARCHAR(150) NOT NULL, userName CHAR(5) NOT NULL, firstName VARCHAR(100) NULL, lastName VARCHAR(100) NOT NULL, password VARCHAR(200) NOT NULL, phoneNumber VARCHAR(20) NOT NULL, active boolean NULL, permissionId INT NULL, createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, foreign key (permissionId) references tb_permissions(id));'
        this.conexao.query(sql, erro => {
            if (erro) {
                console.log(erro)
            } else {
                console.log('Tabela usúario criada com sucesso')
            }
        })
    }
    createTableNew() {
        const sql = 'CREATE TABLE IF NOT EXISTS tb_new(id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,typeOfNew VARCHAR(200) NULL, file VARCHAR(100)  NULL,title VARCHAR(100) NOT NULL, datePublished VARCHAR(20) NOT NULL,cover VARCHAR(200) NOT NULL,description VARCHAR(5) NULL, userId INT NOT NULL,createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, foreign key (userId) references tb_users(id));';
        this.conexao.query(sql, erro => {
            if (erro) {
                console.log(erro)
            } else {
                console.log('Tabela notícias criada com sucesso')
            }
        })
    }
    createTableBanner() {
        const sql = 'CREATE TABLE IF NOT EXISTS tb_banner(id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, type VARCHAR(200) NULL, file VARCHAR(100)  NULL,title VARCHAR(100) NOT NULL, userId INT NOT NULL, description VARCHAR(5) NULL, createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, foreign key (userId) references tb_users(id))';
        this.conexao.query(sql, erro => {
            if (erro) {
                console.log(erro)
            } else {
                console.log('Tabela banner criada com sucesso')
            }
        })
    }
    createTablePhoto() {
        const sql = 'CREATE TABLE IF NOT EXISTS tb_photo(id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, image VARCHAR(50) NULL, description VARCHAR(5) NULL, newId INT NOT NULL,  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, foreign key (newId) references tb_new(id));'
        this.conexao.query(sql, erro => {
            if (erro) {
                console.log(erro)
            } else {
                console.log('Tabela fotos criada com sucesso')
            }
        })
    }
    createTableVideo() {
        const sql = 'CREATE TABLE IF NOT EXISTS tb_video(id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, title VARCHAR(200) NULL, image VARCHAR(50) NULL, description VARCHAR(5) NULL, dataId VARCHAR(50) NULL, userId INT NOT NULL,  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, foreign key (userId) references tb_users(id));'
        this.conexao.query(sql, erro => {
            if (erro) {
                console.log(erro)
            } else {
                console.log('Tabela fotos criada com sucesso')
            }
        })
    }
}

module.exports = new Tabelas