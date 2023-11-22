$(document).ready(function () {
    /* ------------------LISTAGEM DE TODAS AS NOTICIAS ---------------------- */

    function fetchData() {
        $.ajax({
            url: '/banner?page=0&limit=25',
            method: 'GET',
            success: function (response) {
                console.log(response);
                populateTable(response);

            },
            error: function (e) {
                console.log(e.responseText);
            }
        });
    }
    
    function populateTable(data) {
        $.each(data, function (index, item) {
            var imageTag = item.cover ? '<img src="/assets/img/banner/' + item.bennr + '" alt="Imagem" style="width:50px; height:50px;">' :
                '<img src="/assets/img/news/new-prototype.jpg" alt="Imagem" style="width:50px; height:50px;">';

            $('#banner-list tbody').append(
                `<tr>
                    <td> ${(index + 1)} </td>
                    <td> ${imageTag}</td>
                    <td> ${item.title} </td>
                    <td> ${item.type}</td>
                    <td> ${item.fullName}</td>
                    <td> ${simplifyDate(item.createdAt)} </td>
                    <td> <a href='/dashboard/news/${item.id}'> <i class="bi bi-box-arrow-up-right"></i> </a> </td> +
                    <td> <a href="#"> <i class="bi bi-pencil-square"></i> </a></td> 
                    <td> <a href=""> <i class="bi bi-trash3"></i></a> </td> 
                </tr>`
            );
        });
    }
    fetchData()
    })
 