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

    $.ajax(url, settings)

      .done(data => {
        let object = JSON.parse(data);
        if (object.status == 'success') {
          console.log('done here', object);
          $('#outputmodify').append('<p>modification succeded</p>');
        }
        else {
          console.log('Nothing is working');
          $('#outputmodify').append("<p>Didn't succed'</p>");

        };
      })
      .fail(error => {
        console.log('error');
      })
      .always(always => {
        console.log('Will always return');
      })
  })

});
