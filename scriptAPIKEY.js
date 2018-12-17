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
    $('.errormessages').append(data).show();

    let newData = JSON.parse(data);
    let output = newData.key;
    $outputDivKey.append($('#receviedKey').text(output));
    console.log('Server returned!', output);
  };

  function whenAjaxFails(data) {
    console.log('Does not work');
    $('.errormessages').append(error).show();
    alert('does not work');
    $outputDivKey.append($('#receviedKey').text('Något gick fel här! Testar igen!'));
    sendScriptRequest(numberOfTries - 1);
  };

  function onSucces(data) {
    console.log('server sent!');
    $listenButton.prop('disabled', false);

  };

});
