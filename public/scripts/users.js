$(document).ready(() => {
  // display edit modal on button click
  $('#edit').on('click', function (e) {
    e.preventDefault();
    $(this).siblings('.modal').removeClass('hidden');
  });

  $('#modal_close').on('click', function (e) {
    e.preventDefault();
    $(this).parent().parent().addClass('hidden');
  });

  $('.modal').on('click', function (e) {
    if (e.target === e.currentTarget) {
      $(this).addClass('hidden');
    }
  });
  // AJAX request to edit DB user when user_form-edit is submitted
  $('#user_form-edit').on('submit', function (e) {
    console.log("form submitted!");
    e.preventDefault();
    const formData = {
      username: $("#username").val(),
      email: $("#user_email").val(),
      firstName: $('#first_name').val(),
      lastName: $('#last_name').val()
    };
    const userId = $(e.target).find('#user_id').val(); //.value();

    $.ajax(`/users/${userId}`, {
      data: formData,
      method: "PUT"
    })
      .then(response => console.log("edit response", response))
      .then(() => window.location.reload())
      .catch(error => console.log("Form submit error", error));
  });
});
