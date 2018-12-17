$(document).ready(() => {

  let $viewBooksButton = $('#viewBooks');
  let $viewBookList = $('.view-books-list');
  let objectview;
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
        $('.showList').fadeOut('slow');
        $viewBookList.empty();
        let objectview = JSON.parse(data);

        $.each(objectview.data, function(index, value) {
          $viewBookList.append(`<li class="showList">Title: ${value.title}, Author:${value.author} , id: ${value.id}
<button data-id='${value.id}' class='btn-del'>Delete</button></li>`)
        });

        $('.showList').slideDown('fast');
        $('.showList').show();

        $('.btn-del').on('click', event => {
          //console .log('Kommer jag åt informationen?', objectview.status);
          console.log('Klickas det?', event);
          let bookId = $(event.target).attr('data-id');
          if (bookId) {
            DeleteBook(bookId);
            $(event.target).parent().clear();
          };

        });
      })
      .fail(error => {
        console.log(error);
        ('$deleteOutput').append(`error`)
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
          console.log(data);

          $('#deleteOutput').append('<p class="errormessagedelete">Deletion succeded</p>');

        } else {
          $('#deleteOutput').append('<p class="errormessagedelete">Deletion not succeded</p>');



        };
      })
      .fail(error => {
        console.log(data);
      //  $('.showList').show();

      })
      .always(always => {
        console.log('kommer alltid visas');
      })
  }
});
