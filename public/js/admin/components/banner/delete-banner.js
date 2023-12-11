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
                window.history.back();
            },
            error: function (e) {
                console.log(e.responseText);
            } 
        });
    }
});