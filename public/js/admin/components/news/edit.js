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
            var updatedNewData = {
                title: $('#title').val(),
                typeOfNew: $('#typeOfNew').val(),
                datePublished: $('#datePublished').val(),
                content: conteudo,
            };

            // Enviar dados atualizados para a API
            $.ajax({
                url: `/new/${idNew}`, 
                method: 'PUT', 
                contentType: 'application/json',
                data: JSON.stringify(updatedNewData),
                success: function (response) {
                    loadAPIData(idNewEdit);
                    console.log("Noticia editada com sucesso!!!", response);
                },
                error: function (error) {
                    console.error('Erro ao atualizar dados na API: ' + error.statusText);
                }
            });
        }
        updateAPIData(idNewEdit);
    });

});