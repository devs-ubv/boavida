document.addEventListener("DOMContentLoaded", function() {
    var seuElemento = document.getElementById("pca-open-modal");
    var seuElementoModal = document.getElementById("pca-modal");

    seuElementoModal.style.display = "none";

    seuElemento.addEventListener("click", function() {
        seuElementoModal.style.display = "flex";
    });
});
