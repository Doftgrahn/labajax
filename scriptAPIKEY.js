const apiKey = 'ZCVqM';


$(document).ready(() => {
  const $listenButton = $('#listenButton');
  const $outputDivKey = $('#receviedKey');


  $listenButton.on('click', event => {

    let url = 'https://www.forverkliga.se/JavaScript/api/crud.php';
    let settings = {
      method: 'GET',
      data: {
        requestKey: '',
      },
    };
    $.ajax(url, settings).done(whenAjaxDone).fail(whenAjaxFails).always(onSucces);
  });

  function whenAjaxDone(data) {
    let newData = JSON.parse(data);
    let output = newData.key;
    $outputDivKey.append($('#receviedKey').text(output));
    console.log('Server returned!', output);
  };

  function whenAjaxFails(data) {
    console.log('Does not work');
    alert('does not work');
    $outputDivKey.append($('#receviedKey').text('Något gick fel här!'));
  };

  function onSucces(data) {
    console.log('server sent!');
  };




});
