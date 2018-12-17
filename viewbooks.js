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
    $viewBooksButton.prop('disabled', true);
    viewBookSendRequest();

function viewBookSendRequest (numberOfTries = 5){
if (numberOfTries < 1)
return;

    $.ajax(url, settings)

      .done(data => {
        console.log('Slide in');
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
          console.log('Klickas det?', event);
          let bookId = $(event.target).attr('data-id');
          if (bookId) {
            DeleteBook(bookId);
            $(event.target).parent().hide();
          };

        });
      })
      .fail(error => {
        console.log(error);
        ('$deleteOutput').append(`error, testar igen...`)
        viewBookSendRequest(numberOfTries-1)
      })

      .always(done => {
        console.log(`is it done!! give Me sucesssss`);
        $viewBooksButton.prop('disabled', false);

      });
    };   //in här..

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
    $('.btn-del').prop('disabled', true)

    requestSent();

    function requestSent(numberOfTries = 5) {
      console.log('requestSent anropad');
      if (numberOfTries < 1)
        return;

      $.ajax(url, settings)
        .done(data => {
          let object = JSON.parse(data);
          if (object.status == 'success') {
            console.log(data);

            $('#deleteOutput').append('<p class="errormessagedelete">Deletion succeded</p>');

          } else {
            $('#deleteOutput').append('<p class="errormessagedelete">Deletion not succeded, retrying...</p>');
            requestSent(numberOfTries - 1);
          };
        })

        .fail(error => {
          console.log(data);
          //  $('.showList').show();
          requestSent(numberOfTries - 1);

        })
        .always(always => {
          console.log('kommer alltid visas');
          $('.btn-del').prop('disabled', false)

        })
    }; //requestSent

  }
});
