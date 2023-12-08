$(document).ready(function () {
    var idVideoEdit = $('#editar-video').data('content');

    /* ------------------INPUT DE CARREGAMENTO DA IMAGEM DO BANNER---------------------- */
    const bannerFileCover = document.querySelector("#picture-edit-banner");
    const pictureEditImageCover = document.querySelector(".picture-image-banner-edit");
    const pictureEditImageBannerTxt = "Carregar a Imagem do Video";
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

    function videoImageLoading(image) {
        if (image) {
            const img = document.createElement("img");
            img.src = `/assets/img/video/${image}`;
            img.classList.add("picture-img-edit-cover");
            pictureEditImageCover.innerHTML = "";
            pictureEditImageCover.appendChild(img);
        } else {
            pictureEditImageCover.innerHTML = pictureEditImageBannerTxt;
        }
    }

    function loadVideoData(idNew) {
        $.ajax({
            url: `/video_api/${idNew}`,
            method: 'GET',
            dataType: 'json',
            success: function (data) {
                // Preencher os campos do formulário com dados da API
                $('#title').val(data.title);
                $('#dataId').val(data.dataId);
                videoImageLoading(data.image);
            },
            error: function (error) {
                console.error('Erro ao carregar dados da API: ' + error.statusText);
            }
        });
    }
    
    if(idVideoEdit){
        loadVideoData(idVideoEdit);
    }
    
    $('#editar-video').on('click', function () {
        function updateAPIVideo(idVideo) {
            let dataForm = $("#video-edit-form").serializeObject();
            const file = $('#picture-edit-banner')[0].files[0];

            var formData = new FormData();
            formData.append("title", dataForm.title);
            formData.append("dataId", dataForm.dataId);
            formData.append("image", file);

            fetch(`/video_api/${idVideo}`, {
                method: 'PUT',
                body: formData
            })
                .then(response => response.json())
                .then(data => {
                    console.log("Dados atualizados com sucesso! ", data);
                    //if (data) return window.location.href = `/dashboard/news/${data.insertId}`;
                })
                .catch(error => {
                    console.error('Erro ao enviar arquivo:', error);
                });
        }
        updateAPIVideo(idVideoEdit);
    });


});