$(() => {
  const renderResourceModal = function(resource, comments, isLoggedin) {
    const disabled = isLoggedin ? null : "disabled";

    const $resourceModal = $(`
      <h3>${resource.title}</h3>
      <p id="rating-display">Rating: ${resource.rating} / 5.00</p>
      <form id="rating-form" method="POST" action="/resources/${resource.id}">
        <select ${disabled} name="rateOption" id="rateOption">
          <option value="1.00">1</option>
          <option value="2.00">2</option>
          <option value="3.00">3</option>
          <option value="4.00">4</option>
          <option value="5.00">5</option>
        </select>
        <button ${disabled} type="submit" id="rate-btn">Rate</button>
      </form>
      <form id="likes-form" method="POST" action="/likes/${resource.id}">
        <button ${disabled} type="submit" id="like-btn">Like</button>
      </form>
      <img src="${resource.thumbnail_url}" alt="Resource thumbnail image" class="thumbnail" width="200px" />
      <a href=${resource.url}>Resource URL</a>
      <p class="description">${resource.description}</p>
      <h3>Comments</h3>
      <div class="comments-container"></div>
      <form id="comment-form" method="POST" action="/comments/${resource.id}">
        <label for="comment-text">Leave a comment</label>
        <textarea ${disabled} name="commentText" id="comment-text"></textarea>
        <div>
          <button ${disabled} type="submit">Add comment</button>
        </div>
      </form>
    `);

    $("#myModal .modal-content").html($resourceModal);

    // Render comments in the modal
    comments.forEach(comment => {
      if (comment.commentor && comment.text) {
        const $comment = $(`
          <p class="comment">${comment.commentor}: ${comment.text}</p>
        `);
        $(".comments-container").append($comment);
      }
    });

    $("#myModal").fadeIn();
  };

  // Show modal when a resource is clicked
  $(document).on("click", ".resource", function() {
    const resourceId = $(this).attr("id");
    // Fetch resource details and comments
    $.ajax({
      url: "/resources/" + resourceId,
      method: "GET",
      success: function(responseData) {
        const resource = responseData.resource;
        const comments = resource.map(comment => ({
          text: comment.text,
          commentor: comment.username
        }));

        const isLoggedin = responseData.userId;
        renderResourceModal(resource[0], comments, isLoggedin);
      },
      error: function(error) {
        console.error("Error fetching resource details:", error);
      }
    });
  });

  // Handle form submission for rating
  $("#myModal").on("submit", "#rating-form", function(event) {
    event.preventDefault();
    const rateOption = $(this).serialize();
    $.ajax({
      url: $(this).attr("action"),
      method: "PATCH",
      data: rateOption
    })
      .then(function(updatedResource) {
        // Update the displayed rating
        $("#rating-display").text(`Rating: ${updatedResource.rating} / 5.00`);
        
      })
  });

  // Handle form submission for likes
  $("#myModal").on("submit", "#likes-form", function(event) {
    event.preventDefault();
    $.ajax({
      url: $(this).attr("action"),
      method: "POST",
    })
      .then(function() {

      })
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




