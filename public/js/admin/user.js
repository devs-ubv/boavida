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
                formData.append('userProfile', file);
                formData.append('fullName', `${dateForm?.firstName} ${dateForm?.lastName}`);       
                $.ajax({
                    url: "/register",
                    method: "POST",
                    data: formData,
                    processData: false,  // Não processar os dados
                    contentType: false,  // Não configurar automaticamente o Content-Type
                    success: function(data) {
                        console.log("Resultado no Jquery: ",data)
                        $("#firstName").val("");
                        $("#lastName").val("");
                        $("#email").val("");
                        $("#password").val("");
                        $("#passConfirm").val("");
                        pictureImage.innerHTML = "Escolha uma Imagem de Perfil";
                    },
                    error: function(e) {
                        $("#msg").css("color", "#ff0000");
                        $("#msg").html(e.responseText);
                    }
                });
            }
        })

        /* ------------------ LISTAGEM DE TODOS USUARIOS -------------------------- */
        
        function fetchData(){
        $.ajax({
            url: '/user?page=0&limit=15',
            method: 'GET',
            success: function(response) {
                populateTable(response);
                populateTableAdmin(response);
            },
            error: function(e) {
              $("#error").html(e.responseText);
            }
          });
        }
        
        function populateTable(data) {
            $.each(data, function (index, item) {
                
                var imageTag = item.userProfile? '<img src="/assets/img/user/' + item.userProfile + '" alt="Imagem" style="width:50px; height:50px;">':
                '<img src="/assets/img/user/profile.jpeg" alt="Imagem" style="width:50px; height:50px;">';

                $('#userList tbody').append(
                    '<tr>' +
                        '<td>' +(index+1) + '</td>' +
                        '<td>' + imageTag + '</td>' +
                        '<td>' +item.firstName +' '+ item.lastName + '</td>' +
                        '<td>' +item.email + '</td>' +
                        '<td>' +item.role + '</td>' +
                    '</tr>'
                );
            });
        }

        function populateTableAdmin(data) {
            $.each(data, function (index, item) {
                
                var imageTag = item.userProfile? '<img src="/assets/img/user/' + item.userProfile + '" alt="Imagem" style="width:50px; height:50px;">':
                '<img src="/assets/img/user/profile.jpeg" alt="Imagem" style="width:50px; height:50px;">';

                $('#user-list-admin tbody').append(
                    '<tr>' +
                        '<td>' +(index+1) + '</td>' +
                        '<td>' + imageTag + '</td>' +
                        '<td>' +item.firstName +' '+ item.lastName + '</td>' +
                        '<td>' +item.email + '</td>' +
                        '<td>' +item.role + '</td>' +
                        '<td> <a href="#"> <i class="bi bi-box-arrow-up-right"></i> </a> </td>' +
                        '<td> <a href="#"> <i class="bi bi-pencil-square"></i> </a></td>' +
                        '<td> <a href="#"> <i class="bi bi-trash3"></i></a> </td>' +
                    '</tr>'
                );
            });
        }
        // Chama a função para buscar os dados quando a página carregar
        fetchData();


        /* ------------------ LISTAGEM DE TODOS NIVEIS DE ACESSO NO SELECT-OPTION -------------------------- */

        function fetchDataAccess(){
            $.ajax({
                url: '/permission?page=0&limit=15',
                method: 'GET',
                dataType: 'json',
                success: function(response) {
                    populateTableAccess(response);
                },
                error: function(e) {
                  console.log(e.responseText);
                }
              });
            }
            function populateTableAccess(data) {
                $.each(data, function (index, item) {
                    $('#permissionId').append(
                        '<option value="'+ item.id +'">' + item.role + '</option>'                       
                    );
                });
            }
            // Chama a função para buscar os dados quando a página carregar
            fetchDataAccess();

    });


