$(document).ready(function(){
    var modal = $("#myModal");
    var btn = $("#myBtn");
    var span = $(".close");

    // When the user clicks the button, open the modal
    btn.click(function(){
        modal.css("display", "flex");
        modal.css("align-items", "center");
    });

    // When the user clicks on <span> (x), close the modal
    span.click(function(){
        modal.css("display", "none");
    });

    // When the user clicks anywhere outside of the modal, close it
    $(window).click(function(event){
        if (event.target == modal[0]) {
            modal.css("display", "none");
        }
    });
});