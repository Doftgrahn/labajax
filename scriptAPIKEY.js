const apiKey = 'ZCVqM';
const url = 'https://www.forverkliga.se/JavaScript/api/crud.php';



$(document).ready(() => {
  const $listenButton = $('#listenButton');
  const $outputDivKey = $('#receviedKey');

  $listenButton.on('click', event => {
    let settings = {
      method: 'GET',
      data: {
        requestKey: '',
      },
    };

$listenButton.prop('disabled', true);
sendScriptRequest();

function sendScriptRequest (numberOfTries = 5)  {
  if (numberOfTries < 1)
  return;
    $.ajax(url, settings)
    .done(whenAjaxDone)
    .fail(whenAjaxFails)
    .always(onSucces);
  }

  });

  function whenAjaxDone(data) {
    let newData = JSON.parse(data);
    let output = newData.key;
    $('.errormessages').append(newData.status).show();
    $outputDivKey.append($('#receviedKey').html(`status är ${newData.status}.<br>Din Nyckel är <strong>${output}</strong>`));
    console.log('Server returned!', output);
  };

  function whenAjaxFails(data) {
    console.log('Does not work');
    $('.errormessages').append(error).show();
    $outputDivKey.append($('#receviedKey').text('Något gick fel här! Testar igen!'));
    sendScriptRequest(numberOfTries - 1);
  };

  function onSucces(data) {
    console.log('server sent!');
    $listenButton.prop('disabled', false);

  };

});
