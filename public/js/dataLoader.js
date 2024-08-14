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
    function formatDate(dateString) {
        const data = new Date(dateString);
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return data.toLocaleDateString('pt-BR', options);
    }

    document.addEventListener('DOMContentLoaded', function () {
        axios.get('https://boavida-api-one.vercel.app/api/v1/new')
            .then(function (response) {
                const smollNews = response.data;

                // Renderizar as notícias de tendência
                const trendingNewsContainer = document.getElementById('trending-news');
                smollNews.forEach(function (item) {
                    const newsElement = document.createElement('div');
                    newsElement.className = 'text-truncate';
                    newsElement.innerHTML = `
                        <a class="text-white text-uppercase font-weight-semi-bold" href="/noticia/${item.id}">
                            ${item.typeOfNew}: ${item.title} - ${formatDate(item.datePublished)}
                        </a>
                    `;
                    trendingNewsContainer.appendChild(newsElement);
                });

                // Renderizar as notícias principais
                const mainNewsContainer = document.getElementById('main-news');
                smollNews.forEach(function (item) {
                    const newsElement = document.createElement('div');
                    newsElement.className = 'position-relative overflow-hidden';
                    newsElement.style.height = '500px';
                    newsElement.innerHTML = `
                        <img class="img-fluid h-100" src="${item.url}" style="object-fit: cover;">
                        <div class="overlay">
                            <div class="mb-2">
                                <a href="/noticia/${item.id}" class="badge badge-info text-uppercase font-weight-semi-bold p-2 mr-2">
                                    ${item.typeOfNew}
                                </a>
                                <a href="/noticia/${item.id}" class="text-white">
                                    ${formatDate(item.datePublished)}
                                </a>
                            </div>
                            <a href="/noticia/${item.id}" class="h2 m-0 text-white text-uppercase font-weight-bold">
                                ${item.title}
                            </a>
                        </div>
                    `;
                    mainNewsContainer.appendChild(newsElement);
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    });