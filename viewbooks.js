$(document).ready(() => {

  let $viewBooksButton = $('#viewBooks');
  let $viewBookList = $('.view-books-list');
  let url = 'https://www.forverkliga.se/JavaScript/api/crud.php';

  $viewBooksButton.on('click', event => {
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
          $viewBookList.append(`<li>Title: ${value.title}, Author:${value.author} , id: ${value.id} <button data-id='${value.id}' class='btn-del'>Delete</button</li>`).fadeIn('slow');
        });

        $('.btn-del').on('click', event => {
          let bookId = $(event.target).attr('data-id');
          if (bookId) {
            DeleteBook(bookId);
          }
        });
      })
      .fail(error => {
        console.log(error);
      })
      .always(done => {
        console.log(`is it done!! give Me sucesssss`);
      });

  });

  function DeleteBook(bookId) {
    let settings = {
      method: 'GET',
      data: {
        op: 'delete',
        key: apiKey,
        id: bookId,
      },
    };

    $.ajax(url, settings)
      .done(data => {
        let object = JSON.parse(data);
        if (object.status == 'success') {
          $('#deleteOutput').append('<p>Deletion succeded</p>');
          console.log('deleted');
        } else {
          $('#deleteOutput').append('<p>Deletion not succeded</p>');
        };
      })
      .fail(error => {
        console.log('error');
      })
      .always(always => {
        console.log(always);
      })
  }


});
