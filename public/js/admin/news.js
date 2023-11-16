$(document).ready(function() {

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


/* ---------------------------- VISUALIZAR O EDITOR DE TEXTO AO CRIAR NOTICIA ---------------------- */
function apresentar() {
     // Obtém o conteúdo do TinyMCE
     var conteudo = tinymce.get('editorTexto').getContent();

     return conteudo;   
 }

/* ---------------------------- LISTAGEM DE TODAS AS NOTICIAS NOTICIA ---------------------- */
function fetchData(){
    $.ajax({
        url: '/new?page=0&limit=150',
        method: 'GET',
        success: function(response) {
            populateTable(response);
            
        },
        error: function(e) {
          console.log(e.responseText);
        }
      });
    }
    
    function populateTable(data) {
        $.each(data, function (index, item) {
            var imageTag = item.cover? '<img src="/assets/img/news/' + item.cover + '" alt="Imagem" style="width:50px; height:50px;">':
            '<img src="/assets/img/news/new-prototype.jpg" alt="Imagem" style="width:50px; height:50px;">';

            $('#newsList tbody').append(
                '<tr>' +
                    '<td>' +(index+1) + '</td>' +
                    '<td>' + imageTag + '</td>' +
                    '<td>' + item.title + '</td>' +
                    '<td>' +item.typeOfNew + '</td>' +
                    '<td>' +item.datePublished + '</td>' +
                    '<td> <a href="#"> <i class="bi bi-box-arrow-up-right"></i> </a> </td>' +
                    '<td> <a href="#"> <i class="bi bi-pencil-square"></i> </a></td>' +
                    '<td> <a href="#"> <i class="bi bi-trash3"></i></a> </td>' +
                '</tr>'
            );
        });
    }
    // Chama a função para buscar os dados quando a página carregar
    fetchData();


/* ------------------ REGISTO DE NOVA NOTICIA -------------------------- */

$("#btn-register-new").click((event) => {
    event.preventDefault();
    let dateForm = $("#news-form").serializeObject();
    const cover = $('#picture__input-newsCover')[0].files[0];
    const allFiles = $('#picture__input-news')[0].files;
    
    console.log(cover);
    console.log(allFiles);
    console.log(dateForm);
    const conteudo = apresentar();
    // Cria um novo DOMParser
    let parser = new DOMParser();

    // Parseia a string HTML
    let doc = parser.parseFromString(conteudo, 'text/html');

    // Obtém todos os elementos <p>
    let paragraphs = doc.querySelectorAll('p');

    // Cria um array com o conteúdo das tags <p>
    let content = Array.from(paragraphs).map(paragraph => paragraph.textContent);

    dateForm.content = content;
    

    let formData = new FormData();

    formData.append('title', dateForm.title);
    formData.append('typeOfNew', dateForm.typeOfNew);
    formData.append('datePublished', dateForm.datePublished);
    formData.append('cover', cover);
    formData.append('content', content);
    formData.append('photos', allFiles);

    console.log(dateForm);
    
        $.ajax({
            url: "/new",
            method: "POST",
            data: dateForm,
                success: function(data) {
                console.log("Resultado no Jquery: ",data)
                /* $("#firstName").val("");
                $("#lastName").val("");
                $("#email").val("");
                $("#password").val("");
                $("#passConfirm").val(""); */
            },
            error: function(e) {
                $("#msg").css("color", "#ff0000");
                $("#msg").html(e.responseText);
            }
        }); 
    })







})


