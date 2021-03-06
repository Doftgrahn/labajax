$(document).ready(() => {

  const modifyBookButton = $('#modifyBookButton');
  const inputID = $('#inputID');
  const modifyTitle = $('#modifyTitle');
  const modifyAuthor = $('#modifyAuthor');

  modifyBookButton.on('click', data => {

    modifyBookButton.prop('disabled', true);
    modifySendRequest();

  });
});

function modifySendRequest(numberOfTries = 5) {

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


  if (numberOfTries < 1)
    return;

  $.ajax(url, settings)

    .done(data => {

      let object = JSON.parse(data);
      if (object.status == 'success') {
        $('#deleteOutput').show();
        $('#deleteOutput')
          .append('<p>modification succeded</p>');
        viewBookSendRequest();


      } else {
        //$('#deleteOutput').clear();
        $('#deleteOutput').show();
        $('#deleteOutput').append('<p>modification did not succed ' + numberOfTries + ' times.</p>');
        modifySendRequest(numberOfTries - 1);
        viewBookSendRequest();


      };
    })
    .fail(error => {
      modifySendRequest(numberOfTries - 1);
    })
    .always(always => {
      $('#modifyBookButton').prop('disabled', false);
    })
};
