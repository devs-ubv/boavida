$(document).ready(function () {
    var videoId = $("#id-video").data('content');
    if(videoId){
        listOneVideo(videoId);
    }
    function listOneVideo(){
        console.log("BANNER ID ",videoId);
        if(videoId){
            $.ajax({
                url: `/video_api/${videoId}`,
                method: 'GET',
                success: function (response) {
                    populateVideo(response);
                },
                error: function (e) {
                    console.log(e.responseText);
                }
            });
        }
    }

    function populateVideo(data) {
        console.log(data.cover);
        $('.video_header').append(
            `
                <img src="/assets/img/video/${data?.image}" />
                <h1>${data?.title}</h1>
            `
        );
    }
});