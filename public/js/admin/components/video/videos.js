$(document).ready(function() { 

/* ---------------------- LISTAGEM DE TODOS OS VIDEOS CADASTRADOS ------------- */
    function fetchDataVideo(){
        $.ajax({
            url: '/video_api?page=0&limit=15',
            method: 'GET',
            success: function(response) {
                populateTable(response);
            },
            error: function(e) {
                $("#error").html(e.responseText);
            }
        });
    }

    function populateTable(data) {
        $.each(data, function (index, item) {
            
            var imageVideo = item.image? '<img src="/assets/img/video/' + item.image + '" alt="Imagem" style="width:50px; height:50px;">':
            '<img src="/assets/img/user/profile.jpeg" alt="Imagem" style="width:50px; height:50px;">';

            $('#video-list tbody').append(
                `<tr> 
                    <td>  ${(index+1)}  </td> 
                    <td>  ${imageVideo}  </td> 
                    <td>  ${item.title}  </td> 
                    <td>  ${item.dataId}  </td> 
                    <td>  ${item.fullName}  </td> 
                    <td> <a href='/dashboard/video/${item.id}'> <i class="bi bi-box-arrow-up-right"></i> </a> </td> 
                    <td> <a href='/dashboard/video/editar/${item.id}'> <i class="bi bi-pencil-square"></i> </a></td> 
                    <td> <a href='/dashboard/video/deletar/${item.id}'> <i class="bi bi-trash3"></i></a> </td> 
                </tr>`
            );
        });
    }

    fetchDataVideo();

    /* ---------------------- CADASTRO DE NOVOS VIDEOS ---------------------- */

    $("#register-video").click((event) => {
        event.preventDefault();
        let dateForm = $("#video-register").serializeObject();
        const file = $('#picture-input-video')[0].files[0];

        if(dateForm.title=="" || dateForm.dataId=="" ) {

            $("#message").delay(100).fadeIn("slow");
            $("#message").delay(3000).fadeOut("slow");

        }else {
                var formData = new FormData();
        
                formData.append('title', dateForm.title);
                formData.append('dataId', dateForm.dataId);
                formData.append('image', file);
                $.ajax({
                    url: "/video_api",
                    method: "POST",
                    data: formData,
                    processData: false,  // Não processar os dados
                    contentType: false,  // Não configurar automaticamente o Content-Type
                    success: function(data) {
                        console.log("Resultado no Jquery: ",data);
                        $("#success").delay(100).fadeIn("slow");
                        $("#success").delay(3000).fadeOut("slow");
                        $(".title").val("");
                        $(".dataId").val("");
                        pictureImageVideo.innerHTML = "Carregar a Imagem do Vídeo";
                    },
                    error: function(e) {
                        $("#msg").css("color", "#ff0000");
                        $("#msg").html(e.responseText);
                        console.log(e.responseText);
                    }
                });
        }
    })
    



    /* ---------------------- INPUT PARA CARREGAR CAPA DO VIDEO ------------- */

    const inputFileVideo = document.querySelector("#picture-input-video");
    const pictureImageVideo = document.querySelector(".picture-image-video");
    const pictureImageVideoTxt = "Carregar a Imagem do Vídeo";
    pictureImageVideo.innerHTML = pictureImageVideoTxt;
    inputFileVideo.addEventListener("change", function (e) {
        const inputTarget = e.target;
        const file = inputTarget.files[0];
        if (file) {
            const reader = new FileReader();
            reader.addEventListener("load", function (e) {
                const readerTarget = e.target;
                const img = document.createElement("img");
                img.src = readerTarget.result;
                img.classList.add("picture_img_video");
                pictureImageVideo.innerHTML = "";
                pictureImageVideo.appendChild(img);
            });
            reader.readAsDataURL(file);
        } else {
            pictureImageVideo.innerHTML = pictureImageVideoTxt;
        }
    });


})