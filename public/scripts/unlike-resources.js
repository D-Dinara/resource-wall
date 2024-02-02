$(document).ready(() => {
  // AJAX DELETE request to remove a different user's create resource from the logged-in user's profile page. This does NOT remove the resource from the DB, only the like connection
  $('.btn_unlike').on('click', function (e) {
    e.preventDefault();
    const likesId = $(this).attr('id').replace("unlike_", "");
    $.ajax(`/likes/${likesId}`, { method: "DELETE" })
      .then(results => results)
      .then(() => window.location.reload())
      .catch(error => console.log("deleting resource error", error));
  });
});
