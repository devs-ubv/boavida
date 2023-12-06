$(document).ready(function() {

    /* ------------------ REGISTO DE NOVO USUARIO -------------------------- */

    $("#acessLevelBtn").click((event) => {
        event.preventDefault();
        let dateForm = $("#acessLevelRegister").serializeObject();
        
            $.ajax({
                url: "/permission",
                method: "POST",
                data: dateForm,
                success: function(data) {
                    console.log("Resultado no Jquery: ",data)
                    $("#role").val("");
                    showSuccessMessage();
                },
                error: function(e) {
                    $("#msg").css("color", "#ff0000");
                    $("#msg").html(e.responseText);
                }
            }); 
        })

/* ---------------------------- LISTAGEM DE TODAS AS NOTICIAS NOTICIA ---------------------- */
function fetchData(){
    $.ajax({
        url: '/permission?page=0&limit=8',
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
            $('#acessLevel tbody').append(
                '<tr>' +
                    '<td>' +(index+1) + '</td>' +
                    '<td>' + item.role + '</td>' +
                    '<td> <a href="#"> <i class="bi bi-pencil-square"></i> </a></td>' +
                    '<td> <a href="#"> <i class="bi bi-trash3"></i></a> </td>' +
                '</tr>'
            );
        });
    }
    // Chama a função para buscar os dados quando a página carregar
    fetchData();

})