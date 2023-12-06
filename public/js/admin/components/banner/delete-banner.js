$(document).ready(function () {
    //------------------------------------------- MODAL PARA EDITAR BANNER------------------------------------------------
    // Get the modal
    var modalBannerDelete = document.getElementById("modal-delete-banner");
    // Get the <span> element that closes the modal
    var spanBannerDelete = document.getElementsByClassName("close")[0];
    // When the user clicks on <span> (x), close the modal
    spanBannerDelete.onclick = function() {
        modalBannerDelete.style.display = "none";
    }
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modalBannerDelete) {
            modalBannerDelete.style.display = "none";
        }
    }
});