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
        /* function updateVideoData(idNew) {
            // Obter dados do formulário
            const dataForm = $("#video-edit-form").serializeObject();
            const formData = new FormData();
            formData.append('title', dataForm.title);
            formData.append('dataId', dataForm.dataId);
         // Enviar dados atualizados para a API
            fetch(`/video_api/${idNew}`, {
                method: 'PUT',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                console.log("Data Video: ",data);
            })
            .catch(error => {
                   console.error('Erro ao Atualizar Dados:', error);
            }); 
        }
        updateVideoData(idVideoEdit); */
        function atualizarDados(idNew) {
            // Obtenha os dados do formulário usando formData
            const dataForm = $("#video-edit-form").serializeObject();
            const formData = new FormData();
            formData.append('title', dataForm.title);
            formData.append('dataId', dataForm.dataId);
          
            // Faça a requisição AJAX para a API
            $.ajax({
                url: `/video_api/${idNew}`,
                type: 'PUT', // ou 'PUT' dependendo da sua API
                data: formData,
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