$(document).ready(() => {

  let $addBooksButton = $('#addBooksButton');
  let $bookList = $('.addedItems');
  let $title = $('#title');
  let $author = $('#author');



  $addBooksButton.on('click', data => {



    let url = 'https://www.forverkliga.se/JavaScript/api/crud.php';
    let settings = {
      method: 'GET',
      data: {
        op: 'insert',
        key: apiKey,
        title: $('#title').val(),
        author: $('#author').val()

      },
    };

    $.ajax(url, settings)
      .done(whenAjaxPost)
      .fail(whenAjaxfail)
      .always(serverReturn);
  });

  function whenAjaxPost(data) {
    let bookID = {
      title: $title.val(),
      author: $author.val()
    };

  $bookList.append($('<li>').html('Title: ' + bookID.title + ', Author: ' + bookID.author));
  };

  function whenAjaxfail(error) {
    console.log('något gick fel', error);
  };

  function serverReturn(always) {
    console.log('serverReturn', always);
  };



});
