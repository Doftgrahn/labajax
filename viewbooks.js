$(document).ready(() => {

  let $viewBooksButton = $('#viewBooks');
  let $viewBookList = $('.view-books-list');


  $viewBooksButton.on('click', event => {
    let url = 'https://www.forverkliga.se/JavaScript/api/crud.php';
    let settings = {
      method: 'GET',
      data: {
        op: 'select',
        key: apiKey
      },
    };
    $.ajax(url, settings)
      .done(data => {
        let objectview = JSON.parse(data);
        let showTitle = objectview.title;
        let showAuthor = objectview.author;
        let showID = objectview.id;
        $viewBookList.append($('<li>').html('Title: ' + showTitle + ', Author: ' + showAuthor));


      })
      .fail(error => {
        console.log(error);
      })
      .always(done => {
        console.log(`is it ${done}`);
      });

  });









});
