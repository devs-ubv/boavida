$(document).ready(function () {
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
        const contentResult = contentArray.filter(item => item.trim() !== '');
        if (contentResult.length == 0) {
            return false;
        } else return true;
    }
    form_1_next_btn.addEventListener("click",   function (event) {

        //OBTER O CONTEUDO DO EDITOR DE TEXTO
        var quill = new Quill('#editor');
        var conteudoQuill = quill.root.innerHTML;
        let dataForm = $("#news-register").serializeObject();
        const cover = $('#picture__input-newsCover')[0].files[0];
        console.log(clean(conteudoQuill));
        dataForm.content = conteudoQuill;
        if (!dataForm.title || !dataForm.typeOfNew || !dataForm.datePublished || !clean(conteudoQuill)) {
            return alert("Preencha todos os campos!");
        } else {

            var formData = new FormData();

            formData.append('title', dataForm.title);
            formData.append('typeOfNew', dataForm.typeOfNew);
            formData.append('datePublished', dataForm.datePublished);
            formData.append('cover', cover);
            formData.append('content', dataForm.content);

             fetch('/new', {
                 method: 'POST',
                 body: formData
               })
               .then(response => response.json())
               .then(data => {
                localStorage.setItem("idNew", data.insertId)
                //if (data) return window.location.href = `/dashboard/news/${data.insertId}`;
               })
               .catch(error => {
                 console.error('Erro ao enviar arquivo:', error);
               });

            form_1.style.display = "none";
            form_2.style.display = "block";

            form_1_btns.style.display = "none";
            form_2_btns.style.display = "flex";

            form_2_progessbar.classList.add("active");
        }



    });

    form_2_back_btn.addEventListener("click", function () {
        form_1.style.display = "block";
        form_2.style.display = "none";

        form_1_btns.style.display = "flex";
        form_2_btns.style.display = "none";

        form_2_progessbar.classList.remove("active");
    });

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
        };

        xhr.onerror = function () {
            console.error('Erro de rede ao enviar o arquivo:', file.name);
        };

        xhr.send(formData);
    }

    form_2_next_btn.addEventListener("click", async function (e) {
        var input = document.getElementById('picture__input-news');
        var id   = document.getElementById('id_new');

        var files = input.files;

        if (files.length > 0) {
          await uploadFile(files, 0);
        }

        modal_wrapper.classList.add("active");

        form_3_progessbar.classList.add("active");
    });


    shadow.addEventListener("click", function () {
        modal_wrapper.classList.remove("active");
    })


})