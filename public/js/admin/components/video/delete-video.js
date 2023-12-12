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
                var voltar = "/dashboard/video/listar/default";
                window.location.href = voltar;
            },
            error: function (e) {
                console.log(e.responseText);
            } 
        });
    }
});