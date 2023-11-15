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
        function fetchData(){
        $.ajax({
            url: '/user?page=0&limit=25',
            method: 'GET',
            success: function(response) {
                populateTable(response);
            },
            error: function(e) {
              console.log(e.responseText);
            }
          });
        }
        function populateTable(data) {
            $.each(data, function (index, item) {
                var imageTag = '<img src="/assets/img/user/' + item.userProfile + '" alt="Imagem" style="width:50px; height:50px;">';
                $('.userTable tbody').append(
                    '<tr>' +
                    '<td>' +(index+1) + '</td>' +
                    '<td>' +item.firstName +' '+ item.lastName + '</td>' +
                    '<td>' +item.email + '</td>' +
                    '<td>' +item.role + '</td>' +
                    '<td>' +item.type + '</td>' +
                    '<td>' + imageTag + '</td>' +
                    '</tr>'
                );
            });
        }

        // Chama a função para buscar os dados quando a página carregar
        fetchData();
    });


