(function($) {
    "use strict";
    $(".business_unit").click(function() {
        $(this).addClass("active");
        $('.leadership_institute').removeClass("active");
        $('.boavidacompay').removeClass("active");

        $("#business_unit").css({
            display: 'flex',
        })
        $("#boavidacompay").css({
            display: 'none',
        })
        $("#leadership_institute").css({
            display: 'none',
        })
    })
    $(".boavidacompay").click(function() {
        $(this).addClass("active");
        $('.leadership_institute').removeClass("active");
        $('.business_unit').removeClass("active");

        $("#boavidacompay").css({
            display: 'flex',
        })
        $("#business_unit").css({
            display: 'none',
        })
        $("#leadership_institute").css({
            display: 'none',
        })
    })
    $(".leadership_institute").click(function() {
        $(this).addClass("active");
        $('.boavidacompay').removeClass("active");
        $('.business_unit').removeClass("active");

        $("#leadership_institute").css({
            display: 'flex',
        })
        $("#boavidacompay").css({
            display: 'none',
        })
        $("#business_unit").css({
            display: 'none',
        })

    })
})(jQuery);