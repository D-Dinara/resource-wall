$(() => {
  const renderResouceModal = function(resource, comments) {
    $(".comments-container").empty();
    comments.forEach(comment => {
      const $comment = $(`
    <p class="comment">${comment}</p>
    `);
      $(".comments-container").append($comment);
    });

    const $resourceModal = $(`
    <h3>${resource.title}</h3>
    <div class="image-container">
      <img src="${resource.thumbnail_url}" alt="Resource thumbnail image" class="thumbnail" width="200px" />
      <p class="description">${resource.description}</p>
    </div>
    `);
    $("#myModal .modal-content").html($resourceModal);
    $("#myModal").fadeIn();
  };

  // Show modal when a resource is clicked
  $(".resource").on("click", function() {
    const comments = [];
    const resourceId = $(this).attr("id");

    $.ajax({
      url: "/resources/" + resourceId,
      method: "GET",
      success: function(data) {
        data.forEach(resource => {
          comments.push(resource.text);
        });
        renderResouceModal(data[0], comments);
      },
      error: function(error) {
        console.error("Error fetching resource details:", error);
      }
    });
  });

  // Close modal when the close button is clicked
  $(".close").click(function() {
    $("#myModal").fadeOut();
  });
});
