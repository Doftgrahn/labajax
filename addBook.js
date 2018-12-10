$(document).ready(() => {


  let $addBooksButton = $('#addBooksButton');
  let $bookList = $('.addedItems');
  let $title = $('#title');
  let $author = $('#author');
  let bookID = {
    title: $title.val(),
    author: $author.val()
  };


  $addBooksButton.on('click', data => {

    let url = 'https://www.forverkliga.se/JavaScript/api/crud.php';
    let settings = {
      op: 'insert',
      data: {
        key: 'R3kh7',
        author: 'author',
        title: 'title'
      },
    };

    $.ajax(url, settings).done(whenAjaxPost).fail(whenAjaxfail).always(serverReturn);
  });

  function whenAjaxPost(data) {

    $bookList.append($('<li>').text('Title: ' + bookID.title + ', Author: ' + bookID.author));
  };

  function whenAjaxfail(data) {
    alert('något gick fel');
  };

  function serverReturn() {
    console.log('serverReturn');
  };



});
