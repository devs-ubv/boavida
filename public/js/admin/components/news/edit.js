$(document).ready(function () {

    var quill = new Quill('#editContent', {
        theme: 'snow'
    });

    function loadAPIData(idNew) {
        $.ajax({
            url: `/new/${idNew}`,
            method: 'GET',
            dataType: 'json',
            success: function (data) {
                // Preencher os campos do formulário com dados da API
                $('#title').val(data.title);
                $('#typeOfNew').val(data.typeOfNew);
                $('#datePublished').val(data.datePublished);
                $('#image-preview').attr('src', '/assets/img/news/'+data.cover);
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
            // Obter dados do formulário
            var conteudo = quill.root.innerHTML;
            const cover = $('#fileInput')[0].files[0]
            let dataForm = $("#update-new-form").serializeObject();
            console.log(dataForm, cover);
        
           var formData = new FormData();
            formData.append('title', dataForm.title);
            formData.append('typeOfNew', dataForm.typeOfNew);
            formData.append('datePublished', dataForm.datePublished);
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
                //if (data) return window.location.href = `/dashboard/news/${data.insertId}`;
            })
            .catch(error => {
                   console.error('Erro ao enviar arquivo:', error);
            }); 
      
        
        }
        updateAPIData(idNewEdit);
    });

});