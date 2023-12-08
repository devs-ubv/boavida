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

    function ImageLoading(image) {
        if (image) {
            const img = document.createElement("img");
            img.src = `/assets/img/banner/${image}`;
            img.classList.add("picture-img-edit-cover");
            pictureEditImageCover.innerHTML = "";
            pictureEditImageCover.appendChild(img);
        } else {
            pictureEditImageCover.innerHTML = pictureEditImageBannerTxt;
        }
    }

    /* --------------------------FUNÇÃO PARA CARREGAR DADOS DA NOTICIA */

    function loadAPIData(idBanner) {
        $.ajax({
            url: `/banner/${idBanner}`,
            method: 'GET',
            dataType: 'json',
            success: function (data) {
                $('#title').val(data.title);
                $('#type').val(data.type);
                ImageLoading(data.banner)
            },
            error: function (error) {
                console.error('Erro ao carregar dados da API: ' + error.statusText);
            }
        });
    }

    var idBannerEdit = $('#edit-banner').data('content');
    if (idBannerEdit) {
        loadAPIData(idBannerEdit);
    }

    $('#edit-banner').on('click', function () {
        function updateAPIBanner(idBanner) {
            let dataForm = $("#banner-edit-form").serializeObject();
            const file = $('#picture-edit-banner')[0].files[0];

            var formData = new FormData();
            formData.append("title", dataForm.title);
            formData.append("type", dataForm.type);
            formData.append("banner", file);

            fetch(`/banner/${idBanner}`, {
                method: 'PUT',
                body: formData
            })
                .then(response => response.json())
                .then(data => {
                    console.log("Data: ", data);
                    //if (data) return window.location.href = `/dashboard/news/${data.insertId}`;
                })
                .catch(error => {
                    console.error('Erro ao enviar arquivo:', error);
                });
        }
        updateAPIBanner(idBannerEdit);
    });

});