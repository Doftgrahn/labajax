$(document).ready(() => {

  const modifyBookButton = $('#modifyBookButton');
  const inputID = $('#inputID');
  const modifyTitle = $('#modifyTitle');
  const modifyAuthor = $('#modifyAuthor');

  modifyBookButton.on('click', data => {
    let settings = {
      method: 'GET',
      data: {
        op: 'update',
        key: apiKey,
        id: $('#inputID').val(),
        title: $('#inputTitle').val(),
        author: $('#inputAuthor').val(),
      },
    };
    modifyBookButton.prop('disabled', true);
    modifySendRequest();

    function modifySendRequest(numberOfTries = 5) {
      if (numberOfTries < 1)
        return;

      $.ajax(url, settings)

        .done(data => {
          $('.errormessages').append(data).show();

          let object = JSON.parse(data);
          if (object.status == 'success') {
            console.log('done here', object);
            $('#outputmodify').append('<p>modification succeded</p>');
          } else {
            console.log('Nothing is working');
            $('#outputmodify').append("<p>Didn't succed'</p>");

          };
        })
        .fail(error => {
          console.log('error', 'testar igen!');
          modifySendRequest(numberOfTries - 1);
          $('.errormessages').append(error).show();


        })
        .always(always => {
          console.log('Will always return');
          modifyBookButton.prop('disabled', false);

        })

    };

  })

});
