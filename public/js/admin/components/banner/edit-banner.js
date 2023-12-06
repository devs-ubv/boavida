$(document).ready(function () {

    var modalBannerEdit = $("#modal-edit-banner");
    var spanBannerEdit = $(".close");

    // Quando o usuário clica no <span> (x), fecha o modal
    spanBannerEdit.click(function() {
        modalBannerEdit.hide();
    });

    // Quando o usuário clica fora do modal, fecha o modal
    $(window).click(function(event) {
        if (event.target === modalBannerEdit[0]) {
            modalBannerEdit.hide();
        }
    });

    /* ------------------INPUT DE CARREGAMENTO DA IMAGEM DO BANNER---------------------- */
    const bannerFileCover = document.querySelector("#picture-edit-banner");
    const pictureEditImageCover = document.querySelector(".picture-image-banner-edit");
    const pictureEditImageBannerTxt = "Carregar a Imagem do Banner";
    pictureEditImageCover.innerHTML = pictureEditImageBannerTxt;
    bannerFileCover.addEventListener("change", function (e) {
        const inputTarget = e.target;
        const file = inputTarget.files[0];
        if (file) {
            const reader = new FileReader();
            reader.addEventListener("load", function (e) {
                const readerTarget = e.target;
                const img = document.createElement("img");
                img.src = readerTarget.result;
                img.classList.add("picture-img-edit-cover");
                pictureEditImageCover.innerHTML = "";
                pictureEditImageCover.appendChild(img);
            });
            reader.readAsDataURL(file);
        } else {
            pictureEditImageCover.innerHTML = pictureEditImageBannerTxt;
        }
    });
});