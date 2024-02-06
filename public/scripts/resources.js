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
        const isLiked = responseData.isLiked;
        const isRated = responseData.isRated;
        const isLoggedin = responseData.userId;
        const ratingObj = responseData.rating;
        const avgRating = ratingObj.avgrating ? parseFloat(ratingObj.avgrating).toFixed(2) : "0.00";
        populateResourceModal("#resource_modal-container", resource[0], comments, isLoggedin, isLiked, isRated, avgRating);
      },
      error: function (error) {
        console.error("Error fetching resource details:", error);
      }
    });
  });


  // Handle form submission for likes
  $("#myModal").on("submit", "#likes-form", function (event) {
    event.preventDefault();
    const $likeBtn = $(this).find("#like-btn");
    const isAlreadyLiked = $likeBtn.text() === "Unlike";
    $.ajax({
      url: $(this).attr("action"),
      method: isAlreadyLiked ? "DELETE" : "POST",
    })
      .then(function () {
        if (isAlreadyLiked) {
          console.log("Unliked");
          $likeBtn.text("Like");
        } else {
          console.log("Liked");
          $likeBtn.text("Unlike");
        }
      })
      .catch(function (error) {
        console.error("Error:", error);
      });
  });
});




