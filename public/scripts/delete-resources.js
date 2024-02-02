$(document).ready(() => {
  // AJAX DELETE request to remove the logged-in user's created resource from DB when Delete button is clicked
  $('#btn_delete').on('click', function (e) {
    e.preventDefault();
    const resourceId = $(this).parent().parent().attr('id');
    $.ajax(`/resources/${resourceId}`, { method: "DELETE" })
      .then(results => results)
      .then(() => window.location.reload())
      .catch(error => console.log("deleting resource error", error));
  });
});