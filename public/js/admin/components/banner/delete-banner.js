$(document).ready(function () {
    //------------------------------------------- MODAL PARA EDITAR BANNER------------------------------------------------
    // Get the modal
    var modalBannerDelete = $("#modal-delete-banner");
    var spanBannerDelete = $(".close");

    // Quando o usuário clica no <span> (x), fecha o modal
    spanBannerDelete.click(function() {
        modalBannerDelete.hide();
    });

    // Quando o usuário clica fora do modal, fecha o modal
    $(window).click(function(event) {
        if (event.target === modalBannerDelete[0]) {
            modalBannerDelete.hide();
        }
    });
});