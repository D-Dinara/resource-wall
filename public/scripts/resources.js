import { populateResourceModal } from "./modal.js";

$(() => {
  // Show modal when a resource is clicked
  $('.resource-item img').on("click", function () {
    const resourceId = $(this).parent().parent().attr("id");
    // Fetch resource details and comments
    $.ajax(`/resources/${resourceId}`, {
      method: "GET",
      success: function (responseData) {
        const resource = responseData.resource;
        const comments = resource.map(comment => ({
          text: comment.text,
          commentor: comment.username
        }));

        const isLoggedin = responseData.userId;
        populateResourceModal("#resource_modal-container", resource[0], comments, isLoggedin);
      },
      error: function (error) {
        console.error("Error fetching resource details:", error);
      }
    });
  });

  // Handle form submission for rating
  $("#myModal").on("submit", "#rating-form", function (event) {
    event.preventDefault();
    const rateOption = $(this).serialize();
    $.ajax({
      url: $(this).attr("action"),
      method: "PATCH",
      data: rateOption
    })
      .then(function (updatedResource) {
        // Update the displayed rating
        $("#rating-display").text(`Rating: ${updatedResource.rating} / 5.00`);
      })
  });


  // Handle form submission for adding comments
  $("#myModal").on("submit", "#comment-form", function (event) {
    event.preventDefault();
    const commentText = $(this).serialize();
    $.ajax({
      url: "/comments/" + $(this).attr("action").split("/").pop(),
      method: "POST",
      data: commentText
    })
      .then(function ([user, newComment]) {
        const $comment = $(`
          <p class="comment">${user.username}: ${newComment.text}</p>
        `);
        $(".comments-container").append($comment);
      });
  });


});




