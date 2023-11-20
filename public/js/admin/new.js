$(document).ready(function () {

    /* ---------------------------- INICIALIZAÇÃO DA DIV DO EDITOR DE TEXTO ---------------------- */
    var quill = new Quill('#editor', {
        theme: 'snow'
    });

    /* ------------------LISTAGEM DE TODAS AS NOTICIAS ---------------------- */

    function fetchData() {
        $.ajax({
            url: '/new?page=0&limit=150',
            method: 'GET',
            success: function (response) {
                populateTable(response);

            },
            error: function (e) {
                console.log(e.responseText);
            }
        });
    }
    
    function listOneNew (idNew) {
        $.ajax({
           url: `/new/${idNew}`,
            method: 'GET',
            success: function (response) {
                const content= contentData(response.content);
                delete response.content;
                const newData = {
                  content: content,
                  ...response
                }
                console.log(newData);
                populateNew(newData);

            },
            error: function (e) {
                console.log(e.responseText);
            } 
        });
    }

    function populateTable(data) {
        $.each(data, function (index, item) {
            var imageTag = item.cover ? '<img src="/assets/img/news/' + item.cover + '" alt="Imagem" style="width:50px; height:50px;">' :
                '<img src="/assets/img/news/new-prototype.jpg" alt="Imagem" style="width:50px; height:50px;">';

            $('#newsList tbody').append(
                `<tr>
                    <td> ${(index + 1)} </td>
                    <td> ${imageTag}</td> +
                    <td> ${item.title} </td> +
                    <td> ${item.typeOfNew}</td> +
                    <td> ${item.datePublished} </td> +
                    <td> <a href='/dashboard/news/${item.id}'> <i class="bi bi-box-arrow-up-right"></i> </a> </td> +
                    <td> <a href="#"> <i class="bi bi-pencil-square"></i> </a></td> +
                    <td> <a href=""> <i class="bi bi-trash3"></i></a> </td> +
                </tr>`
            );
        });
    }
    function populateNew(data) {
        $('.header-new').append(
            `
            <div>
                 <img src="/assets/img/news/${data?.cover}"/>
              <div>
              <div>
                     <h3>${data?.title}</h3>
              <div>
              <div>
                  <span>${data?.typeOfNew}</span>  <span>${data?.datePublished}</span>
              <div>
            `
        );
       $.each(data?.content, function (index, item) {
            $('.header-new').append(
                `
                   <p>${item}<p/>
                `
            )
        });
        $.each(data?.fotos, function (index, item) {
            var imageTag = item.image ? '<img src="/assets/img/news-images/' + item.image + '" alt="Imagem" style="width:300px; height:200px;">' :
                '<img src="/assets/img/news/new-prototype.jpg" alt="Imagem" style="width:50px; height:50px;">';

                $('.new-photos-content').append(
                    `
                         ${imageTag}

                    `
                )
        }); 
    }
    function contentData(data) {
        let parser = new DOMParser();
        let doc = parser.parseFromString(data, 'text/html');
        let paragraphs = doc.querySelectorAll('p');
        return Array.from(paragraphs).map(paragraph => paragraph.textContent);
    }
    // Chama a função para buscar os dados quando a página carregar
    fetchData();
    var idNew = $('#id-new').data('content');
    if(idNew){
        listOneNew(idNew);
    }
   


    /* ---------------------------- IMPUT PARA CARREGAR A IMAGEM DE CAPA DA NOTICIA ---------------------- */
    const inputFileCover = document.querySelector("#picture__input-newsCover");
    const pictureImageCover = document.querySelector(".picture__image-newsCover");
    const pictureImageCoverTxt = "Carregar a Imagem de Capa da Notícia";
    pictureImageCover.innerHTML = pictureImageCoverTxt;
    inputFileCover.addEventListener("change", function (e) {
        const inputTarget = e.target;
        const file = inputTarget.files[0];
        if (file) {
            const reader = new FileReader();
            reader.addEventListener("load", function (e) {
                const readerTarget = e.target;
                const img = document.createElement("img");
                img.src = readerTarget.result;
                img.classList.add("picture__img-newsCover");
                pictureImageCover.innerHTML = "";
                pictureImageCover.appendChild(img);
            });
            reader.readAsDataURL(file);
        } else {
            pictureImageCover.innerHTML = pictureImageCoverTxt;
        }
    });


    /* ---------------------------- IMPUT PARA CARREGAR AS OUTRAS IMAGENS DA NOTICIA ---------------------- */
    const inputFile = document.querySelector("#picture__input-news");
    const pictureImage = document.querySelector(".picture__image-news");
    const pictureImageTxt = "";
    pictureImage.innerHTML = pictureImageTxt;
    const pictureImageSec = document.querySelector(".texto");
    const pictureImageSecTxt = "Carregar as outras imagens da Notícia";
    pictureImageSec.innerHTML = pictureImageSecTxt;
    inputFile.addEventListener("change", function (e) {
        const inputTarget = e.target;
        const file = inputTarget.files;
        for (let index = 0; index < file.length; index++) {
            const element = file[index];
            if (element) {
                const reader = new FileReader();
                reader.addEventListener("load", function (e) {
                    const readerTarget = e.target;
                    const img = document.createElement("img");
                    const l_span = document.createElement("span");
                    img.src = readerTarget.result;
                    img.classList.add("picture__img-news");
                    pictureImageSec.innerHTML = "";
                    pictureImage.appendChild(img);
                });
                reader.readAsDataURL(element);
            } else {
                pictureImage.innerHTML = pictureImageTxt;
            }
        }
    });

})


