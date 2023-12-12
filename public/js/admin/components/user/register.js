$(document).ready(function() {
    
    /* ------------------ REGISTO DE NOVO USUARIO -------------------------- */
    $("#registerButton").click((event) => {
        event.preventDefault();
        let dateForm = $("#registrationForm").serializeObject();
        const file = $('#picture__input')[0].files[0];

        if(dateForm.firstName=="" || dateForm.lastName=="" || dateForm.email=="" || dateForm.password=="" || dateForm.passConfirm=="" ) {

            $("#message").delay(100).fadeIn("slow");
            $("#message").delay(3000).fadeOut("slow");

        }else if(dateForm.password != dateForm.passConfirm){
        
            $("#message2").delay(100).fadeIn("slow");
            $("#message2").delay(3000).fadeOut("slow");
                
            }else {
                var formData = new FormData();
        
                formData.append('firstName', dateForm.firstName);
                formData.append('lastName', dateForm.lastName);
                formData.append('email', dateForm.email);
                formData.append('password', dateForm.password);
                formData.append('permissionId', dateForm.permissionId);
                formData.append('phoneNumber', dateForm.phoneNumber);
                formData.append('userProfile', file);
                formData.append('active', 1);
                formData.append('fullName', `${dateForm?.firstName} ${dateForm?.lastName}`);       
                $.ajax({
                    url: "/register",
                    method: "POST",
                    data: formData,
                    processData: false,  // Não processar os dados
                    contentType: false,  // Não configurar automaticamente o Content-Type
                    success: function(data) {
                        console.log("Resultado no Jquery: ",data)
                        $("#success").delay(100).fadeIn("slow");
                        $("#success").delay(3000).fadeOut("slow");
                        $("#firstName").val("");
                        $("#lastName").val("");
                        $("#email").val("");
                        $("#phoneNumber").val("");
                        $("#password").val("");
                        $("#passConfirm").val("");
                        showSuccessMessage();
                    },
                    error: function(e) {
                        $("#msg").css("color", "#ff0000");
                        $("#msg").html(e.responseText);
                        showErrorMessage(e);
                    }
                });
            }
    });

});