$(document).ready(function () {
/* ---------------------- AÇÃO PARA ABRIR O MODAL DE CADASTRO DE PHOTOS A NOTICIA----------------- */   
    $("#add-photo").click(function () {
        $('.modal-add-photo').show();
    });


/* ----------- AÇÃO DE CADASTRO DE PHOTOS A NOTICIAS--------------- */

    

    $(".btn_add_photo").click(async function () {
        
        async function uploadFile(files, index) {
            if (index >= files.length) {
                console.log('Envio concluído.');
                localStorage.removeItem("newId");
                return;
            }
    
            const file = files[index];
            const newId = localStorage.getItem('idNew');
            const formData = new FormData();
            formData.append('image', file);
            formData.append("newId",  newId);
    
            const xhr = new XMLHttpRequest();
            xhr.open('POST', '/upload', true);
    
            xhr.onload = function () {
                if (xhr.status === 200) {
                    console.log('Arquivo enviado com sucesso:', file.name);
                    // Chama a próxima iteração da função recursiva
                    uploadFile(files, index + 1);
                    
                } else {
                    console.error('Erro no envio do arquivo:', file.name);
                }
                $("#sucesso").delay(100).fadeIn("slow");
                $("#sucesso").delay(3000).fadeOut("slow");
            };
    
            xhr.onerror = function () {
                console.error('Erro de rede ao enviar o arquivo:', file.name);
            };
    
            xhr.send(formData);
        }

         var input = document.getElementById('picture_input_add_photo');

        var files = input.files;

        if (files.length > 0) {
          await uploadFile(files, 0);
        } 
    });



/* --------------------- IMPUT PARA CARREGAR IMAGENS PARA ADICIONAR PHOTOS A NOTICIA---------------- */

    const inputFilePhoto = $("#picture_input_add_photo");
    const pictureImage = $(".picture_image_add_photo");
    const pictureImageTxt = "";
    /* pictureImage.html(pictureImageTxt); */
    const pictureImageSec = $(".texto");
    const pictureImageSecTxt = "Carregar as outras imagens da Notícia";
    pictureImageSec.html(pictureImageSecTxt);

    inputFilePhoto.change(function(e) {
        const inputTarget = e.target;
        const files = inputTarget.files;
       /*  const backFiles;  */

        for (let index = 0; index < files.length; index++) {
            const element = files[index];

            if (element) {
                const reader = new FileReader();

                reader.onload = function(e) {
                    const readerTarget = e.target;
                    const img = $("<img>");
                    img.attr("src", readerTarget.result);
                    img.addClass("picture_img_add_photo"); 
                    pictureImageSec.html(""); 
                    pictureImageSec.css("background-color", "coral");
                    pictureImage.append(img);

                    const paragr = $("<p class='remove_photo'>");
                    pictureImage.append(paragr);
                    paragr.html("X");

                    $(".remove_photo").click(function(){
                        if (files.hasOwnProperty(index)) {
                            delete files[index];
                        }else {
                            console.log("A posição especificada não existe no objeto.");
                        }
                    })
                };

                reader.readAsDataURL(element);
            } else {
                pictureImage.html(pictureImageTxt);
            }
        }
        
    });

    
})