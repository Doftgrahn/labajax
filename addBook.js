$(document).ready(() => {

  let $addBooksButton = $('#addBooksButton');
  let $bookList = $('.addedItems');
  let $title = $('#title');
  let $author = $('#author');

  $addBooksButton.on('click', data => {
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
    let object = JSON.parse(data);
    if (object.status == 'success') {
      $bookList.append($('<li>').html('Title: ' + bookID.title + ', Author: ' + bookID.author));
    } else {
      $bookList.append('<li>Error!</li>');
    }
  };
  function whenAjaxfail(error) {
    console.log('något gick fel', error);
  };
  function serverReturn(always) {
    console.log('serverReturn', always);
  };
});
