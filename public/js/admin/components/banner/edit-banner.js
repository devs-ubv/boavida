$(document).ready(function () {

    /* ------------------INPUT DE CARREGAMENTO DA IMAGEM DO BANNER---------------------- */
    const bannerFileCover = document.querySelector("#picture-edit-banner");
    const pictureEditImageCover = document.querySelector(".picture-image-banner-edit");
    const pictureEditImageBannerTxt = "Carregar a Imagem do Banner";
    pictureEditImageCover.innerHTML = pictureEditImageBannerTxt;
    bannerFileCover.addEventListener("change", function (e) {
        const inputTarget = e.target;
        const file = inputTarget.files[0];
        if (file) {
            const reader = new FileReader();
            reader.addEventListener("load", function (e) {
                const readerTarget = e.target;
                const img = document.createElement("img");
                img.src = readerTarget.result;
                img.classList.add("picture-img-edit-cover");
                pictureEditImageCover.innerHTML = "";
                pictureEditImageCover.appendChild(img);
            });
            reader.readAsDataURL(file);
        } else {
            pictureEditImageCover.innerHTML = pictureEditImageBannerTxt;
        }
    }); 

    /* --------------------------FUNÇÃO PARA CARREGAR DADOS DA NOTICIA */

    function loadAPIData(idBanner) {
        $.ajax({
            url: `/banner/${idBanner}`,
            method: 'GET',
            dataType: 'json',
            success: function (data) {
                console.log("DATA: ",data.banner);
                $('#title').val(data.title);
                $('#type').val(data.type);
            },
            error: function (error) {
                console.error('Erro ao carregar dados da API: ' + error.statusText);
            }
        });
    }

    var idBannerEdit = $('#edit-banner').data('content');
    if(idBannerEdit){
        loadAPIData(idBannerEdit);
    }
    
    $('#edit-banner').on('click', function () {
        function updateAPIBanner(idBanner) {
            let dataForm = $("#banner-edit-form").serializeObject();
            $.ajax({
                url: `/banner/${idBanner}`,
                type: 'PUT', // ou 'PUT' dependendo da sua API
                data: dataForm,
                success: function(response) {
                    console.log('Dados atualizados com sucesso!', response);
                    $("#success").delay(100).fadeIn("slow");
                    $("#success").delay(3000).fadeOut("slow");
                },
                error: function(error) {
                    console.error('Erro ao atualizar dados:', error);
                }
            });
        }
        updateAPIBanner(idBannerEdit);
    });
    
});