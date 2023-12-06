const infoSiteData = (req) => {
    return  {
        titulo: "Grupo Boavida - Grupo empresarial: Inovação e gestão por Angola",
        mensagem: "Bem-vindo ao EJS!",
        path: req.url,
    };
}

module.exports = {
    infoSiteData
}