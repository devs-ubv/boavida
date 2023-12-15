$(document).ready(function() {
    $("#btn-login").click((event) => {
        event.preventDefault();
        let dateForm = $("#login-form").serializeObject();
        if (!dateForm.email || !dateForm.password) {
            $(".error-message").css({
                display: 'block'
            });
            $(".error-message").text("Oops! Parece que alguns campos não foram preenchidos. Por favor, preencha todos os campos para continuar.");
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
                    showErrorMessage(e);
                    $("#password").val("");
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
    
    $("#logout-modal-open").click((event) => {
        $("#modal-logout").show();
    })
    $("#close-modal-logout").click((event) => {
        $("#modal-logout").hide();
    })
});

function ErrorMessage(responseText){
    if (responseText && responseText.error) {
        return responseText.error;
    }
}
