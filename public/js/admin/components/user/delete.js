
$("#eliminar-user").click(function () {
    var idUserDelete = $(this).data('content');
    deletarUser(idUserDelete);
    console.log("ID: ",idUserDelete);
});

function deletarUser(idUser) {
    $.ajax({
        url: `/user-delete/${idUser}`,
         method: 'PUT',
         success: function (response) {
            console.log("Deletar Usuario Resposta: ",response);
         },
         error: function (e) {
             console.log(e.responseText);
         } 
     });
}