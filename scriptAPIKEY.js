const apiKey = 'k0L4B';
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

    function sendScriptRequest(numberOfTries = 5) {
      if (numberOfTries < 1)
        return;
      $.ajax(url, settings)
        .done(data => whenAjaxDone(data, numberOfTries))
        .fail(error => whenAjaxFails(error, numberOfTries))
        .always(onSucces);
    }
  });

  function whenAjaxDone(data) {
    let newData = JSON.parse(data);
    let output = newData.key;
    $('#receviedKey').show()
    $outputDivKey.append($('#receviedKey').html(`Here's your key: <strong>${output}</strong>! Save it for later!`));
  };

  function whenAjaxFails(error) {
    $outputDivKey.append($('#receviedKey').text('Something went wrong!' + numberOfTries + 'times!'));
    sendScriptRequest(numberOfTries - 1);
  };

  function onSucces(data) {
    $listenButton.prop('disabled', false);

  };

});
