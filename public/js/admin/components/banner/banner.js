$(document).ready(function () {
    var bannerId = $("#id-banner").data('content');
    if(bannerId){
        listOneBanner(bannerId);
    }
    function listOneBanner(){
        console.log("BANNER ID ",bannerId);
        if(bannerId){
            $.ajax({
                url: `/banner/${bannerId}`,
                method: 'GET',
                success: function (response) {
                    populateBanner(response);
                },
                error: function (e) {
                    console.log(e.responseText);
                }
            });
        }
    }

    function populateBanner(data) {
        console.log(data.cover);
        $('.banner_header').append(
            `
                <img src="/assets/img/banner/${data?.banner}"/>
                <h1>${data?.title}</h1>
            `
        );
    }
});