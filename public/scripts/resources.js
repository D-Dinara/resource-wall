$(() => {

  const renderResouceModal = function(resource, comments) {
    $(".comments-container").empty();
    comments.forEach(comment => {
      const $comment = $(`
    <p class="comment">${comment.commentor}: ${comment.text}</p>
    `);
      $(".comments-container").append($comment);
    });

    const $resourceModal = $(`
    <h3>${resource.title}</h3>
    <div class="image-container">
      <img src="${resource.thumbnail_url}" alt="Resource thumbnail image" class="thumbnail" width="200px" />
      <p class="description">${resource.description}</p>
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
          comments.push({
            text: resource.text,
            commentor: resource.username
          });
        });
        renderResouceModal(data[0], comments);
      },
      error: function(error) {
        console.error("Error fetching resource details:", error);
      }
    });

    $("#comment-form").on("submit", function(event) {
      // Prevent the default form submission
      event.preventDefault();
      console.log("resource id ", resourceId);
      // Serialize the form data
      const commentText = $(this).serialize();

      $.ajax({
        url: "/comments/" + resourceId,
        method: "POST",
        data: commentText
      })
        .then(function() {
        })

    });
  });



  // Close modal when the close button is clicked
  $(".close").click(function() {
    $("#myModal").fadeOut();
  });
});
