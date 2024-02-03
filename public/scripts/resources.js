$(() => {

  const renderResouceModal = function(resource, comments) {
    const $resourceModal = $(`
      <h3>${resource.title}</h3>

      <div class="image-container">
        <img src="${resource.thumbnail_url}" alt="Resource thumbnail image" class="thumbnail" width="200px" />
        <p class="description">${resource.description}</p>
        <div class="comments-container"></div>
        <form id="comment-form" method="POST" action="/comments/${resource.id}">
          <label for="comment-text">Leave a comment</label>
          <textarea name="commentText" id="comment-text"></textarea>
          <div>
            <button type="submit">Add comment</button>
          </div>
        </form>
      </div>
    `);

    $("#myModal .modal-content").html($resourceModal);

    // Render comments in the modal
    comments.forEach(comment => {
      const $comment = $(`
        <p class="comment">${comment.commentor}: ${comment.text}</p>
      `);
      $(".comments-container").append($comment);
    });

    $("#myModal").fadeIn();
  };

  // Show modal when a resource is clicked
  $(".resource").on("click", function() {
    const resourceId = $(this).attr("id");

    // Fetch resource details and comments
    $.ajax({
      url: "/resources/" + resourceId,
      method: "GET",
      success: function(data) {
        const resource = data[0];
        const comments = data.map(comment => ({
          text: comment.text,
          commentor: comment.username
        }));

        renderResouceModal(resource, comments);
      },
      error: function(error) {
        console.error("Error fetching resource details:", error);
      }
    });
  });

  // Handle form submission for adding comments
  $("#myModal").on("submit", "#comment-form", function(event) {
    event.preventDefault();

    const commentText = $(this).serialize();

    $.ajax({
      url: "/comments/" + $(this).attr("action").split("/").pop(),
      method: "POST",
      data: commentText
    })
      .then(function([user, newComment]) {
        const $comment = $(`
          <p class="comment">${user.username}: ${newComment.text}</p>
        `);
        $(".comments-container").append($comment);
      });
  });

  // Close modal when the close button is clicked
  $(".close").click(function() {
    $("#myModal").fadeOut();
  });
});




