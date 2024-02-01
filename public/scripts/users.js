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

  // user AJAX request to edit DB user when user_form-edit is submitted
  const editUserProfile = (formData) => {
    console.log("submitted form", formData);
    $.ajax("/users", { method: "PUT" })
      .then(response => console.log("edit response", response))
      .catch(error => console.log("editUserProfile error", error));
  };

  $('#user_form-edit').on('submit', function (e) {
    e.preventDefault();
    editUserProfile(e.target);
  });
});
