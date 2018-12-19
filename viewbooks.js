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
        $('.showList').fadeOut('slow');
        $viewBookList.empty();
        let objectview = JSON.parse(data);

        if (objectview.status === 'success')
        {
        $.each(objectview.data, function(index, value) {
          $viewBookList.append(`<li class="showList">Title: ${value.title}, Author:${value.author} , id: ${value.id}
<button data-id='${value.id}' class='btn-del'>Delete</button></li>`)
        });
        $('.showList').slideDown('fast');
        $('.showList').show();}
else {
  $('#deleteOutput').show();
  $('#deleteOutput').append('<p>Något gick fel här vi har anropat servern ' +  numberOfTries +' gånger.</p>');
};



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

        $('.errormessages').append(error).show();
        $('#deleteOutput').append(`error, testar igen... status är ${objectview.message}`);
        viewBookSendRequest(numberOfTries-1);
        $('#deleteOutput').slideDown('fast');
        $('#deleteOutput').show();


      //  $('.errormessages').append(error).show();
      })

      .always(done => {
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
      if (numberOfTries < 1)
        return;

      $.ajax(url, settings)
        .done(data => {
          let object = JSON.parse(data);
          if (object.status == 'success') {
            $('#deleteOutput').append('<p class="errormessagedelete">Deletion succeded</p>');
          } else {
            $('#deleteOutput').append('<p class="errormessagedelete">Deletion not succeded, retrying...</p>');
            requestSent(numberOfTries - 1);
          };
        })

        .fail(error => {
          $('.errormessages').append(error).show();
          requestSent(numberOfTries - 1);
          $('#deleteOutput').append('<p class=errormessagedelete">Delation did not work out that well, we are retrying</p>');



        })
        .always(always => {
          $('.btn-del').prop('disabled', false)
          $('#deleteOutput').slideDown('fast');
          $('#deleteOutput').show();
        });
    }; //requestSent

  };
});
