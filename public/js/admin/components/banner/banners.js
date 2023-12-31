$(document).ready(function () {

    /* ------------------INPUT DE CARREGAMENTO DO BANNER---------------------- */

    const inputFileCover = document.querySelector("#picture-input-banner");
    const pictureImageCover = document.querySelector(".picture-image-banner");
    const pictureImageBannerTxt = "Carregar a Imagem do Banner";
    pictureImageCover.innerHTML = pictureImageBannerTxt;
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
            pictureImageCover.innerHTML = pictureImageBannerTxt;
        }
    });


    /* ---------------------------- FUNÇÃO PARA FORMATAÇÃO DA DATA NA APRESENTAÇÃO ---------------------- */

    function formatDate(dataString) {
        const data = new Date(dataString);

        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return data.toLocaleDateString('pt-BR', options);
    }
    

    /* ------------------CADASTRO DE BANNER ---------------------- */

    $("#register-banner").click((event) => {
        event.preventDefault();
        /* APRESENTAR O LOADING NO BOTÃO */
        $("#loading").show();
        $("#button-text").hide();

        let dateForm = $("#banner-register").serializeObject();
        const file = $('#picture-input-banner')[0].files[0];

        if(dateForm.title=="" || dateForm.type=="" ) {

            $("#message").delay(100).fadeIn("slow");
            $("#message").delay(3000).fadeOut("slow");

        }else {
            
                var formData = new FormData();
        
                formData.append('title', dateForm.title);
                formData.append('type', dateForm.type);
                formData.append('banner', file);       
                $.ajax({
                    url: "/banner",
                    method: "POST",
                    data: formData,
                    processData: false,  // Não processar os dados
                    contentType: false,  // Não configurar automaticamente o Content-Type
                    success: function(data) {
                        console.log("Resultado no Jquery: ",data);
                        /* APRESENTAR O LOADING NO BOTÃO */
                        $("#loading").hide();
                        $("#button-text").show();
                        $("#success").delay(100).fadeIn("slow");
                        $("#success").delay(3000).fadeOut("slow");
                        $(".title").val("");
                        $(".type").val("");
                        pictureImageCover.innerHTML = "Carregar a Imagem do Banner";
                        showSuccessMessage();
                    },
                    error: function(e) {
                        $("#msg").css("color", "#ff0000");
                        $("#msg").html(e.responseText);
                        console.log(e.responseText);
                        showErrorMessage(e);
                    }
                });
            }
        })

    /* ------------------LISTAGEM DE TODAS OS BANNER ---------------------- */
    
    

    function fetchDataBanner() {
            $.ajax({
            url: '/banner?page=0&limit=25',
            method: 'GET',
            success: function (response) {
                populateTable(response);
            },
            error: function (e) {
                console.log(e.responseText);
            }
        });
    }

    function populateTable(data) {
        $.each(data, function (index, item) {
            var imageTag = item.banner ? '<img src="/assets/img/banner/' + item.banner + '" alt="Imagem" style="width:50px; height:50px;">' :
                '<img src="/assets/img/news/new-prototype.jpg" alt="Imagem" style="width:50px; height:50px;">';
        

            $('#banner-list tbody').append(
                `<tr>
                    <td> ${(index + 1)} </td>
                    <td> ${imageTag}</td>
                    <td> ${item.title} </td>
                    <td> ${item.type}</td>
                    <td> ${item.fullName}</td>
                    <td> ${formatDate(item.createdAt)} </td>
                    <td> <a href='/dashboard/banner/${item.id}'> <i class="bi bi-box-arrow-up-right"></i> </a> </td> +
                    <td> <a href='/dashboard/banner/editar/${item.id}'> <i class="bi bi-pencil-square"></i> </a></td> 
                    <td> <a href='/dashboard/banner/deletar/${item.id}'> <i class="bi bi-trash3"></i></a> </td> 
                </tr>`
            );
        });
    }

    fetchDataBanner()
    })
 