$(document).ready(function() {
    /* ------------------ MULTI STEP PROGRESSIVE FORM FOR NEWS REGISTER -------------------------- */

    var alertMessage = document.querySelector("#alerta");
    alertMessage.style.display = "none";

    var form_1 = document.querySelector(".form_1");
    var form_2 = document.querySelector(".form_2");


    var form_1_btns = document.querySelector(".form_1_btns");
    var form_2_btns = document.querySelector(".form_2_btns");


    var form_1_next_btn = document.querySelector(".form_1_btns .btn_next");
    var form_2_back_btn = document.querySelector(".form_2_btns .btn_back");
    var form_2_next_btn = document.querySelector(".form_2_btns .btn_next");

    var form_2_progessbar = document.querySelector(".form_2_progessbar");
    var form_3_progessbar = document.querySelector(".form_3_progessbar");

    

    var modal_wrapper = document.querySelector(".modal_wrapper");
    var shadow = document.querySelector(".shadow");

    function clean(inputString) {
        // Remove todas as tags HTML da string
        let stringWithoutTags = inputString.replace(/<[^>]*>/g, '');
        // Divide a string usando o caractere '<' como delimitador
        let contentArray = stringWithoutTags.split('<');
        // Remove elementos vazios do array
        const contentResult = contentArray.filter(item => item.trim() !== '');
        if (contentResult.length == 0) {
            return false;
        }else return true;
    }

    form_1_next_btn.addEventListener("click", function(event){
        
        
        //OBTER O CONTEUDO DO EDITOR DE TEXTO
        var quill = new Quill('#editor');
        var conteudoQuill = quill.root.innerHTML;
        let dataForm = $("#news-register").serializeObject();
        const cover = $('#picture__input-newsCover')[0].files[0];
        console.log(clean(conteudoQuill));
        dataForm.content = conteudoQuill;
        if(!dataForm.title || !dataForm.typeOfNew || !dataForm.datePublished || !clean(conteudoQuill) ) {
            alertMessage.style.display = "flex";
        }else{
            
            var formData = new FormData();

            formData.append('title', dataForm.title);
            formData.append('typeOfNew', dataForm.typeOfNew);
            formData.append('datePublished', dataForm.datePublished);
            formData.append('cover', cover);
            formData.append('content', dataForm.content);

            console.log("PASSEI POR AQUI");

            fetch('/new', {
                method: 'POST',
                body: formData
              })
              .then(response => response.json())
              .then(data => {
                console.log('Resposta do servidor:', data);
              })
              .catch(error => {
                console.error('Erro ao enviar arquivo:', error);
              });

           /*  $.ajax({
                url: "/new",
                method: "POST",
                data: formData,
                success: function(data) {
                    console.log("Sucesso, Resultado no Jquery: ",data);
                },
                error: function(e) {
                    console.log("Erro ao Cadastrar");
                }
            }); */
            
        form_1.style.display = "none";
        form_2.style.display = "block";

        form_1_btns.style.display = "none";
        form_2_btns.style.display = "flex";

        form_2_progessbar.classList.add("active");  
        }

        
        
    });

    form_2_back_btn.addEventListener("click", function(){
        form_1.style.display = "block";
        form_2.style.display = "none";

        form_1_btns.style.display = "flex";
        form_2_btns.style.display = "none";

        form_2_progessbar.classList.remove("active");
    });

    form_2_next_btn.addEventListener("click", function(e){
        
        modal_wrapper.classList.add("active");

        form_3_progessbar.classList.add("active");
    });


    shadow.addEventListener("click", function(){
        modal_wrapper.classList.remove("active");
    })
})