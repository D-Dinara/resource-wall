$(document).ready(() => {
  // AJAX DELETE request to remove the logged-in user's created resource from DB when Delete button is clicked
  $('.btn_delete').on('click', function (e) {
    e.preventDefault();
    const resourceId = $(this).attr('id').replace("delete_", "");
    console.log(resourceId);
    $.ajax(`/resources/${resourceId}`, { method: "DELETE" })
      .then(results => results)
      .then(() => $(this).parent().parent().hide())
      .catch(error => console.log("deleting resource error", error));
  });
});
