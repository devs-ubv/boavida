$(document).ready(function () {

    var quill = new Quill('#editContent', {
        theme: 'snow'
    });

    const bannerFileCover = document.querySelector("#picture-edit-banner");
    const pictureEditImageCover = document.querySelector(".picture-image-banner-edit");
    const pictureEditImageBannerTxt = "Carregar a Imagem da Noticia";
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

    function newsImageLoading(image) {
        if (image) {
            const img = document.createElement("img");
            img.src = `/assets/img/news/${image}`;
            img.classList.add("picture-img-edit-cover");
            pictureEditImageCover.innerHTML = "";
            pictureEditImageCover.appendChild(img);
        } else {
            pictureEditImageCover.innerHTML = pictureEditImageBannerTxt;
        }
    }

    function loadAPIData(idNew) {
        $.ajax({
            url: `/new/${idNew}`,
            method: 'GET',
            dataType: 'json',
            success: function (data) {
                // Preencher os campos do formulário com dados da API
                $('#title').val(data.title);
                $('#typeOfNew').val(data.typeOfNew);
                newsImageLoading(data.cover);
                quill.clipboard.dangerouslyPasteHTML(data.content);
            },
            error: function (error) {
                console.error('Erro ao carregar dados da API: ' + error.statusText);
            }
        });
    }

    var idNewEdit = $('#editar').data('content');
    if(idNewEdit){
        loadAPIData(idNewEdit);
    }
    

    $('#editar').on('click', function () {
        function updateAPIData(idNew) {
            $("#loading").show();
            $("#button-text").hide();
            // Obter dados do formulário
            var conteudo = quill.root.innerHTML;
            const cover = $('#picture-edit-banner')[0].files[0];
            let dataForm = $("#update-new-form").serializeObject();
        
            var formData = new FormData();
            formData.append('title', dataForm.title);
            formData.append('typeOfNew', dataForm.typeOfNew);
            formData.append('cover', cover);
            formData.append('content', conteudo);
         // Enviar dados atualizados para a API
            fetch(`/new/${idNew}`, {
                method: 'PUT',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                console.log("Data: ",data);
                $("#loading").hide();
                $("#button-text").show();
                var voltar = "/dashboard/news/listar/default";
                window.location.href = voltar;
                //if (data) return window.location.href = `/dashboard/news/${data.insertId}`;
            })
            .catch(error => {
                   console.error('Erro ao enviar arquivo:', error);
            }); 
      
        
        }
        updateAPIData(idNewEdit);
    });

});