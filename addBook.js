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
    $addBooksButton.prop('disabled', false);
    sendrequest();

    function sendrequest(numberOfTries = 5) {
      if (numberOfTries < 1)
        return;

      $.ajax(url, settings)
        .done(whenAjaxPost)
        .fail(whenAjaxfail, sendrequest)
        .always(serverReturn);
    };
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
      $bookList.append(`<li>Error! Retrying...status is ${object.message}`);
    }
  };

  function whenAjaxfail(error, numberOfTries) {
    $bookList.append('<li>Error! Retrying...</li>');
    console.log('något gick fel', error);
    sendrequest(numberOfTries - 1);
  };

  function serverReturn(always) {
    console.log('serverReturn', always);
    $('.btn-del').prop('disabled', false)

  };
});
