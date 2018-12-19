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

    if ($title.val() === '') {
      $addBooksButton.prop('disabled', true)
    };
    if ($author.val() === '') {
      $addBooksButton.prop('disabled', true)
    };

    sendAJAXrequest();

    $addBooksButton.prop('disabled', false);

    function sendAJAXrequest(tries = 5) {
      if (tries < 1)
        return;

      $.ajax(url, settings).done(data => whenAjaxPost(data, tries)).fail(whenAjaxfail, tries).always(serverReturn)
    };

    function whenAjaxPost(data, tries) {
      let bookID = {
        title: $title.val(),
        author: $author.val()
      };
      let object = JSON.parse(data);
      if (object.status === 'success') {
        $bookList.append($('<li>').html('Title: ' + bookID.title + ', Author: ' + bookID.author));
        viewBookSendRequest();


      } else {
        $('#deleteOutput').append(`<li>Error! Retrying...status is ${object.message}. we have tried ${tries} times.</li>`);
        sendAJAXrequest(tries - 1);
      };
    };

  });

  function whenAjaxfail(error, tries) {
    $bookList.append('<li>Error! Retrying...</li>');
    sendAJAXrequest(tries - 1);
  };

  function serverReturn(always) {
    $('.btn-del').prop('disabled', false)

  };
});
