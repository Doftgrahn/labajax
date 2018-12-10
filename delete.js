$(document).ready(() => {
  let deleteButton = $('#deletebook');


  deleteButton.on('click', event => {

      let deleteID = ('#deleteID');


    let url = 'https://www.forverkliga.se/JavaScript/api/crud.php';
    let settings = {
      method: 'GET',
      data: {
        op: 'delete',
        key: apiKey,
        id: $('#deleteID').val(),
      },
    };

    $.ajax(url, settings)
      .done(data => {
        console.log('deleted');
      })
      .fail(error => {
        console.log('error');
      })
      .always(always => {
        console.log(always);
      })

  });








});
