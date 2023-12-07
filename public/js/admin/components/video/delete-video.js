$(document).ready(function () {
    $("#eliminar-video").click(function () {
        var idDeleteVideo = $(this).data('content');
        deletarBanner(idDeleteVideo);
    });

    function deletarBanner(idNew) {
        $.ajax({
            url: `/video_api/${idNew}`,
            method: 'DELETE',
            success: function (response) {
                console.log("Deletar Video Resposta: ",response);
                window.history.back();
            },
            error: function (e) {
                console.log(e.responseText);
            } 
        });
    }
});