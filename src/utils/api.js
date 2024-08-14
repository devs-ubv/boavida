
const axios  = require('axios');
// Cria uma instância do Axios com configurações padrão
const api = axios.create({
  baseURL: 'https://boavida-api-one.vercel.app/api/v1', // URL base para todas as requisições
  timeout: 10000, // Tempo limite de 10 segundos
  headers: {
    'Content-Type': 'application/json', // Define o Content-Type como JSON
    'Authorization': 'Bearer seu_token_aqui', // Se precisar de autorização
  },
});


module.exports = {
    api,
  };