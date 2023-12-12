$(document).ready(function () {
    $("#eliminar-banner").click(function () {
        var idDeleteBanner = $(this).data('content');
        deletarBanner(idDeleteBanner);
    });

    function deletarBanner(idNew) {
        $.ajax({
            url: `/banner/${idNew}`,
            method: 'DELETE',
            success: function (response) {
                var voltar = "/dashboard/banner/listar/default";
                window.location.href = voltar;
            },
            error: function (e) {
                console.log(e.responseText);
            } 
        });
    }
});