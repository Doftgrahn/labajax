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
        let object = JSON.parse(data);
        if (object.status == 'success') {
          $('#deleteOutput').append('<p>Deletion succeded</p>');
          console.log('deleted');
        } else {
          $('#deleteOutput').append('<p>Deletion not succeded</p>');
        };
      })
      .fail(error => {
        console.log('error');
      })
      .always(always => {
        console.log(always);
      })

  });








});
