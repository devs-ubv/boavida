// fetchNewsData.js

async function fetchNewsData() {
    try {
        const response = await axios.get('https://boavida-api-one.vercel.app/api/v1/new');
        const newsData = response.data;
        // Agora você pode usar esses dados para atualizar seu HTML
        console.log(newsData.news);
        renderNews(newsData.news);
    } catch (error) {
        console.error('Erro ao buscar dados das notícias:', error);
    }
}

function renderNews(newsData) {
    const container = document.querySelector('#newsContainer');

    newsData.forEach(function(item) {
        const newsItem = `
            <div class="position-relative overflow-hidden" style="height: 500px;">
                <img class="img-fluid h-100" src="/assets/img/news/${item.url}" style="object-fit: cover;">
                <div class="overlay">
                    <div class="mb-2">
                        <a href="/noticia/${item.id}" class="badge badge-info text-uppercase font-weight-semi-bold p-2 mr-2">${item.typeOfNew}</a>
                        <a href="/noticia/${item.id}" class="text-white">${item.datePublished}</a>
                    </div>
                    <a href="/noticia/${item.id}" class="h2 m-0 text-white text-uppercase font-weight-bold">${item.title}</a>
                </div>
            </div>
        `;
        container.innerHTML += newsItem;
    });
}

// Chame a função para buscar os dados quando a página carregar
document.addEventListener('DOMContentLoaded', fetchNewsData);
