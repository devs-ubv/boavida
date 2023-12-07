$(document).ready(function() {    
    const inputFile = document.querySelector("#picture__input");
    const pictureImage = document.querySelector(".picture__image");
    const pictureImageTxt = "Escolha uma Imagem";
    pictureImage.innerHTML = pictureImageTxt;
    inputFile.addEventListener("change", function(e) {
        const inputTarget = e.target;
        const file = inputTarget.files[0];
        if (file) {
            const reader = new FileReader();
            reader.addEventListener("load", function(e) {
                const readerTarget = e.target;
                const img = document.createElement("img");
                img.src = readerTarget.result;
                img.classList.add("picture__img");
                pictureImage.innerHTML = "";
                pictureImage.appendChild(img);
            });
            reader.readAsDataURL(file);
        } else {
            pictureImage.innerHTML = pictureImageTxt;
        }
    });
    
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

                $('#user-list-admin tbody').append(`
                <tr>
                    <td>${(index+1)} </td> +
                    <td>${imageTag } </td> +
                    <td>${item.firstName }</td> +
                    <td>${item.email}</td> +
                    <td>${item.role}</td> +
                    <td> <a href="#"> <i class="bi bi-pencil-square"></i> </a></td> 
                    <td> <a href="/dashboard/user/deletar/${item.id}"> <i class="bi bi-trash3"></i></a> </td>
                </tr>
                `
            );
            });
    }
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
    fetchDataAccess();

});