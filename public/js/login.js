$(document).ready(function() {
    $("#btn-login").click((event) => {
        event.preventDefault();
        let dateForm = $("#login-form").serializeObject();
        if (!dateForm.email || !dateForm.password) {
            $(".error-message").css({
                display: 'block'
            });
            $(".error-message").text("Erro, Contém campos por preencher. Por favor preencha todos os campos");
        } else {
            $(".error-message").css({
                display: 'none'
            });

            $.ajax({
                url: "/me",
                method: "post",
                data: dateForm,
                success: function(data) {
                    if (data.auth) return window.location.href = "/dashboard";
                },
                error: function(e) {
                    $("#msg").css("color", "#ff0000");
                    $("#senha").val("");
                    $("#msg").html(e.responseText);
                }
            });

        }

    });
    $("#btn-logout").click((event) => {
        event.preventDefault();
        $.ajax({
            url: '/logout',
            method: 'GET',
            success: function(response) {
              // Manipule os dados recebidos na variável 'response'
             if(response.logout) return window.location.href = "/login";
            },
            error: function() {
              console.log('Erro ao fazer a requisição.');
            }
          });
    })
});