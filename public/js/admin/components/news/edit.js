$(document).ready(function () {
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
                $('#cover').val(data.cover);
                $('#content').val(data.content);
            },
            error: function (error) {
                console.error('Erro ao carregar dados da API: ' + error.statusText);
            }
        });
    }

    var idNewEdit = $('#editar').data('content');
    console.log(idNewEdit);
    if(idNewEdit){
        loadAPIData(idNewEdit);
    }
    /* $("#editar").click(function () {
       
        
    }); */
});

// Chamar a função quando a página carregar
/* $(document).ready(function () {
    // Preencher os campos do formulário com dados da API ao carregar a página
    var idNewList = $(this).data('content');
    if(idNewList){
        loadAPIData(idNewList);
    }
   
}); */

