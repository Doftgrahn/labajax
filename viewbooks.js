$(document).ready(() => {

  let $viewBooksButton = $('#viewBooks');
  let $viewBookList = $('.view-books-list');


  $viewBooksButton.on('click', event => {
    let url = 'https://www.forverkliga.se/JavaScript/api/crud.php';
    let settings = {
      method: 'GET',
      data: {
        op: 'select',
        key: apiKey,
      },
    };
    $.ajax(url, settings)
      .done(data => {
        let objectview = JSON.parse(data);
        $.each(objectview.data, function(index, value) {
          $viewBookList.append(`<li>Title: ${value.title}, Author:${value.author} , id: ${value.id} </li>`);
        })
      })
      .fail(error => {
        console.log(error);
      })
      .always(done => {
        console.log(`is it done!! give Me sucesssss`);
      });

  });




});
