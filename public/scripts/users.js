$(document).ready(() => {
  // Protect page from script injection
  const escape = (str) => {
    let span = document.createElement("span");
    span.appendChild(document.createTextNode(str));
    return span.innerHTML;
  };
  // display edit modal on button click
  $('#edit').on('click', function (e) {
    e.preventDefault();
    $(this).siblings('.modal').removeClass('hidden');
  });

  // AJAX request to edit DB user when user_form-edit is submitted
  $('#user_form-edit').on('submit', function (e) {
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
      .catch(error => console.log("Form submit error", error));
  });
});
