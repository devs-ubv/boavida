$(document).ready(function () {

    var idNew = $('#news-id').data('content');    
    if(idNew){
        listOneNew(idNew);
    }

    function contentData(data) {
        let parser = new DOMParser();
        let doc = parser.parseFromString(data, 'text/html');
        let paragraphs = doc.querySelectorAll('p');
        return Array.from(paragraphs).map(paragraph => paragraph.textContent);
    }
    
    function listOneNew (idNew) {
        $.ajax({
           url: `/new/${idNew}`,
            method: 'GET',
            success: function (response) {
                const content= contentData(response.content);
                delete response.content;
                const newData = {
                  content: content,
                  ...response
                }
                populateNew(newData);
            },
            error: function (e) {
                console.log(e.responseText);
            }
        });
    }

    function populateNew(data) {        
        $.each(data?.content, function (index, item) {
            $('#content-new').append(
                `  
                    <p>${item}<p/>
                `
            )
        });
        
    }

    
    // Chama a função para buscar os dados quando a página carregar

    



   

});