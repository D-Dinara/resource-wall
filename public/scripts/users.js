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

});
