$(document).ready(function() {
    $("#registerButton").click((event) => {
        event.preventDefault();
        let dateForm = $("#registrationForm").serializeObject();
        const file = $('#picture__input')[0].files[0];
        
        var formData = new FormData();
       
        formData.append('firstName', dateForm.firstName);
        formData.append('lastName', dateForm.lastName);
        formData.append('email', dateForm.email);
        formData.append('password', dateForm.password);
        formData.append('permissionId', dateForm.permissionId);
        formData.append('userProfile', file);
        formData.append('fullName', `${dateForm?.firstName} ${dateForm?.lastName}`);       

            $.ajax({
                url: "/register",
                method: "post",
                data: formData,
                processData: false,  // Não processar os dados
                contentType: false,  // Não configurar automaticamente o Content-Type
                success: function(data) {
                    console.log("Resultado no Jquery: ",data)
                },
                error: function(e) {
                    $("#msg").css("color", "#ff0000");
                    $("#senha").val("");
                    $("#msg").html(e.responseText);
                }
            });

        })

    });