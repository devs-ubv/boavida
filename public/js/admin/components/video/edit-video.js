$(document).ready(function () {
    var idVideoEdit = $('#editar-video').data('content');

    function loadVideoData(idNew) {
        $.ajax({
            url: `/video_api/${idNew}`,
            method: 'GET',
            dataType: 'json',
            success: function (data) {
                // Preencher os campos do formulário com dados da API
                $('#title').val(data.title);
                $('#dataId').val(data.dataId);
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
        function atualizarDados(idNew) {
            const dataForm = $("#video-edit-form").serializeObject();
            $.ajax({
                url: `/video_api/${idNew}`,
                data: dataForm,
                success: function(response) {
                    console.log('Dados atualizados com sucesso!', response);
                },
                error: function(error) {
                    console.error('Erro ao atualizar dados:', error);
                }
            });
        }
        atualizarDados(idVideoEdit);
    });


});