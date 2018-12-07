$(document).ready(() => {
  const $bookList = $('.book-list');
  const $listenButton = $('#listenButton');
  const $outputDivKey = $('#receviedKey');
  const url = 'https://www.forverkliga.se/JavaScript/api/crud.php?requestKey';
  const settings = {
    method: 'GET',
    data: {
      status: 'success',
      key: 'value',
    },
  };


  $listenButton.on('click', event => {
    $.ajax(url, settings)
      .done(whenAjaxDone).fail(whenAjaxFails).always(onSucces);
  });

  function whenAjaxDone(data) {
    let newData = JSON.parse(data);
    $outputDivKey.append($('#receviedKey').text(newData.key));
    console.log('Server returned!');
  };

  function whenAjaxFails(data) {
    console.log('Does not work');
    alert('does not work');
  };

  function onSucces(data) {
    console.log('server sent!');
  };








});
