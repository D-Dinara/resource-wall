import { populateResourceModal } from "./modal.js";

$(() => {
  // Show modal when a resource is clicked
  $('.resource-item--inner').on("click", function () {
    const resourceId = $(this).parent().attr("id");
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
});
