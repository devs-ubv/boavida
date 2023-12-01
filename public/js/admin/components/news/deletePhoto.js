$("#eliminar-photo").click(function () {
    var idPhotoDelete = $(this).data('content');
    deletarPhoto(idPhotoDelete);
    console.log("ID: ",idPhotoDelete);
});

function deletarPhoto(idNew) {
    
    $.ajax({
        url: `/upload/${idNew}`,
         method: 'DELETE',
         success: function (response) {
            console.log("Deletar Noticia Resposta: ",response);
         },
         error: function (e) {
             console.log(e.responseText);
         } 
     });
}